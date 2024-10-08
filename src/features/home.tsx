import { Box, Button, Container, IconButton, Typography } from '@mui/material'
import { FileUploader } from '../components/file-uploader'
import { LanguageModelSelector } from '../components/language-model-selector'
import { FC, useState } from 'react'
import { OutputFormatSelector } from '../components/output-format-selector'
import { generateId } from '../helper/random'
import { LinearProgressWithLabel } from '../components/linear-progress-with-label'
import { toast } from 'react-toastify'
import { formatSecondsToReadableDuration } from '../helper/dates'
import { sanitize } from '../helper/sanitizer'
import LoadingButton from '@mui/lab/LoadingButton'
import { KeyboardArrowDown, KeyboardArrowUp, CloudUploadOutlined } from '@mui/icons-material'
import { DEFAULT_LANGUAGE_MODEL, DEFAULT_OUTPUT_FORMAT, INVALID_DURATION } from '../types/constants'
import { axiosInstanceTranscript } from '../lib/axios'

let token = generateId(32)

const Home: FC<{}> = () => {
  const [choosenModel, setChoosenModel] = useState<LanguageModel>(DEFAULT_LANGUAGE_MODEL)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(DEFAULT_OUTPUT_FORMAT)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgess] = useState<{ status: number; message: string; duration: number }>({
    status: 0,
    message: '',
    duration: INVALID_DURATION // set duration of server calculation in seconds
  })
  const [devModeOpened, setDevModeOpened] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [resultFileUrl, setResultFileUrl] = useState<string | null>(null)

  const resetInputs = () => {
    token = generateId(32)
    setFile(null)
    setResultFileUrl(null)
    setIsLoading(false)
    setProgess({ status: 0, message: '', duration: INVALID_DURATION })
  }

  const onSetFile = (file: File) => {
    const parsedFile = new File([file], sanitize(file.name), { type: file.type })
    setFile(parsedFile)
  }

  const onStartUpload = () => {
    setIsLoading(true)
    if (file) {
      const formData = new FormData()
      formData.append('filename', sanitize(file.name))
      formData.append('token', token)
      formData.append('languageModel', choosenModel)
      formData.append('outputFormat', outputFormat)
      formData.append('file', file)

      setProgess({ status: 0, message: 'Začita so', duration: INVALID_DURATION })
      axiosInstanceTranscript
        .post('/upload', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(() => {
          toast('Start 🚀')
          setProgess({ status: 0, message: 'Začita so', duration: INVALID_DURATION })
          getStatus()
        })
        .catch((error) => {
          toast.error('Zmylk', error.message)
          setIsLoading(false)
        })
    }
  }
  const getStatus = () => {
    setTimeout(() => {
      axiosInstanceTranscript
        .get(`/status?token=${token}`)
        .then((response) => {
          const { duration, done, status, message } = response.data
          setProgess({ status, message, duration })
          if (done === true) {
            setResultFileUrl(
              `${process.env.REACT_APP_API_URL_TRANSCRIPT}/download?token=${token}&filename=${sanitize(file!.name)}&outputFormat=${outputFormat}`
            )
            toast('Dataja je so analysowala 🎉')
          } else {
            getStatus()
          }
        })
        .catch((error) => {
          toast.error('Zmylk', error.message)
          setIsLoading(false)
        })
    }, 1000)
  }

  const onClickDevMode = () => {
    if (devModeOpened) {
      setChoosenModel(DEFAULT_LANGUAGE_MODEL)
    }
    setDevModeOpened(!devModeOpened)
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 5,
        maxHeight: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll'
      }}
    >
      <Typography variant='h2'>Spóznawanje rěče</Typography>
      <Typography variant='h6' sx={{ paddingBottom: 2 }}>
        BETA werzija *** StT-DE-V0.2.3
      </Typography>
      <FileUploader file={file} isDisabled={isLoading} onSetFile={onSetFile} />
      <Typography variant='h6' sx={{ paddingTop: 3 }}>
        Zaměr a format wuzwolić
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1 }}>
        <LanguageModelSelector
          languageModel={choosenModel}
          isDisabled={isLoading}
          onChangeLanguageModel={setChoosenModel}
        />
        <OutputFormatSelector
          outputFormat={outputFormat}
          isDisabled={isLoading}
          onChangeOutputFormat={setOutputFormat}
        />
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 1 }}>
        <Typography variant='h6'>Eksperimentelne opcije</Typography>
        <IconButton onClick={onClickDevMode}>
          {devModeOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </IconButton>
      </Box>
      {devModeOpened && (
        <LanguageModelSelector
          languageModel={choosenModel}
          isDisabled={isLoading}
          onChangeLanguageModel={setChoosenModel}
          experimentalOptions
        />
      )}

      {resultFileUrl ? (
        <Button onClick={resetInputs}>Dalšu dataju</Button>
      ) : (
        <LoadingButton
          onClick={onStartUpload}
          loading={isLoading}
          loadingPosition='start'
          startIcon={<CloudUploadOutlined />}
          variant='contained'
          disabled={file === null}
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
    </Container>
  )
}

export default Home
