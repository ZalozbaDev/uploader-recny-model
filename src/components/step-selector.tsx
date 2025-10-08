import { Box, Button, Typography, Card, CardContent } from '@mui/material'
import { FC } from 'react'

export type ProcessStep = 'audio-only' | 'audio-with-text'

interface StepSelectorProps {
  selectedStep: ProcessStep | null
  onStepSelect: (step: ProcessStep) => void
}

const StepSelector: FC<StepSelectorProps> = ({ selectedStep, onStepSelect }) => {
  return (
    <Box sx={{ textAlign: 'center', paddingBottom: 3 }}>
      <Typography variant='h5' sx={{ paddingBottom: 3, fontWeight: 600 }}>
        Maš tekst abo nic?
      </Typography>
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card
          sx={{
            minWidth: 200,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: selectedStep === 'audio-only' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedStep === 'audio-only' ? 4 : 2,
            border: selectedStep === 'audio-only' ? '3px solid' : '2px solid #e0e0e0',
            borderColor: selectedStep === 'audio-only' ? '#1976d2' : '#e0e0e0',
            backgroundColor: selectedStep === 'audio-only' ? 'rgba(25, 118, 210, 0.05)' : '#ffffff'
          }}
          onClick={() => onStepSelect('audio-only')}
        >
          <CardContent>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1 }}>
              Ně
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Jenož zwuk
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: 200,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: selectedStep === 'audio-with-text' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: selectedStep === 'audio-with-text' ? 4 : 2,
            border: selectedStep === 'audio-with-text' ? '3px solid' : '2px solid #e0e0e0',
            borderColor: selectedStep === 'audio-with-text' ? '#d32f2f' : '#e0e0e0',
            backgroundColor:
              selectedStep === 'audio-with-text' ? 'rgba(211, 47, 47, 0.05)' : '#ffffff'
          }}
          onClick={() => onStepSelect('audio-with-text')}
        >
          <CardContent>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1 }}>
              Haj
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Zwuk + Tekst
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default StepSelector
