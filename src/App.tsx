import { FC } from 'react'
import { Footer } from './components/footer'
import 'react-toastify/dist/ReactToastify.css'
import { useRoutes } from 'react-router-dom'
import { defaultRoutes } from './routes/default'
import { Box, ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import { FOOTER_HEIGHT } from './types/constants'

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    secondary: {
      main: '#d32f2f',
      light: '#ef5350',
      dark: '#c62828'
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff'
    },
    text: {
      primary: '#000000',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600
    },
    h2: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 500
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: 8
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }
    }
  }
})

const App: FC<{}> = () => {
  const content = useRoutes(defaultRoutes)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #1976d2 0%, #ffffff 50%, #d32f2f 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Box
          sx={{
            minHeight: `calc(100vh - ${FOOTER_HEIGHT}px - 16px)`,
            maxHeight: `calc(100vh - ${FOOTER_HEIGHT}px - 16px)`,
            marginBottom: `${FOOTER_HEIGHT}px`,
            width: '100%',
            maxWidth: '800px',
            overflow: 'auto',
            padding: 2,
            '&::-webkit-scrollbar': {
              display: 'none'
            },
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {content}
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
