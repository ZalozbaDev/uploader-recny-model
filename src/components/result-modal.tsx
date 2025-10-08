import { Box, Button, Dialog, Typography } from '@mui/material'
import { FC } from 'react'

interface ResultModalProps {
  open: boolean
  onClose: () => void
}

const ResultModal: FC<ResultModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography variant='h4'>Hotowe!</Typography>
        <Button variant='outlined' onClick={onClose}>
          Cool
        </Button>
      </Box>
    </Dialog>
  )
}

export default ResultModal
