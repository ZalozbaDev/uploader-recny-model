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
}> = ({ title = 'Wuzwol dataju', file, isDisabled, acceptExtensions, onSetFile }) => {
  const uploadInputRef = useRef<HTMLInputElement>(null)

  // Helper function to normalize file extensions
  const normalizeExtensions = (extensions?: string): string => {
    if (!extensions) return ''

    return extensions
      .split(',')
      .map((ext) => ext.trim())
      .map((ext) => (ext.startsWith('.') ? ext : `.${ext}`))
      .join(',')
  }

  // Helper function to validate file extension
  const isValidFileExtension = (fileName: string, acceptedExtensions?: string): boolean => {
    if (!acceptedExtensions) return true

    const normalizedExtensions = normalizeExtensions(acceptedExtensions)
    const fileExtension = fileName.toLowerCase().substring(fileName.lastIndexOf('.'))

    return normalizedExtensions
      .split(',')
      .map((ext) => ext.trim().toLowerCase())
      .includes(fileExtension)
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      // Validate file extension if acceptExtensions is provided
      if (acceptExtensions && !isValidFileExtension(selectedFile.name, acceptExtensions)) {
        alert(
          `Invalid file type. Please select a file with one of these extensions: ${acceptExtensions}`
        )
        return
      }

      onSetFile(selectedFile)
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
        <VisuallyHiddenInput
          ref={uploadInputRef}
          type='file'
          onChange={onFileChange}
          accept={normalizeExtensions(acceptExtensions)}
        />
      </Button>
      {file && (
        <Box sx={{ paddingTop: { xs: 0, sm: 0.5 } }}>
          <Typography variant='body1' textAlign={{ xs: 'center', sm: 'left' }}>
            Drobnosće dataje:
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
