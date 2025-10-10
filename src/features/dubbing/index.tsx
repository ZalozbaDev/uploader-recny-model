import { Container, Paper } from '@mui/material'
import { FC, useState, useRef } from 'react'
import { toast } from 'react-toastify'
import { INVALID_DURATION } from '../../types/constants'
import HeaderSection from '../../components/header-section'
import DubbingProcessFlow from '../../components/dubbing-process-flow'
import { createDubbingUploadService } from '../../services/upload-service'

const Dubbing: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgess] = useState<UploadProgress>({
    status: 0,
    message: '',
    duration: INVALID_DURATION // set duration of server calculation in seconds
  })
  const [resultFileUrl, setResultFileUrl] = useState<string | null>(null)

  const uploadServiceRef = useRef(
    createDubbingUploadService({
      onProgressUpdate: setProgess,
      onSuccess: (url) => {
        setResultFileUrl(url)
      },
      onError: (error) => {
        toast.error(error)
        resetInputs()
      },
      onLoadingChange: setIsLoading
    })
  )

  const resetInputs = () => {
    setResultFileUrl(null)
    uploadServiceRef.current.resetToken()
    setIsLoading(false)
    setProgess({ status: 0, message: '', duration: INVALID_DURATION })
  }

  const handleTokenReset = () => {
    uploadServiceRef.current.resetToken()
  }

  const onStartUpload = (files: { audioFile: File; srtFile: File | null }) => {
    uploadServiceRef.current.startUpload({
      files,
      token: uploadServiceRef.current.getToken()
    })
  }

  return (
    <Container maxWidth='md' sx={{ height: '100%', padding: 0 }}>
      <Paper
        elevation={8}
        sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: 'rgba(236, 142, 0, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: { xs: 2, sm: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <HeaderSection title='ki - synchronizacija' subtitle='BETA werzija *** StT-HSB-V0.0.12' />

        <DubbingProcessFlow
          isLoading={isLoading}
          isDisabled={isLoading}
          uploadProgress={progress}
          onStartUpload={onStartUpload}
          onReset={resetInputs}
          resultFileUrl={resultFileUrl}
          onTokenReset={handleTokenReset}
        />
      </Paper>
    </Container>
  )
}

export default Dubbing
