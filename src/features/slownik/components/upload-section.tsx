import { FC } from 'react'
import { FileUploader } from '../../../components/file-uploader'
import { Stack } from '@mui/material'

export const UploadSection: FC<{
  isLoading: boolean
  files: {
    phonmap: File | null
    exceptions: File | null
    korpus: File | null
  }
  setFile: (type: SlownikFiles, file: File) => void
}> = ({ isLoading, files, setFile }) => {
  return (
    <Stack spacing={1}>
      <FileUploader
        title='Wuzwol phonmap'
        file={files.phonmap}
        acceptExtensions='txt'
        isDisabled={isLoading}
        onSetFile={(file) => setFile('phonmap', file)}
      />
      <FileUploader
        title='Wuzwol exceptions'
        acceptExtensions='txt'
        file={files.exceptions}
        isDisabled={isLoading}
        onSetFile={(file) => setFile('exceptions', file)}
      />
      <FileUploader
        title='Wuzwol korpus'
        acceptExtensions='vocab'
        file={files.korpus}
        isDisabled={isLoading}
        onSetFile={(file) => setFile('korpus', file)}
      />
    </Stack>
  )
}
