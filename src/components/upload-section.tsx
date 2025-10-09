import { Box, Typography } from '@mui/material'
import { FC } from 'react'
import { FileUploader } from './file-uploader'
import { LanguageModelSelector } from './language-model-selector'

interface UploadSectionProps {
  audioFile: File | null
  textFile?: File | null
  model: LanguageModel
  models: LanguageModel[]
  isDisabled: boolean
  title1: string
  title2?: string
  onSetAudioFile: (file: File) => void
  onSetTextFile?: (file: File) => void
  onChangeModel: (model: LanguageModel) => void
}

const UploadSection: FC<UploadSectionProps> = ({
  audioFile,
  textFile,
  model,
  isDisabled,
  models,
  title1,
  title2,
  onSetAudioFile,
  onSetTextFile,
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
        {title1}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: { xs: 1, sm: 2 },
          width: '100%'
        }}
      >
        <FileUploader
          file={audioFile}
          isDisabled={isDisabled}
          onSetFile={onSetAudioFile}
          acceptExtensions='mp3,wav,mp4,avi,m4a,ogg'
        />
      </Box>
      {title2 && textFile !== undefined && onSetTextFile && (
        <>
          <Typography
            variant='h6'
            sx={{
              paddingBottom: { xs: 1, sm: 2 },
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            {title2}
          </Typography>
          <FileUploader
            file={textFile}
            isDisabled={isDisabled}
            onSetFile={onSetTextFile}
            acceptExtensions='txt'
          />
        </>
      )}
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
