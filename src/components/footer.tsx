import { Box, Button, Link, Menu, MenuItem, Typography } from '@mui/material'
import React, { FC } from 'react'
import { FOOTER_HEIGHT } from '../types/constants'
import { ROUTES } from '../routes/default'

export const Footer: FC<{}> = () => {
  const [anchorElZorla, setAnchorElZorla] = React.useState<null | HTMLElement>(null)
  const [anchorElWotkazy, setAnchorElWotkazy] = React.useState<null | HTMLElement>(null)
  const openZorla = Boolean(anchorElZorla)
  const openWotkazy = Boolean(anchorElWotkazy)
  const handleClickZorla = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElZorla(event.currentTarget)
  }
  const handleClickWotkazy = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElWotkazy(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorElZorla(null)
    setAnchorElWotkazy(null)
  }

  const getMenuPoint = (text: string, link: string) => (
    <MenuItem onClick={handleClose}>
      <Link href={link} target='_blank' rel='noopener' color='inherit' underline='hover'>
        <Typography variant='caption'>{text}</Typography>
      </Link>
    </MenuItem>
  )

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255,255,255,0.8)',
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: 0,
        FOOTER_HEIGHT: FOOTER_HEIGHT,
        flexDirection: 'row'
      }}
    >
      <Button sx={{ color: 'black' }} onClick={handleClickZorla}>
        <Typography variant='body1'>Žórła ▾</Typography>
      </Button>
      <Button sx={{ color: 'black' }} onClick={handleClickWotkazy}>
        <Typography variant='body1'>Wotkazy ▾</Typography>
      </Button>
      <Link href={ROUTES.imprint} color='inherit' underline='hover'>
        <Button sx={{ color: 'black' }}>
          <Typography variant='body1'>Impresum</Typography>
        </Button>
      </Link>
      <Link href={ROUTES['datowy-skit']} color='inherit' underline='hover'>
        <Button sx={{ color: 'black' }}>
          <Typography variant='body1'>Datowy škit</Typography>
        </Button>
      </Link>

      <Menu
        id='basic-menu'
        anchorEl={anchorElWotkazy}
        open={openWotkazy}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {getMenuPoint(
          'Korla Baier small HSB (huggingface hub)',
          'https://huggingface.co/spaces/Korla/hsb_stt_demo/tree/main'
        )}
        {getMenuPoint(
          'Europeada 2022 HSB modele (huggingface hub)',
          'https://huggingface.co/danielzoba/whisper_small_adapted_2024_06_03'
        )}
        {getMenuPoint(
          'Fraunhofer IKTS (homepage)',
          'https://www.ikts.fraunhofer.de/de/industrieloesungen/akustische_diagnostik/bio_sprachsignale.html'
        )}
        {getMenuPoint(
          'Korla Baier large HSB (huggingface hub)',
          'https://huggingface.co/Korla/whisper-large-hsb'
        )}
        {getMenuPoint('Wuwiće strony (homepage)', 'https://fs-coding.com')}
      </Menu>
      <Menu
        id='basic-menu'
        anchorEl={anchorElZorla}
        open={openZorla}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {getMenuPoint('Whisper (github)', 'https://github.com/openai/whisper')}
        {getMenuPoint('Whisper.cpp (github)', 'https://github.com/ggerganov/whisper.cpp')}
        {getMenuPoint('Fairseq (github)', 'http://github.com/facebookresearch/fairseq')}
        {getMenuPoint(
          'Žórła aplikacije (github)',
          'https://github.com/ZalozbaDev/uploader-recny-model/'
        )}
        {getMenuPoint(
          'Žórła servera (github)',
          'https://github.com/ZalozbaDev/uploader-recny-model-server/'
        )}
      </Menu>
    </Box>
  )
}
