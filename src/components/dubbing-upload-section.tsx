import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { FileUploader } from './file-uploader'
import { Stack } from '@mui/material'

interface DubbingUploadSectionProps {
  files: {
    audioFile: File | null
    srtFile: File | null
  }
  isDisabled: boolean
  onSetFile: (type: DubbingFiles, file: File) => void
}

const DubbingUploadSection: FC<DubbingUploadSectionProps> = ({ files, isDisabled, onSetFile }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant='h6' sx={{ marginBottom: 3, textAlign: 'center' }}>
        Dataje wuzwolić
      </Typography>
      <Stack spacing={2}>
        <FileUploader
          title='Wuzwol audio'
          file={files.audioFile}
          acceptExtensions='mp3,wav,mp4,avi,mov'
          isDisabled={isDisabled}
          onSetFile={(file) => onSetFile('audioFile', file)}
        />
        <FileUploader
          title='Wuzwol subtitle (opcionalny)'
          acceptExtensions='srt,vtt'
          file={files.srtFile}
          isDisabled={isDisabled}
          onSetFile={(file) => onSetFile('srtFile', file)}
        />
      </Stack>
    </Box>
  )
}

export default DubbingUploadSection
