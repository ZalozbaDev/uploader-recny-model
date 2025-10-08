import { FormControl, InputLabel, Select, MenuItem, Box, Typography, Tooltip } from '@mui/material'
import { FC } from 'react'
import { getIconFile } from '../helper/files'

export const LanguageModelSelector: FC<{
  languageModel: LanguageModel
  models: LanguageModel[]
  isDisabled: boolean
  onChangeLanguageModel: (model: LanguageModel) => void
}> = ({ languageModel, models, isDisabled, onChangeLanguageModel }) => {
  return (
    <FormControl fullWidth disabled={isDisabled} sx={{ maxWidth: { xs: '100%', sm: 400 } }}>
      <InputLabel>Model wuzwolić</InputLabel>
      <Select
        value={languageModel.name}
        label='Model wuzwolić'
        onChange={(e) =>
          onChangeLanguageModel(
            models.find((model) => model.name === e.target.value) as LanguageModel
          )
        }
      >
        {models.map((model) => {
          return (
            <MenuItem key={model.name} value={model.name}>
              <Tooltip title={model.description} placement='right'>
                <Box>
                  <Typography
                    variant='body1'
                    sx={{ fontWeight: 500, fontSize: { xs: '0.875rem', sm: '1rem' } }}
                  >
                    {model.title}{' '}
                    <img
                      src={getIconFile(model.language)}
                      alt={model.language}
                      width={12}
                      height={12}
                    />
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    {model.description}
                  </Typography>
                </Box>
              </Tooltip>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
