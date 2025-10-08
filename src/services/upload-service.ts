import { toast } from 'react-toastify'
import { sanitize } from '../helper/sanitizer'
import { getStoredToken, generateAndStoreNewToken } from '../helper/token-storage'
import { INVALID_DURATION } from '../types/constants'
import { uploadTranscript, uploadSlownik, getStatus, getSlownikStatus, getDownloadUrl } from './api'

const beepFile = require('../audio/message-notification.mp3')
const audio = new Audio(beepFile)

export interface UploadProgress {
  status: number
  message: string
  duration: number
}

export interface UploadCallbacks {
  onProgressUpdate: (progress: UploadProgress) => void
  onSuccess: (
    resultFileUrl: string,
    hasTxtDownload: boolean,
    hasSrtDownload: boolean,
    hasAudioDownload: boolean
  ) => void
  onError: (error: string) => void
  onLoadingChange: (isLoading: boolean) => void
}

export interface TranscriptUploadParams {
  audioFile: File
  languageModel: LanguageModel
  token: string
  translate: boolean
  diarization: number
  vad: boolean
  textFile: File | null
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
    console.log('-1')
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
    const { audioFile, languageModel, translate, diarization, vad, textFile } = params
    const parsedAudioFile = new File([audioFile], sanitize(audioFile.name), {
      type: audioFile.type
    })

    const parsedTextFile = textFile
      ? new File([textFile], sanitize(textFile.name), { type: textFile.type })
      : null

    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    await uploadTranscript({
      audioFile: parsedAudioFile,
      languageModel: languageModel.name,
      token: this.token,
      translate,
      diarization,
      vad,
      textFile: parsedTextFile
    })

    toast('Start 🚀')
    const permission = await Notification.requestPermission()
    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    this.startStatusPolling(permission, parsedAudioFile.name)
  }

  private async handleSlownikUpload(params: SlownikUploadParams): Promise<void> {
    const { files, lexFormat, outputFormat } = params

    this.callbacks.onProgressUpdate({
      status: 0,
      message: 'Začita so',
      duration: INVALID_DURATION
    })

    await uploadSlownik({
      files,
      lexFormat,
      outputFormat,
      token: this.token
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
      const statusFunction = this.isTranscriptUpload ? getStatus : getSlownikStatus

      statusFunction({ token: this.token })
        .then((response) => {
          const {
            duration,
            done,
            status,
            message,
            hasTxtDownload,
            hasSrtDownload,
            hasAudioDownload
          } = response
          this.callbacks.onProgressUpdate({
            status: parseInt(status, 10),
            message,
            duration
          })

          if (done === true) {
            const resultFileUrl = getDownloadUrl(
              { token: this.token, filename: fileName },
              this.isTranscriptUpload
            )

            this.handleSuccess(
              notificationPermission,
              resultFileUrl,
              hasTxtDownload,
              hasSrtDownload,
              hasAudioDownload
            )
          } else {
            this.startStatusPolling(notificationPermission, fileName, lexFormat)
          }
        })
        .catch((error) => {
          this.callbacks.onError(error.message || 'Zmylk')
          this.callbacks.onLoadingChange(false)
        })
    }, 1000)
  }

  private handleSuccess(
    notificationPermission: NotificationPermission,
    resultFileUrl: string,
    hasTxtDownload: boolean,
    hasSrtDownload: boolean,
    hasAudioDownload: boolean
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

    this.callbacks.onSuccess(resultFileUrl, hasTxtDownload, hasSrtDownload, hasAudioDownload)
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
