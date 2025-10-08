import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { FileUploader } from './file-uploader'
import { LanguageModelSelector } from './language-model-selector'
import { OutputFormatSelector } from './output-format-selector'

interface UploadSectionProps {
  file: File | null
  isDisabled: boolean
  models: LanguageModel[]
  onSetFile: (file: File) => void
  choosenModel: LanguageModel
  outputFormat: OutputFormat
  onChangeLanguageModel: (model: LanguageModel) => void
  onChangeOutputFormat: (format: OutputFormat) => void
}

const UploadSection: FC<UploadSectionProps> = ({
  file,
  isDisabled,
  models,
  onSetFile,
  choosenModel,
  outputFormat,
  onChangeLanguageModel,
  onChangeOutputFormat
}) => {
  return (
    <>
      <FileUploader file={file} isDisabled={isDisabled} onSetFile={onSetFile} />
      <Typography variant='h6' sx={{ paddingTop: 3 }}>
        Zaměr a format wuzwolić
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1 }}>
        <LanguageModelSelector
          languageModel={choosenModel}
          models={models}
          isDisabled={isDisabled}
          onChangeLanguageModel={onChangeLanguageModel}
        />
        <OutputFormatSelector
          outputFormat={outputFormat}
          isDisabled={isDisabled}
          onChangeOutputFormat={onChangeOutputFormat}
        />
      </Box>
    </>
  )
}

export default UploadSection
