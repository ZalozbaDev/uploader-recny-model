import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import Confetti from 'react-confetti'

interface ResultsSectionProps {
  resultFileUrls: ResultFileUrls | null
  onReset: () => void
}

const ResultsSection: FC<ResultsSectionProps> = ({ resultFileUrls, onReset }) => {
  if (!resultFileUrls) return null

  return (
    <>
      <Button onClick={onReset}>Dalšu dataju</Button>
      <Typography>Hotowe!</Typography>
      {resultFileUrls.text && (
        <Typography>
          Twój wotkaz za tekst je{' '}
          <a href={resultFileUrls.text} target='_blank' rel='noreferrer'>
            tule
          </a>
          .
        </Typography>
      )}
      {resultFileUrls.srt && (
        <Typography>
          Twój wotkaz za srt je{' '}
          <a href={resultFileUrls.srt} target='_blank' rel='noreferrer'>
            srt
          </a>
          .
        </Typography>
      )}
      {resultFileUrls.wav && (
        <Typography>
          Twój wotkaz za wav je{' '}
          <a href={resultFileUrls.wav} target='_blank' rel='noreferrer'>
            wav
          </a>
          .
        </Typography>
      )}

      <Confetti numberOfPieces={4000} recycle={false} tweenDuration={100000} />
    </>
  )
}

export default ResultsSection
