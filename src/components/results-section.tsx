import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import Confetti from 'react-confetti'

interface ResultsSectionProps {
  resultFileUrl: {
    url: string
    hasTxtDownload: boolean
    hasSrtDownload: boolean
    hasAudioDownload: boolean
    hasGermanSrtDownload: boolean
  } | null
  onReset: () => void
}

const ResultsSection: FC<ResultsSectionProps> = ({ resultFileUrl, onReset }) => {
  if (!resultFileUrl) return null

  return (
    <>
      <Button onClick={onReset}>Dalšu dataju</Button>
      <Typography>Hotowe!</Typography>
      {resultFileUrl.hasTxtDownload && (
        <Typography>
          Twój wotkaz za tekst je{' '}
          <a href={resultFileUrl.url + '&outputFormat=txt'} target='_blank' rel='noreferrer'>
            tule
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasSrtDownload && (
        <Typography>
          Twój wotkaz za srt je{' '}
          <a href={resultFileUrl.url + '&outputFormat=srt'} target='_blank' rel='noreferrer'>
            tule
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasGermanSrtDownload && (
        <Typography>
          Twój wotkaz za němski srt je{' '}
          <a href={resultFileUrl.url + '&outputFormat=de.srt'} target='_blank' rel='noreferrer'>
            tule
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasAudioDownload && (
        <Typography>
          Twój wotkaz za awdio je{' '}
          <a href={resultFileUrl.url + '&outputFormat=wav'} target='_blank' rel='noreferrer'>
            tule
          </a>
          .
        </Typography>
      )}

      <Confetti numberOfPieces={4000} recycle={false} tweenDuration={100000} />
    </>
  )
}

export default ResultsSection
