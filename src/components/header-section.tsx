import { Typography, Box } from '@mui/material'
import { FC } from 'react'

interface HeaderSectionProps {
  title: string
  subtitle: string
}

const HeaderSection: FC<HeaderSectionProps> = ({ title, subtitle }) => {
  return (
    <Box sx={{ textAlign: 'center', marginBottom: { xs: 2, sm: 4 } }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #1976d2, #d32f2f)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: { xs: 1, sm: 2 },
          fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
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
          padding: { xs: '6px 12px', sm: '8px 16px' },
          borderRadius: 2,
          display: 'inline-block',
          fontSize: { xs: '0.875rem', sm: '1.25rem' }
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  )
}

export default HeaderSection
