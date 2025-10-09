import { Box, Button, Link, Menu, MenuItem, Typography } from '@mui/material'
import React, { FC } from 'react'
import { FOOTER_HEIGHT } from '../types/constants'
import { ROUTES } from '../routes/default'

export const Footer: FC<{ models: LanguageModel[] }> = ({ models }) => {
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

  const getMenuPoint = (text: string, link: string, key?: number) => (
    <MenuItem onClick={handleClose} key={key || text}>
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
        height: FOOTER_HEIGHT,
        flexDirection: { xs: 'column', sm: 'row' },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: { xs: 0.5, sm: 1 },
        paddingInline: { xs: 1, sm: 2 }
      }}
    >
      <Button sx={{ color: 'black', minWidth: 'auto' }} onClick={handleClickZorla}>
        <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Žórła ▾
        </Typography>
      </Button>
      <Button sx={{ color: 'black', minWidth: 'auto' }} onClick={handleClickWotkazy}>
        <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
          Wotkazy ▾
        </Typography>
      </Button>
      <Link href={ROUTES.imprint} color='inherit' underline='hover'>
        <Button sx={{ color: 'black', minWidth: 'auto' }}>
          <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Impresum
          </Typography>
        </Button>
      </Link>
      <Link href={ROUTES['datowy-skit']} color='inherit' underline='hover'>
        <Button sx={{ color: 'black', minWidth: 'auto' }}>
          <Typography variant='body2' sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            Datowy škit
          </Typography>
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
        {models.map((model, i) => getMenuPoint(model.title, model.source, i))}
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
