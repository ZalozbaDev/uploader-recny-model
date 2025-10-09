import { Button, Typography, styled, Box } from '@mui/material'
import { FC, useEffect, useRef } from 'react'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1
})

export const FileUploader: FC<{
  title?: string
  file: File | null
  isDisabled: boolean
  acceptExtensions?: string
  onSetFile: (file: File) => void
}> = ({ title = 'zwol dataju', file, isDisabled, acceptExtensions, onSetFile }) => {
  const uploadInputRef = useRef<HTMLInputElement>(null)

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onSetFile(e.target.files[0])
    }
  }

  useEffect(() => {
    if (file === null && uploadInputRef.current) {
      // Add null check for uploadInput.current
      uploadInputRef.current.value = ''
    }
  }, [file])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: 'center',
        justifyContent: file ? 'space-between' : 'center',
        width: '100%',
        maxWidth: '100%',
        gap: { xs: 2, sm: 0 }
      }}
    >
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        sx={{ color: 'rgb(164,243,243)' }}
        disabled={isDisabled}
      >
        {title}
        <VisuallyHiddenInput type='file' onChange={onFileChange} accept={acceptExtensions} />
      </Button>
      {file && (
        <Box sx={{ paddingTop: { xs: 0, sm: 0.5 } }}>
          <Typography variant='body1' textAlign={{ xs: 'center', sm: 'left' }}>
            atributy twojeje dataje:
          </Typography>
          <Typography variant='body2' textAlign={{ xs: 'center', sm: 'left' }}>
            * mjeno: {file.name}
          </Typography>
          <Typography variant='body2' textAlign={{ xs: 'center', sm: 'left' }}>
            * typ dataje: {file.type}
          </Typography>
          <Typography variant='body2' textAlign={{ xs: 'center', sm: 'left' }}>
            * wulkosć: {file.size} bytes
          </Typography>
        </Box>
      )}
    </Box>
  )
}
