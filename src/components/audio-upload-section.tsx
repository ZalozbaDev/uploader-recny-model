import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { FileUploader } from './file-uploader'
import { LanguageModelSelector } from './language-model-selector'

interface AudioUploadSectionProps {
  audioFile: File | null
  audioModel: LanguageModel
  models: LanguageModel[]
  isDisabled: boolean
  onSetAudioFile: (file: File) => void
  onChangeAudioModel: (model: LanguageModel) => void
}

const AudioUploadSection: FC<AudioUploadSectionProps> = ({
  audioFile,
  audioModel,
  isDisabled,
  models,
  onSetAudioFile,
  onChangeAudioModel
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
        Zwuk a Model wuzwolić
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: { xs: 1, sm: 2 },
          width: '100%'
        }}
      >
        <FileUploader file={audioFile} isDisabled={isDisabled} onSetFile={onSetAudioFile} />
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
          languageModel={audioModel}
          isDisabled={isDisabled}
          models={models}
          onChangeLanguageModel={onChangeAudioModel}
        />
      </Box>
    </Box>
  )
}

export default AudioUploadSection
