import { FC } from 'react'
import { Box, Button, Typography } from '@mui/material'
import Confetti from 'react-confetti'

interface DubbingResultsSectionProps {
  resultFileUrl: string | null
  onReset: () => void
}

const DubbingResultsSection: FC<DubbingResultsSectionProps> = ({ resultFileUrl, onReset }) => {
  if (!resultFileUrl) {
    return null
  }

  return (
    <Box sx={{ textAlign: 'center', marginTop: 3 }}>
      <Typography variant='h5' sx={{ marginBottom: 2 }}>
        Hotowe!
      </Typography>
      <Typography variant='body1' sx={{ marginBottom: 3 }}>
        Twój wotkaz je{' '}
        <a href={resultFileUrl + '&outputFormat=mp4'} target='_blank' rel='noopener noreferrer'>
          tule
        </a>
        .
      </Typography>
      <Button variant='contained' onClick={onReset} sx={{ marginBottom: 2 }}>
        Dalšu dataju
      </Button>
      <Confetti numberOfPieces={4000} recycle={false} tweenDuration={100000} />
    </Box>
  )
}

export default DubbingResultsSection
