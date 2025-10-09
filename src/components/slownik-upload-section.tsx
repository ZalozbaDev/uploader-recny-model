import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { FileUploader } from './file-uploader'
import { Stack } from '@mui/material'

interface SlownikUploadSectionProps {
  files: {
    phonmap: File | null
    exceptions: File | null
    korpus: File | null
  }
  isDisabled: boolean
  onSetFile: (type: SlownikFiles, file: File) => void
}

const SlownikUploadSection: FC<SlownikUploadSectionProps> = ({ files, isDisabled, onSetFile }) => {
  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant='h6' sx={{ marginBottom: 3, textAlign: 'center' }}>
        Dataje wuzwolić
      </Typography>
      <Stack spacing={2}>
        <FileUploader
          title='Wuzwol phonmap'
          file={files.phonmap}
          acceptExtensions='txt'
          isDisabled={isDisabled}
          onSetFile={(file) => onSetFile('phonmap', file)}
        />
        <FileUploader
          title='Wuzwol exceptions'
          acceptExtensions='txt'
          file={files.exceptions}
          isDisabled={isDisabled}
          onSetFile={(file) => onSetFile('exceptions', file)}
        />
        <FileUploader
          title='Wuzwol korpus'
          acceptExtensions='vocab'
          file={files.korpus}
          isDisabled={isDisabled}
          onSetFile={(file) => onSetFile('korpus', file)}
        />
      </Stack>
    </Box>
  )
}

export default SlownikUploadSection
