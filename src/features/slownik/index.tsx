import { Box, Button, Container, Dialog, Typography } from '@mui/material'
import { FC, useState, useRef } from 'react'
import { OutputFormatSelector } from '../../components/output-format-selector'
import { LinearProgressWithLabel } from '../../components/linear-progress-with-label'
import { toast } from 'react-toastify'
import { formatSecondsToReadableDuration } from '../../helper/dates'
import { sanitize } from '../../helper/sanitizer'
import LoadingButton from '@mui/lab/LoadingButton'
import { CloudUploadOutlined } from '@mui/icons-material'
import { DEFAULT_LEX_FORMAT, DEFAULT_OUTPUT_FORMAT, INVALID_DURATION } from '../../types/constants'
import { LexFormatSelector } from '../../components/lex-format-selector'
import { UploadSection } from './components/upload-section'
import { createSlownikUploadService } from '../../services/upload-service'
import Confetti from 'react-confetti'

const Slownik: FC<{}> = () => {
  const [lexFormat, setLexFormat] = useState<LexFormat>(DEFAULT_LEX_FORMAT)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(DEFAULT_OUTPUT_FORMAT)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgess] = useState<{ status: number; message: string; duration: number }>({
    status: 0,
    message: '',
    duration: INVALID_DURATION // set duration of server calculation in seconds
  })

  const [files, setFiles] = useState<{
    phonmap: File | null
    exceptions: File | null
    korpus: File | null
  }>({ phonmap: null, exceptions: null, korpus: null })
  const [resultFileUrl, setResultFileUrl] = useState<string | null>(null)
  const [resultFinishedModalOpened, setResultFinishedModalOpened] = useState(false)

  const uploadServiceRef = useRef(
    createSlownikUploadService({
      onProgressUpdate: setProgess,
      onSuccess: (url) => {
        setResultFileUrl(url)
        setResultFinishedModalOpened(true)
      },
      onError: (error) => {
        toast.error(error)
        resetInputs()
      },
      onLoadingChange: setIsLoading
    })
  )

  const resetFiles = () => {
    setFiles({ phonmap: null, exceptions: null, korpus: null })
  }

  const resetInputs = () => {
    uploadServiceRef.current.resetToken()
    resetFiles()
    setResultFileUrl(null)
    setIsLoading(false)
    setProgess({ status: 0, message: '', duration: INVALID_DURATION })
  }

  const onSetFile = (type: SlownikFiles, file: File) => {
    const parsedFile = new File([file], sanitize(file.name), { type: file.type })

    switch (type) {
      case 'phonmap':
        setFiles((prevValue) => {
          return { ...prevValue, phonmap: parsedFile }
        })
        break
      case 'exceptions':
        setFiles((prevValue) => {
          return { ...prevValue, exceptions: parsedFile }
        })
        break
      case 'korpus':
        setFiles((prevValue) => {
          return { ...prevValue, korpus: parsedFile }
        })
        break
    }
  }

  const allFilesSelected = () => {
    if (files.phonmap === null || files.exceptions === null || files.korpus === null) {
      return false
    }
    return true
  }

  const onStartUpload = () => {
    if (allFilesSelected()) {
      uploadServiceRef.current.startUpload({
        files: {
          phonmap: files.phonmap!,
          exceptions: files.exceptions!,
          korpus: files.korpus!
        },
        lexFormat,
        outputFormat,
        token: uploadServiceRef.current.getToken()
      })
    }
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 5,
        maxHeight: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
      }}
    >
      <Typography variant='h2'>Fonetiski słownik</Typography>
      <Typography variant='h6' sx={{ paddingBottom: 2 }}>
        BETA werzija *** StT-HSB-V0.0.12
      </Typography>
      <UploadSection isLoading={isLoading} files={files} setFile={onSetFile} />
      <Typography variant='h6' sx={{ paddingTop: 3 }}>
        Zaměr a format wuzwolić
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1 }}>
        <LexFormatSelector
          lexFormat={lexFormat}
          isDisabled={isLoading}
          onChangeLexFormat={setLexFormat}
        />
        <OutputFormatSelector
          outputFormat={outputFormat}
          isDisabled={isLoading}
          onChangeOutputFormat={setOutputFormat}
        />
      </Box>
      {resultFileUrl ? (
        <Button onClick={resetInputs}>Dalšu dataju</Button>
      ) : (
        <LoadingButton
          onClick={onStartUpload}
          loading={isLoading}
          loadingPosition='start'
          startIcon={<CloudUploadOutlined />}
          variant='contained'
          disabled={allFilesSelected() === false}
        >
          <span>Upload</span>
        </LoadingButton>
      )}
      {isLoading === true && (
        <>
          <Typography>Začitam.... {progress.message}</Typography>
          {progress.duration !== INVALID_DURATION && (
            <Typography>
              Předźěłanje budźe někak {formatSecondsToReadableDuration(progress.duration)}h trać.
            </Typography>
          )}
          <LinearProgressWithLabel progress={progress.status} />
        </>
      )}
      {resultFileUrl && (
        <>
          <Typography>Hotowe!</Typography>
          <Typography>
            Twój wotkaz je <a href={resultFileUrl}>tule</a>.
          </Typography>
        </>
      )}
      {resultFileUrl && <Confetti numberOfPieces={4000} recycle={false} tweenDuration={100000} />}
      <Dialog open={resultFinishedModalOpened} onClose={() => setResultFinishedModalOpened(false)}>
        <Box
          sx={{
            padding: 5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography variant='h4'>Hotowe!</Typography>
          <Button variant='outlined' onClick={() => setResultFinishedModalOpened(false)}>
            Cool
          </Button>
        </Box>
      </Dialog>
    </Container>
  )
}

export default Slownik
