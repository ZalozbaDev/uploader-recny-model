type OutputFormat = 'TXT' | 'SRT'

type LexFormat = 'SAMPA' | 'KALDI' | 'UASR'

type SlownikFiles = 'phonmap' | 'exceptions' | 'korpus'

type DubbingFiles = 'audioFile' | 'srtFile'

type UploadProgress = { status: number; message: string; duration: number }

type LanguageModel = {
  name: string
  title: string
  description: string
  srt: boolean
  diarization: number // 1, 2, ...
  vad: boolean
  language: Language
  source: string
  forceAlign: boolean
}

type ResultFileUrls = {
  text: string
  srt: string
  wav: string
}
