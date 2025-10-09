import { Box, Typography, Card, CardContent } from '@mui/material'
import { FC } from 'react'

export type ProcessStep = 'audio-only' | 'audio-with-text'

interface StepSelectorProps {
  selectedStep: ProcessStep | null
  onStepSelect: (step: ProcessStep) => void
}

const StepSelector: FC<StepSelectorProps> = ({ selectedStep, onStepSelect }) => {
  return (
    <Box sx={{ textAlign: 'center', paddingBottom: { xs: 2, sm: 3 } }}>
      <Typography
        variant='h5'
        sx={{
          paddingBottom: { xs: 2, sm: 3 },
          fontWeight: 600,
          fontSize: { xs: '1.25rem', sm: '1.5rem' }
        }}
      >
        wuzwol mjez opcijomaj:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 2, sm: 3 },
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: { xs: 'column', sm: 'row' }
        }}
      >
        <Card
          sx={{
            minWidth: { xs: '100%', sm: 200 },
            maxWidth: { xs: '100%', sm: 250 },
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
          <CardContent sx={{ padding: { xs: 2, sm: 3 } }}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1 }}>
              zwuk
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              awdijo / widejo
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            minWidth: { xs: '100%', sm: 200 },
            maxWidth: { xs: '100%', sm: 250 },
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
          <CardContent sx={{ padding: { xs: 2, sm: 3 } }}>
            <Typography variant='h6' sx={{ fontWeight: 600, marginBottom: 1 }}>
              zwuk/widejo + tekst
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              mam woboje
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default StepSelector
