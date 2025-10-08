import { Box, Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material'
import { FC } from 'react'

export type StepType =
  | 'select-process'
  | 'audio-upload'
  | 'text-and-audio-upload'
  | 'text-upload'
  | 'settings'
  | 'upload'

interface ProcessStepperProps {
  activeStep: number
  completedSteps: number[]
  steps: StepType[]
}

const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  '&.Mui-active .MuiStepConnector-line': {
    borderColor: '#1976d2'
  },
  '&.Mui-completed .MuiStepConnector-line': {
    borderColor: '#1976d2'
  },
  '& .MuiStepConnector-line': {
    borderColor: '#e0e0e0',
    borderTopWidth: 3
  }
}))

const getStepLabel = (step: StepType): string => {
  switch (step) {
    case 'select-process':
      return 'zaměr wolić'
    case 'audio-upload':
      return 'awdijo upload'
    case 'text-and-audio-upload':
      return 'awdijo & tekst upload'
    case 'text-upload':
      return 'tekst nakładować'
    case 'settings':
      return 'nastajenja'
    case 'upload':
      return 'předźěłanje'
    default:
      return 'njeznaty'
  }
}

const ProcessStepper: FC<ProcessStepperProps> = ({ activeStep, completedSteps, steps }) => {
  return (
    <Box sx={{ width: '100%', marginBottom: { xs: 2, sm: 4 } }}>
      <Stepper
        activeStep={activeStep}
        connector={<CustomStepConnector />}
        alternativeLabel
        orientation='horizontal'
      >
        {steps.map((step, index) => (
          <Step
            key={step}
            completed={completedSteps.includes(index)}
            sx={{
              '& .MuiStepLabel-root': {
                '& .MuiStepLabel-label': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  fontWeight: 500
                },
                '& .MuiStepLabel-label.Mui-active': {
                  fontWeight: 600,
                  color: '#1976d2'
                }
              }
            }}
          >
            <StepLabel>{getStepLabel(step)}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default ProcessStepper
