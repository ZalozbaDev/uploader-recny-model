import { FC, useState } from 'react'
import { Box, Button } from '@mui/material'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import ProcessStepper, { StepType } from './process-stepper'
import DubbingUploadSection from './dubbing-upload-section'
import ProgressSection from './progress-section'
import DubbingResultsSection from './dubbing-results-section'

interface DubbingProcessFlowProps {
  isLoading: boolean
  isDisabled: boolean
  uploadProgress: UploadProgress
  onStartUpload: (files: { audioFile: File; srtFile: File | null }) => void
  onReset: () => void
  resultFileUrl: string | null
  onTokenReset?: () => void
}

const DubbingProcessFlow: FC<DubbingProcessFlowProps> = ({
  isLoading,
  isDisabled,
  uploadProgress,
  onStartUpload,
  onReset,
  resultFileUrl,
  onTokenReset
}) => {
  const [files, setFiles] = useState<{
    audioFile: File | null
    srtFile: File | null
  }>({ audioFile: null, srtFile: null })
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const steps: StepType[] = ['file-upload' as StepType, 'upload' as StepType]

  const onSetFile = (type: DubbingFiles, file: File) => {
    setFiles((prevValue) => {
      return { ...prevValue, [type]: file }
    })
  }

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      if (currentStepIndex === steps.length - 2) {
        // Start upload when moving to upload step
        if (files.audioFile) {
          onStartUpload({
            audioFile: files.audioFile,
            srtFile: files.srtFile
          })
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
        return files.audioFile !== null
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
    setFiles({ audioFile: null, srtFile: null })
    setCurrentStepIndex(0)
    setCompletedSteps([])
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
            <DubbingUploadSection files={files} isDisabled={isDisabled} onSetFile={onSetFile} />
          )}

          {steps[currentStepIndex] === 'upload' && (
            <Box sx={{ textAlign: 'center' }}>
              <ProgressSection isLoading={isLoading} progress={uploadProgress} />

              <DubbingResultsSection resultFileUrl={resultFileUrl} onReset={handleReset} />
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

export default DubbingProcessFlow
