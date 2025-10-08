export const getLanguageModelText = (
  model: LanguageModel
): { title: string; description: string } => {
  switch (model) {
    case 'FHG':
      return {
        title: 'powšitkowny klasiski model',
        description: 'hišće njeje přistupne - Fraunhofer recIKTS'
      }
    case 'HF':
      return {
        title: 'powšitkowny KI model (doporučene)',
        description:
          'za powšitkowne rozmołwy - HuggingFace Whisper "small" wusměrjene na Hornjoserbšćinu'
      }
    case 'HFBIG':
      return {
        title: 'wulki powšitkowny KI model (pomału, dokładnje)',
        description:
          'za powšitkowne rozmołwy - HuggingFace Whisper "large" wusměrjene na Hornjoserbšćinu'
      }
    case 'EURO':
      return {
        title: 'KI model Europeady 2022',
        description:
          'za transkript Europeady - HuggingFace Whisper "base" wusměrjene na hry Europeady 2022'
      }
    case 'FB':
      return { title: 'wjacerěčny KI model', description: 'za powšitkowne rozmołwy - Facebook MMS' }
    case 'BOZA_MSA':
      return {
        title: 'klasiski model za bože mšě',
        description: 'wusměrjene na cyrkwinsku rěč - Fraunhofer recIKTS'
      }
    case 'GMEJ':
      return {
        title: 'klasiski model za gmejnske posedźenja',
        description: 'wusměrjene na słowoskład posedźenjow - Fraunhofer recIKTS'
      }
    case 'HF_PAU':
      return {
        title: 'powšitkowny KI model (doporučene) (přeskoči přestawki)',
        description:
          'za powšitkowne rozmołwy - HuggingFace Whisper "small" wusměrjene na Hornjoserbšćinu'
      }
    case 'HFBIG_PAU':
      return {
        title: 'wulki powšitkowny KI model (pomału, dokładnje) (přeskoči přestawki)',
        description:
          'za powšitkowne rozmołwy - HuggingFace Whisper "large" wusměrjene na Hornjoserbšćinu'
      }
    case 'BOZA_MSA_PAU':
      return {
        title: 'klasiski model za bože mšě (přeskoči přestawki)',
        description: 'wusměrjene na cyrkwinsku rěč - Fraunhofer recIKTS'
      }
    case 'GMEJ_PAU':
      return {
        title: 'klasiski model za gmejnske posedźenja (přeskoči přestawki)',
        description: 'wusměrjene na słowoskład posedźenjow - Fraunhofer recIKTS'
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
