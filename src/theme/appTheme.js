import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  overrides: {
    palette: {
      secondary: {
        color: 'red'
      } },
    MuiTypography: {
      h6: {
        fontFamily: "'Titillium Web', sans-serif"

      },
      body1: {
        fontFamily: "'Titillium Web', sans-serif"
  
      }
    },
    MuiButton: {
      label: {
        fontFamily: "'Titillium Web', sans-serif",
        fontSize: '13px',
        fontWeight: 'bolder'
      } },
    typography: {
      body1: {
        fontFamily: "'Titillium Web', sans-serif",
        //   fontFamily: "'Open Sans', sans-serif",
        fontWeight: 400,
        //   fontSize: 16,
        color: '#0c1131'
      }
    }

  },
  MuiTypography: {
    root: {
      fontFamily: "'Titillium Web', sans-serif"
    }
  }

})

export default theme
