import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { FileUploader } from './file-uploader'
import { LanguageModelSelector } from './language-model-selector'

interface UploadSectionProps {
  file: File | null
  model: LanguageModel
  models: LanguageModel[]
  isDisabled: boolean
  title: string
  onSetFile: (file: File) => void
  onChangeModel: (model: LanguageModel) => void
}

const UploadSection: FC<UploadSectionProps> = ({
  file,
  model,
  isDisabled,
  models,
  title,
  onSetFile,
  onChangeModel
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
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: { xs: 1, sm: 2 },
          width: '100%'
        }}
      >
        <FileUploader file={file} isDisabled={isDisabled} onSetFile={onSetFile} />
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
          languageModel={model}
          isDisabled={isDisabled}
          models={models}
          onChangeLanguageModel={onChangeModel}
        />
      </Box>
    </Box>
  )
}

export default UploadSection
