export const getLanguageModelText = (
  model: LanguageModel
): { title: string; description: string } => {
  switch (model) {
    case 'GERMAN':
      return {
        title: 'whisper model za Němčinu',
        description: 'wulki powšitkowny model - HuggingFace Whisper "large"'
      }
    case 'DEVEL':
      return { title: 'simulator', description: 'jenož za wuwiwarjow' }
  }
}

export const getOutputFormatText = (
  format: OutputFormat
): { title: string; description: string } => {
  switch (format) {
    case 'TXT':
      return { title: 'txt', description: 'ryzy tekst - bjez markěrowanjow' }
    case 'SRT':
      return { title: 'srt', description: 'podtitle za widejo - z markěrowanjemi' }
  }
}

export const getLexFormatText = (format: LexFormat): { title: string; description: string } => {
  switch (format) {
    case 'SAMPA':
      return { title: 'lex', description: 'TODO' }
    case 'KALDI':
      return { title: 'klex', description: 'TODO' }
    case 'UASR':
      return { title: 'ulex', description: 'TODO' }
  }
}
