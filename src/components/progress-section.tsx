import { Typography, Card, CardContent, Box } from '@mui/material'
import { FC } from 'react'
import { LinearProgressWithLabel } from './linear-progress-with-label'
import { formatSecondsToReadableDuration } from '../helper/dates'
import { INVALID_DURATION } from '../types/constants'

interface ProgressSectionProps {
  isLoading: boolean
  progress: {
    status: number
    message: string
    duration: number
  }
}

const ProgressSection: FC<ProgressSectionProps> = ({ isLoading, progress }) => {
  if (!isLoading) return null

  return (
    <Card
      sx={{
        marginTop: 3,
        backgroundColor: 'rgba(25, 118, 210, 0.05)',
        border: '2px solid #1976d2'
      }}
    >
      <CardContent>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant='h6' sx={{ marginBottom: 2, fontWeight: 600 }}>
            {progress.message}
          </Typography>
          {progress.duration !== INVALID_DURATION && (
            <Typography variant='body2' color='text.secondary' sx={{ marginBottom: 2 }}>
              proces traje něhdźe {formatSecondsToReadableDuration(progress.duration)}h.
            </Typography>
          )}
          <LinearProgressWithLabel progress={progress.status} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default ProgressSection
