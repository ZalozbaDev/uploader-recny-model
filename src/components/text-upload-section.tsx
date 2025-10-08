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
    <Box sx={{ paddingBottom: 3 }}>
      <Typography variant='h6' sx={{ paddingBottom: 2 }}>
        Text und Model hochladen
      </Typography>
      <FileUploader file={textFile} isDisabled={isDisabled} onSetFile={onSetTextFile} />
      <Box sx={{ paddingTop: 2 }}>
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
