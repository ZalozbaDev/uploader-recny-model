import { toast } from 'react-toastify'
import { axiosInstanceTranscript, axiosInstanceSlownik } from '../lib/axios'
import { sanitize } from '../helper/sanitizer'
import { getStoredToken, generateAndStoreNewToken } from '../helper/token-storage'
import { INVALID_DURATION } from '../types/constants'

const beepFile = require('../audio/message-notification.mp3')
const audio = new Audio(beepFile)

export interface UploadProgress {
  status: number
  message: string
  duration: number
}

export interface UploadCallbacks {
  onProgressUpdate: (progress: UploadProgress) => void
  onSuccess: (resultFileUrl: string) => void
  onError: (error: string) => void
  onLoadingChange: (isLoading: boolean) => void
}

export interface TranscriptUploadParams {
  file: File
  languageModel: LanguageModel
  token: string
  translate: boolean
  diarization: number
  vad: boolean
}

export interface SlownikUploadParams {
  files: {
    phonmap: File
    exceptions: File
    korpus: File
  }
  lexFormat: LexFormat
  outputFormat: OutputFormat
  token: string
}

export type UploadParams = TranscriptUploadParams | SlownikUploadParams

export class UploadService {
  private token: string
  private callbacks: UploadCallbacks
  private isTranscriptUpload: boolean

  constructor(callbacks: UploadCallbacks, isTranscriptUpload: boolean = true) {
    this.callbacks = callbacks
    this.isTranscriptUpload = isTranscriptUpload
    this.token = getStoredToken()
  }

  public getToken(): string {
    return this.token
  }

  public resetToken(): void {
    this.token = generateAndStoreNewToken()
  }

  public async startUpload(params: UploadParams): Promise<void> {
    this.callbacks.onLoadingChange(true)

    try {
      if (this.isTranscriptUpload) {
        await this.handleTranscriptUpload(params as TranscriptUploadParams)
      } else {
        await this.handleSlownikUpload(params as SlownikUploadParams)
      }
    } catch (error: any) {
      this.callbacks.onError(error.response?.data || 'Zmylk')
      this.callbacks.onLoadingChange(false)
    }
  }

  private async handleTranscriptUpload(params: TranscriptUploadParams): Promise<void> {
    const { file, languageModel, translate, diarization, vad } = params
    const parsedFile = new File([file], sanitize(file.name), { type: file.type })
    const formData = new FormData()

    formData.append('filename', sanitize(parsedFile.name))
    formData.append('token', this.token)
    formData.append('languageModel', languageModel.name)
    formData.append('file', parsedFile)
    formData.append('translate', String(translate))
    formData.append('diarization', String(diarization))
    formData.append('vad', String(vad))

    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    await axiosInstanceTranscript.post('/upload', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    toast('Start 🚀')
    const permission = await Notification.requestPermission()
    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    this.startStatusPolling(permission, parsedFile.name)
  }

  private async handleSlownikUpload(params: SlownikUploadParams): Promise<void> {
    const { files, lexFormat, outputFormat } = params
    const formData = new FormData()

    formData.append('filename', sanitize(files.korpus.name))
    formData.append('token', this.token)
    formData.append('languageModel', lexFormat)
    formData.append('outputFormat', outputFormat)
    formData.append('korpusname', files.korpus.name)
    formData.append('phonmapname', files.phonmap.name)
    formData.append('exceptionsname', files.exceptions.name)
    formData.append('korpus', files.korpus)
    formData.append('phonmap', files.phonmap)
    formData.append('exceptions', files.exceptions)

    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    await axiosInstanceSlownik.post('upload', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })

    toast('Start 🚀')
    const permission = await Notification.requestPermission()
    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    this.startStatusPolling(permission, files.korpus.name, lexFormat)
  }

  private startStatusPolling(
    notificationPermission: NotificationPermission,
    fileName: string,
    lexFormat?: LexFormat
  ): void {
    setTimeout(() => {
      const axiosInstance = this.isTranscriptUpload ? axiosInstanceTranscript : axiosInstanceSlownik
      const baseUrl = this.isTranscriptUpload
        ? process.env.REACT_APP_API_URL_TRANSCRIPT
        : process.env.REACT_APP_API_URL_SLOWNIK

      axiosInstance
        .get(`/status?token=${this.token}`)
        .then((response) => {
          const { duration, done, status, message } = response.data
          this.callbacks.onProgressUpdate({
            status: parseInt(status, 10),
            message,
            duration
          })

          if (done === true) {
            const resultFileUrl = `${baseUrl}/download?token=${this.token}&filename=${sanitize(fileName)}`

            this.handleSuccess(notificationPermission, resultFileUrl)
          } else {
            this.startStatusPolling(notificationPermission, fileName, lexFormat)
          }
        })
        .catch((error) => {
          this.callbacks.onError(error.response?.data || 'Zmylk')
          this.callbacks.onLoadingChange(false)
        })
    }, 1000)
  }

  private handleSuccess(
    notificationPermission: NotificationPermission,
    resultFileUrl: string
  ): void {
    if (notificationPermission === 'granted') {
      new Notification('Spóznawanje rěče', {
        body: 'Dataja je so analysowala 🎉'
      })
    }

    audio.load()
    audio.play().catch((error) => {
      console.log(error)
    })

    this.callbacks.onSuccess(resultFileUrl)
    toast('Dataja je so analysowala 🎉')
  }
}

// Factory functions for easier usage
export const createTranscriptUploadService = (callbacks: UploadCallbacks): UploadService => {
  return new UploadService(callbacks, true)
}

export const createSlownikUploadService = (callbacks: UploadCallbacks): UploadService => {
  return new UploadService(callbacks, false)
}
