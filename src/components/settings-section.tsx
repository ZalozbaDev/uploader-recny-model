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
          marginBottom: 3
        }}
      >
        <CardContent>
          <Typography variant='h6' sx={{ marginBottom: 2, fontWeight: 600 }}>
            Tekst Untertitel přełožić
          </Typography>
          <FormControl fullWidth disabled={isDisabled}>
            <InputLabel>Wuzwol opciju</InputLabel>
            <Select
              value={settings.enableSubtitleTranslation ? 'yes' : 'no'}
              label='Wuzwol opciju'
              onChange={(e) =>
                handleSettingChange('enableSubtitleTranslation', e.target.value === 'yes')
              }
            >
              <MenuItem value='no'>Ně</MenuItem>
              <MenuItem value='yes'>Haj</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Experimental Options */}
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 2
            }}
          >
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Eksperimentelne opcije
            </Typography>
            <IconButton onClick={onToggleDevMode} sx={{ marginLeft: 1 }}>
              {devModeOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
          {devModeOpened && (
            <Box sx={{ paddingTop: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                sx={{ width: '100%' }}
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
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default SettingsSection
