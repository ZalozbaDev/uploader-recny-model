import { FC, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import StepSelector, { ProcessStep } from './step-selector'
import AudioUploadSection from './audio-upload-section'
import TextUploadSection from './text-upload-section'
import SettingsSection, { SettingsState } from './settings-section'
import ProcessStepper, { StepType } from './process-stepper'
import ProgressSection from './progress-section'
import ResultsSection from './results-section'
import { DEFAULT_DIARIZATION, DEFAULT_VAD } from '../types/constants'

interface ProcessFlowProps {
  isLoading: boolean
  isDisabled: boolean
  uploadProgress: UploadProgress
  models: LanguageModel[]
  onStartUpload: (
    choosenModel: LanguageModel,
    file: File,
    translate: boolean,
    diarization: number,
    vad: boolean
  ) => void
  onReset: () => void
  resultFileUrl: {
    url: string
    hasTxtDownload: boolean
    hasSrtDownload: boolean
    hasAudioDownload: boolean
  } | null
  onTokenReset?: () => void
}

const ProcessFlow: FC<ProcessFlowProps> = ({
  isLoading,
  isDisabled,
  uploadProgress,
  models,
  onStartUpload,
  onReset,
  resultFileUrl,
  onTokenReset
}) => {
  const [selectedStep, setSelectedStep] = useState<ProcessStep | null>(null)
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [audioModel, setAudioModel] = useState<LanguageModel | null>(null)
  const [textFile, setTextFile] = useState<File | null>(null)
  const [textModel, setTextModel] = useState<LanguageModel | null>(null)
  const [settings, setSettings] = useState<SettingsState>({
    enableSubtitleTranslation: false,
    diarization: DEFAULT_DIARIZATION,
    vad: DEFAULT_VAD
  })
  const [devModeOpened, setDevModeOpened] = useState(false)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const steps: StepType[] = [
    'select-process' as StepType,
    'audio-upload' as StepType,
    ...(selectedStep === 'audio-with-text' ? ['text-upload' as StepType] : []),
    'settings' as StepType,
    'upload' as StepType
  ]

  const onSetAudioFile = (file: File) => {
    setAudioFile(file)
  }

  const onSetTextFile = (file: File) => {
    setTextFile(file)
  }

  const onToggleDevMode = () => {
    setDevModeOpened(!devModeOpened)
  }

  const handleStepSelect = (step: ProcessStep) => {
    setSelectedStep(step)
    setCompletedSteps([0])
    setCurrentStepIndex(1)
    // Reset token when user selects a step (Ně or Haj)
    if (onTokenReset) {
      onTokenReset()
    }
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      if (currentStepIndex === steps.length - 2) {
        const file = audioFile || textFile
        if (file) {
          onStartUpload(
            audioModel || models[0],
            file,
            settings.enableSubtitleTranslation,
            settings.diarization,
            settings.vad
          )
        }
      }
      setCompletedSteps((prev) => [...prev, currentStepIndex])
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
      setCompletedSteps((prev) => prev.filter((step) => step !== currentStepIndex - 1))
    }
  }

  const isStepComplete = (stepIndex: number): boolean => {
    const step = steps[stepIndex]
    switch (step) {
      case 'select-process':
        return selectedStep !== null
      case 'audio-upload':
        return audioFile !== null
      case 'text-upload':
        return textFile !== null
      case 'settings':
        return true // Always complete as it's optional
      case 'upload':
        return false // Only complete when upload is done
      default:
        return false
    }
  }

  const canProceedToNext = (): boolean => {
    return isStepComplete(currentStepIndex)
  }

  return (
    <>
      <ProcessStepper activeStep={currentStepIndex} completedSteps={completedSteps} steps={steps} />

      <Box
        sx={{
          flex: 1,
          padding: 2,
          overflow: 'auto'
        }}
      >
        {models.length > 0 ? (
          <>
            {steps[currentStepIndex] === 'select-process' && (
              <StepSelector selectedStep={selectedStep} onStepSelect={handleStepSelect} />
            )}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%'
              }}
            >
              {steps[currentStepIndex] === 'audio-upload' && (
                <AudioUploadSection
                  audioFile={audioFile}
                  audioModel={audioModel || models[0]}
                  models={models}
                  isDisabled={isDisabled}
                  onSetAudioFile={onSetAudioFile}
                  onChangeAudioModel={setAudioModel}
                />
              )}

              {steps[currentStepIndex] === 'text-upload' && (
                <TextUploadSection
                  textFile={textFile}
                  textModel={textModel || models[0]}
                  models={models}
                  isDisabled={isDisabled}
                  onSetTextFile={onSetTextFile}
                  onChangeTextModel={setTextModel}
                />
              )}

              {steps[currentStepIndex] === 'settings' && (
                <SettingsSection
                  devModeOpened={devModeOpened}
                  isDisabled={isDisabled}
                  settings={settings}
                  onSettingsChange={setSettings}
                  onToggleDevMode={onToggleDevMode}
                />
              )}

              {steps[currentStepIndex] === 'upload' && (
                <Box sx={{ textAlign: 'center' }}>
                  <ProgressSection isLoading={isLoading} progress={uploadProgress} />

                  <ResultsSection resultFileUrl={resultFileUrl} onReset={onReset} />
                </Box>
              )}
            </Box>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant='h6' sx={{ marginBottom: 3 }}>
              Problem z Serwerom
            </Typography>
          </Box>
        )}
      </Box>

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto', paddingTop: 2 }}
      >
        <Button
          variant='outlined'
          startIcon={<ArrowBack />}
          onClick={handleBack}
          disabled={currentStepIndex === 0 || isDisabled}
        >
          Wróćo
        </Button>

        {currentStepIndex < steps.length - 1 && (
          <Button
            variant='contained'
            endIcon={<ArrowForward />}
            onClick={handleNext}
            disabled={!canProceedToNext() || isDisabled}
          >
            {currentStepIndex === steps.length - 2 ? 'Start' : 'Dale'}
          </Button>
        )}
      </Box>
    </>
  )
}

export default ProcessFlow
