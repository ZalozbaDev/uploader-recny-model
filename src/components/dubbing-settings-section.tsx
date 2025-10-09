import { FC } from 'react'
import { Box, Typography } from '@mui/material'
import { LexFormatSelector } from './lex-format-selector'

interface DubbingSettingsSectionProps {
  lexFormat: LexFormat
  isDisabled: boolean
  onLexFormatChange: (lexFormat: LexFormat) => void
}

const DubbingSettingsSection: FC<DubbingSettingsSectionProps> = ({
  lexFormat,
  isDisabled,
  onLexFormatChange
}) => {
  const handleLexFormatChange = (lexFormat: LexFormat) => {
    onLexFormatChange(lexFormat)
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 600 }}>
      <Typography variant='h6' sx={{ marginBottom: 3, textAlign: 'center' }}>
        Zaměr a format wuzwolić
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: 1, minWidth: 200 }}>
          <LexFormatSelector
            lexFormat={lexFormat}
            isDisabled={isDisabled}
            onChangeLexFormat={handleLexFormatChange}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default DubbingSettingsSection
