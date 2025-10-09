import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { FC } from 'react'
import { getLexFormatText } from '../helper/translations'
import { possibleLexFormats } from '../types/constants'

// Define the type locally to avoid import issues
type LexFormat = 'SAMPA' | 'KALDI' | 'UASR'

export const LexFormatSelector: FC<{
  lexFormat: LexFormat
  isDisabled: boolean
  onChangeLexFormat: (format: LexFormat) => void
}> = ({ lexFormat, isDisabled, onChangeLexFormat }) => {
  // Ensure we always have a valid value to prevent controlled/uncontrolled issues
  const safeLexFormat = lexFormat || 'KALDI'

  return (
    <FormControl fullWidth disabled={isDisabled}>
      <InputLabel>Lex Format</InputLabel>
      <Select
        value={safeLexFormat}
        label='Lex Format'
        onChange={(e) => onChangeLexFormat(e.target.value as LexFormat)}
      >
        {possibleLexFormats.map((item) => (
          <MenuItem key={item} value={item}>
            {getLexFormatText(item).title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
