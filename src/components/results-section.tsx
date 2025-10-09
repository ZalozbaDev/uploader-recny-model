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
          wotkaz za tekstowy dokument{' '}
          <a href={resultFileUrl.url + '&outputFormat=txt'} target='_blank' rel='noreferrer'>
            *.txt
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasSrtDownload && (
        <Typography>
          wotkaz za serbske podtitulki {' '}
          <a href={resultFileUrl.url + '&outputFormat=srt'} target='_blank' rel='noreferrer'>
            *.srt
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasGermanSrtDownload && (
        <Typography>
          wotkaz za němske podtitulki{' '}
          <a href={resultFileUrl.url + '&outputFormat=de.srt'} target='_blank' rel='noreferrer'>
            *.srt
          </a>
          .
        </Typography>
      )}
      {resultFileUrl.hasAudioDownload && (
        <Typography>
          wotkaz za syntetiski dubbing{' '}
          <a href={resultFileUrl.url + '&outputFormat=wav'} target='_blank' rel='noreferrer'>
            awdijo/widejo
          </a>
          .
        </Typography>
      )}

      <Confetti numberOfPieces={4000} recycle={false} tweenDuration={100000} />
    </>
  )
}

export default ResultsSection
