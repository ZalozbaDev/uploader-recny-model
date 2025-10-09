import { axiosInstanceTranscript, axiosInstanceSlownik } from '../lib/axios'
import { sanitize } from '../helper/sanitizer'

// Request types
export interface TranscriptUploadRequest {
  audioFile: File
  textFile: File | null
  languageModel: string
  token: string
  translate: boolean
  diarization: number
  vad: boolean
}

export interface SlownikUploadRequest {
  files: {
    phonmap: File
    exceptions: File
    korpus: File
  }
  lexFormat: LexFormat
  outputFormat: OutputFormat
  token: string
}

export interface StatusRequest {
  token: string
}

export interface DownloadRequest {
  token: string
  filename: string
}

// Response types
export interface StatusResponse {
  duration: number
  done: boolean
  status: string
  message: string
  hasTxtDownload: boolean
  hasSrtDownload: boolean
  hasAudioDownload: boolean
  hasGermanSrtDownload: boolean
}

export interface UploadResponse {
  success: boolean
  message?: string
}

// API functions
export const uploadTranscript = async (
  params: TranscriptUploadRequest
): Promise<UploadResponse> => {
  try {
    const { audioFile, languageModel, token, translate, diarization, vad, textFile } = params

    const formData = new FormData()

    // Add files with the correct field names expected by the server
    formData.append('audioFile', audioFile)
    // Only append textFile if it exists
    if (textFile) {
      formData.append('textFile', textFile)
    }

    // Add body parameters as expected by the server
    formData.append('token', token)
    formData.append('model', languageModel)
    formData.append('translate', String(translate))
    formData.append('diarization', String(diarization))
    formData.append('vad', String(vad))

    const response = await axiosInstanceTranscript.post(`/upload?token=${token}`, formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error: any) {
    console.error('Upload error:', error)
    throw new Error(error.response?.data || 'Upload failed')
  }
}

export const uploadSlownik = async (params: SlownikUploadRequest): Promise<UploadResponse> => {
  try {
    const { files, lexFormat, outputFormat, token } = params
    const formData = new FormData()

    formData.append('filename', sanitize(files.korpus.name))
    formData.append('token', token)
    formData.append('languageModel', lexFormat)
    formData.append('outputFormat', outputFormat)
    formData.append('korpusname', files.korpus.name)
    formData.append('phonmapname', files.phonmap.name)
    formData.append('exceptionsname', files.exceptions.name)
    formData.append('korpus', files.korpus)
    formData.append('phonmap', files.phonmap)
    formData.append('exceptions', files.exceptions)

    const response = await axiosInstanceSlownik.post('upload', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Upload failed')
  }
}

export const getStatus = async (params: StatusRequest): Promise<StatusResponse> => {
  try {
    const { token } = params
    const response = await axiosInstanceTranscript.get(`/status?token=${token}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Status check failed')
  }
}

export const getSlownikStatus = async (params: StatusRequest): Promise<StatusResponse> => {
  try {
    const { token } = params
    const response = await axiosInstanceSlownik.get(`/status?token=${token}`)
    return response.data
  } catch (error: any) {
    throw new Error(error.response?.data || 'Status check failed')
  }
}

export const getDownloadUrl = (params: DownloadRequest, isTranscript: boolean = true): string => {
  const { token, filename } = params
  const baseUrl = isTranscript
    ? process.env.REACT_APP_API_URL_TRANSCRIPT
    : process.env.REACT_APP_API_URL_SLOWNIK

  return `${baseUrl}/download?token=${token}&filename=${sanitize(filename)}`
}
