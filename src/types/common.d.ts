type OutputFormat = 'TXT' | 'SRT'

type LexFormat = 'SAMPA' | 'KALDI' | 'UASR'

type SlownikFiles = 'phonmap' | 'exceptions' | 'korpus'
enum Language {
  HSB = 'HSB',
  DE = 'DE',
  EN = 'EN'
}

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
}

type ResultFileUrls = {
  text: string
  srt: string
  wav: string
}
