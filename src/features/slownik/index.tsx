import { Box, Button, Container, Dialog, Typography } from '@mui/material'
import { FC, useState } from 'react'
import { OutputFormatSelector } from '../../components/output-format-selector'
import { generateId } from '../../helper/random'
import { LinearProgressWithLabel } from '../../components/linear-progress-with-label'
import { toast } from 'react-toastify'
import { formatSecondsToReadableDuration } from '../../helper/dates'
import { sanitize } from '../../helper/sanitizer'
import LoadingButton from '@mui/lab/LoadingButton'
import { CloudUploadOutlined } from '@mui/icons-material'
import { DEFAULT_LEX_FORMAT, DEFAULT_OUTPUT_FORMAT, INVALID_DURATION } from '../../types/constants'
import { LexFormatSelector } from '../../components/lex-format-selector'
import { UploadSection } from './components/upload-section'
import { axiosInstanceSlownik } from '../../lib/axios'
import Confetti from 'react-confetti'
const beepFile = require('../../audio/message-notification.mp3')
const audio = new Audio(beepFile)

let token = generateId(32)

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

  const resetFiles = () => {
    setFiles({ phonmap: null, exceptions: null, korpus: null })
  }

  const resetInputs = () => {
    token = generateId(32)
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
    setIsLoading(true)
    if (allFilesSelected()) {
      const formData = new FormData()
      formData.append('filename', sanitize(files.korpus!.name))
      formData.append('token', token)
      formData.append('languageModel', lexFormat)
      formData.append('outputFormat', outputFormat)
      formData.append('korpusname', files.korpus!.name)
      formData.append('phonmapname', files.phonmap!.name)
      formData.append('exceptionsname', files.exceptions!.name)
      formData.append('korpus', files.korpus!)
      formData.append('phonmap', files.phonmap!)
      formData.append('exceptions', files.exceptions!)

      setProgess({ status: 0, message: 'Začita so', duration: INVALID_DURATION })
      axiosInstanceSlownik
        .post('upload', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(async () => {
          toast('Start 🚀')
          const permission = await Notification.requestPermission()
          setProgess({ status: 0, message: 'Začita so', duration: INVALID_DURATION })
          getStatus(permission)
        })
        .catch((error) => {
          toast.error(error.response?.data || 'Zmylk')
          setIsLoading(false)
        })
    }
  }

  const getStatus = (notificationPermission: NotificationPermission) => {
    setTimeout(() => {
      axiosInstanceSlownik
        .get(`/status?token=${token}`)
        .then(async (response) => {
          const { duration, done, status, message } = response.data
          setProgess({ status: parseInt(status, 10), message, duration })
          if (done === true) {
            setResultFileUrl(
              `${process.env.REACT_APP_API_URL_SLOWNIK}/download?token=${token}&filename=${sanitize(files.korpus!.name)}&outputFormat=${lexFormat}`
            )
            if (notificationPermission === 'granted') {
              new Notification('Spóznawanje rěče', {
                body: 'Dataja je so analysowala 🎉'
                // icon: 'https://placehold.co/400'
              })
            }
            audio.load()
            audio.play().catch((error) => {
              console.log(error)
            })
            setResultFinishedModalOpened(true)
            toast('Dataja je so analysowala 🎉')
          } else {
            getStatus(notificationPermission)
          }
        })
        .catch((error) => {
          toast.error(error.response?.data || 'Zmylk')
          setIsLoading(false)
        })
    }, 1000)
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
