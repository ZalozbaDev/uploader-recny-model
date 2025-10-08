import { Typography, Box } from '@mui/material'
import { FC } from 'react'

interface HeaderSectionProps {
  title: string
  subtitle: string
}

const HeaderSection: FC<HeaderSectionProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2, #d32f2f)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: 2
        }}
      >
        {title}
      </Typography>
      <Typography
        variant='h6'
        sx={{
          color: 'text.secondary',
          fontWeight: 500,
          backgroundColor: 'rgba(25, 118, 210, 0.15)',
          border: '2px solid #1976d2',
          padding: '8px 16px',
          borderRadius: 2,
          display: 'inline-block'
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  )
}

export default HeaderSection
