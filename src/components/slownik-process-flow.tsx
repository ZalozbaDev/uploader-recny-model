import { FC, useState } from 'react'
import { Box, Button } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import ProcessStepper, { StepType } from './process-stepper'
import SlownikUploadSection from './slownik-upload-section'
import SlownikSettingsSection from './slownik-settings-section'
import ProgressSection from './progress-section'
import SlownikResultsSection from './slownik-results-section'
import { DEFAULT_LEX_FORMAT } from '../types/constants'

interface SlownikProcessFlowProps {
  isLoading: boolean
  isDisabled: boolean
  uploadProgress: UploadProgress
  onStartUpload: (
    files: {
      phonmap: File
      exceptions: File
      korpus: File
    },
    lexFormat: LexFormat
  ) => void
  onReset: () => void
  resultFileUrl: string | null
  onTokenReset?: () => void
}

const SlownikProcessFlow: FC<SlownikProcessFlowProps> = ({
  isLoading,
  isDisabled,
  uploadProgress,
  onStartUpload,
  onReset,
  resultFileUrl,
  onTokenReset
}) => {
  const [files, setFiles] = useState<{
    phonmap: File | null
    exceptions: File | null
    korpus: File | null
  }>({ phonmap: null, exceptions: null, korpus: null })
  const [lexFormat, setLexFormat] = useState<LexFormat>(DEFAULT_LEX_FORMAT)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  console.log('lexFormat', lexFormat)
  const steps: StepType[] = [
    'file-upload' as StepType,
    'settings' as StepType,
    'upload' as StepType
  ]

  const onSetFile = (type: SlownikFiles, file: File) => {
    setFiles((prevValue) => {
      return { ...prevValue, [type]: file }
    })
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      if (currentStepIndex === steps.length - 2) {
        // Start upload when moving to upload step
        if (files.phonmap && files.exceptions && files.korpus) {
          onStartUpload(
            {
              phonmap: files.phonmap,
              exceptions: files.exceptions,
              korpus: files.korpus
            },
            lexFormat
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
      case 'file-upload':
        return files.phonmap !== null && files.exceptions !== null && files.korpus !== null
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

  const handleReset = () => {
    setFiles({ phonmap: null, exceptions: null, korpus: null })
    setCurrentStepIndex(0)
    setCompletedSteps([])
    setLexFormat(DEFAULT_LEX_FORMAT)
    onReset()
  }

  return (
    <>
      <ProcessStepper activeStep={currentStepIndex} completedSteps={completedSteps} steps={steps} />

      <Box
        sx={{
          flex: 1,
          padding: { xs: 1, sm: 2 },
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          {steps[currentStepIndex] === 'file-upload' && (
            <SlownikUploadSection files={files} isDisabled={isDisabled} onSetFile={onSetFile} />
          )}

          {steps[currentStepIndex] === 'settings' && (
            <SlownikSettingsSection
              lexFormat={lexFormat}
              isDisabled={isDisabled}
              onLexFormatChange={setLexFormat}
            />
          )}

          {steps[currentStepIndex] === 'upload' && (
            <Box sx={{ textAlign: 'center' }}>
              <ProgressSection isLoading={isLoading} progress={uploadProgress} />

              <SlownikResultsSection resultFileUrl={resultFileUrl} onReset={handleReset} />
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: { xs: 1, sm: 2 },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}
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
            {currentStepIndex === steps.length - 2 ? 'start' : 'dale'}
          </Button>
        )}
      </Box>
    </>
  )
}

export default SlownikProcessFlow
