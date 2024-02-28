import { Box, Button, Container, Typography } from '@mui/material'
import { FileUploader } from './components/file-uploader'
import { LanguageModelSelector } from './components/language-model-selector'
import { FC, useState } from 'react'
import { OutputFormatSelector } from './components/output-format-selector'
import { generateId } from './helper/random'
import { LinearProgressWithLabel } from './components/linear-progress-with-label'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const DEFAULT_LANGUAGE_MODEL: LanguageModel = 'HF'
const DEFAULT_OUTPUT_FORMAT: OutputFormat = 'Text'
const token = generateId(32)

const App: FC<{}> = () => {
  const [choosenModel, setChoosenModel] = useState<LanguageModel>(DEFAULT_LANGUAGE_MODEL)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>(DEFAULT_OUTPUT_FORMAT)
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgess] = useState(0)
  const [file, setFile] = useState<File | null>(null)
  const [resultFileUrl, setResultFileUrl] = useState<string | null>(null)

  const onStartUpload = () => {
    setIsLoading(true)
    if (file) {
      const formData = new FormData()
      formData.append('fileName', file.name)
      formData.append('token', token)
      formData.append('languageModel', choosenModel)
      formData.append('outputFormat', outputFormat)
      formData.append('file', file)

      setIsLoading(true)
      setProgess(0)
      axios
        .post(process.env.REACT_APP_SERVER_URL + '/upload', formData, {
          headers: {
            'content-type': 'multipart/form-data'
          },
          onUploadProgress: function (progressEvent) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
            )
            setProgess(percentCompleted)
          }
        })
        .then((response) => {
          toast('Start 🚀')
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
      axios
        .get(process.env.REACT_APP_SERVER_URL + '/status?token=' + token)
        .then((response) => {
          if (response.data === -1) {
            setProgess(100)
            setResultFileUrl(
              `${process.env.REACT_APP_SERVER_URL}/download?token=${token}&filename=${file?.name}.${outputFormat}`
            )
            toast('Dataja je so analysowala 🎉')
          } else {
            setProgess(response.data)
            getStatus()
          }
        })
        .catch((error) => {})
    }, 1000)
  }

  return (
    <Container>
      <ToastContainer />
      <Typography variant='h3'>File Uploader</Typography>
      <FileUploader file={file} onSetFile={setFile} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', maxWidth: 200 }}>
        <LanguageModelSelector
          languageModel={choosenModel}
          onChangeLanguageModel={setChoosenModel}
        />
        <OutputFormatSelector outputFormat={outputFormat} onChangeOutputFormat={setOutputFormat} />
      </Box>

      <Button onClick={onStartUpload} disabled={file === null}>
        Upload
      </Button>

      {isLoading === true && (
        <>
          <Typography>is loading.... and saving stuff in {token}</Typography>
          <LinearProgressWithLabel progress={progress} />
        </>
      )}

      {resultFileUrl && (
        <>
          <Typography>Done!</Typography>
          <Typography>
            Twoj Link je: <a href={resultFileUrl}>Link</a>
          </Typography>
        </>
      )}
    </Container>
  )
}

export default App
