import { Container, Paper } from '@mui/material'
import { FC, useState, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { INVALID_DURATION } from '../types/constants'
import HeaderSection from '../components/header-section'
import ProcessFlow from '../components/process-flow'
import { createTranscriptUploadService } from '../services/upload-service'
import { getModels } from '../services/models'

const Home: FC<{}> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgess] = useState<UploadProgress>({
    status: 0,
    message: '',
    duration: INVALID_DURATION // set duration of server calculation in seconds
  })
  const [resultFileUrl, setResultFileUrl] = useState<{
    url: string
    hasTxtDownload: boolean
    hasSrtDownload: boolean
    hasAudioDownload: boolean
  } | null>(null)
  const [models, setModels] = useState<LanguageModel[]>([])

  useEffect(() => {
    getModels().then((data) => {
      setModels(data)
    })
  }, [])

  const uploadServiceRef = useRef(
    createTranscriptUploadService({
      onProgressUpdate: setProgess,
      onSuccess: (url, hasTxtDownload, hasSrtDownload, hasAudioDownload) => {
        setResultFileUrl({ url, hasTxtDownload, hasSrtDownload, hasAudioDownload })
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

  const onStartUpload = (
    choosenModel: LanguageModel,
    file: File,
    translate: boolean,
    diarization: number,
    vad: boolean
  ) => {
    if (file) {
      uploadServiceRef.current.startUpload({
        file,
        languageModel: choosenModel,
        token: uploadServiceRef.current.getToken(),
        translate,
        diarization,
        vad
      })
    }
  }

  return (
    <Container maxWidth='md' sx={{ height: '100%', padding: 0 }}>
      <Paper
        elevation={8}
        sx={{
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <HeaderSection
          title='podtitulki a transkripty'
          subtitle='BETA werzija *** StT-HSB-V0.3.0'
        />

        <ProcessFlow
          isLoading={isLoading}
          isDisabled={isLoading}
          uploadProgress={progress}
          models={models}
          onStartUpload={onStartUpload}
          onReset={resetInputs}
          resultFileUrl={resultFileUrl}
          onTokenReset={handleTokenReset}
        />
      </Paper>
    </Container>
  )
}

export default Home
