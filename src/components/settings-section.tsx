import {
  Box,
  IconButton,
  Typography,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  TextField
} from '@mui/material'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'
import { FC } from 'react'

export interface SettingsState {
  enableSubtitleTranslation: boolean
  diarization: number
  vad: boolean
}

interface SettingsSectionProps {
  devModeOpened: boolean
  isDisabled: boolean
  settings: SettingsState
  onSettingsChange: (settings: SettingsState) => void
  onToggleDevMode: () => void
}

const SettingsSection: FC<SettingsSectionProps> = ({
  devModeOpened,
  isDisabled,
  settings,
  onSettingsChange,
  onToggleDevMode
}) => {
  const handleSettingChange = (key: keyof SettingsState, value: boolean | number) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }
  return (
    <Box sx={{ width: '100%', textAlign: 'center' }}>
      {/* Subtitle Translation Dropdown */}
      <Card
        sx={{
          marginBottom: { xs: 2, sm: 3 }
        }}
      >
        <CardContent sx={{ padding: { xs: 2, sm: 3 } }}>
          <Typography
            variant='h6'
            sx={{
              marginBottom: { xs: 1, sm: 2 },
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            přidatnje hišće do němčiny přełožić
          </Typography>
          <FormControl fullWidth disabled={isDisabled} sx={{ maxWidth: { xs: '100%', sm: 400 } }}>
            <InputLabel>Wuzwol opciju</InputLabel>
            <Select
              value={settings.enableSubtitleTranslation ? 'yes' : 'no'}
              label='Wuzwol opciju'
              onChange={(e) =>
                handleSettingChange('enableSubtitleTranslation', e.target.value === 'yes')
              }
            >
              <MenuItem value='no'>ně</MenuItem>
              <MenuItem value='yes'>haj</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Experimental Options */}
      <Card>
        <CardContent sx={{ padding: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: { xs: 1, sm: 2 },
              flexWrap: 'wrap'
            }}
          >
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.25rem' }
              }}
            >
              eksperimentelne opcije
            </Typography>
            <IconButton onClick={onToggleDevMode} sx={{ marginLeft: 1 }}>
              {devModeOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
          {devModeOpened && (
            <Box
              sx={{
                paddingTop: { xs: 1, sm: 2 },
                display: 'flex',
                flexDirection: 'column',
                gap: { xs: 1.5, sm: 2 },
                alignItems: 'center'
              }}
            >
              <TextField
                label='Rečniki'
                type='number'
                value={settings.diarization}
                onChange={(e) => handleSettingChange('diarization', parseInt(e.target.value) || 0)}
                disabled={isDisabled}
                inputProps={{
                  min: 0,
                  max: 10,
                  step: 1
                }}
                sx={{ width: '100%', maxWidth: { xs: '100%', sm: 300 } }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={settings.vad}
                    onChange={(e) => handleSettingChange('vad', e.target.checked)}
                    disabled={isDisabled}
                  />
                }
                label='VAD (Voice Activity Detection)'
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default SettingsSection
