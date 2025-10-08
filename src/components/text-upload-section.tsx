import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { FileUploader } from './file-uploader'
import { LanguageModelSelector } from './language-model-selector'

interface TextUploadSectionProps {
  textFile: File | null
  textModel: LanguageModel
  isDisabled: boolean
  models: LanguageModel[]
  onSetTextFile: (file: File) => void
  onChangeTextModel: (model: LanguageModel) => void
}

const TextUploadSection: FC<TextUploadSectionProps> = ({
  textFile,
  textModel,
  isDisabled,
  models,
  onSetTextFile,
  onChangeTextModel
}) => {
  return (
    <Box
      sx={{
        paddingBottom: { xs: 2, sm: 3 },
        width: '100%',
        textAlign: 'center'
      }}
    >
      <Typography
        variant='h6'
        sx={{
          paddingBottom: { xs: 1, sm: 2 },
          fontSize: { xs: '1.1rem', sm: '1.25rem' }
        }}
      >
        Text und Model hochladen
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: { xs: 1, sm: 2 },
          width: '100%'
        }}
      >
        <FileUploader file={textFile} isDisabled={isDisabled} onSetFile={onSetTextFile} />
      </Box>
      <Box
        sx={{
          paddingTop: { xs: 1, sm: 2 },
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <LanguageModelSelector
          languageModel={textModel}
          models={models}
          isDisabled={isDisabled}
          onChangeLanguageModel={onChangeTextModel}
        />
      </Box>
    </Box>
  )
}

export default TextUploadSection
