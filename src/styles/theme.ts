import {getMuiTheme, lightBaseTheme} from 'material-ui/styles'

interface Palette {
  colorPrimary: string
  colorAccent: string
}

const palette: Palette = require('!!sass-variable-loader!../../src/styles/_palette.scss')
const variables = require('!!sass-variable-loader!../../src/styles/_variables.scss')

const theme = getMuiTheme({
  palette: {
    primary1Color: palette.colorPrimary,
    primary2Color: palette.colorPrimary,
    primary3Color: palette.colorPrimary,
    accent1Color: palette.colorAccent,
    accent2Color: palette.colorAccent,
    accent3Color: palette.colorAccent,
  },
  appBar: {
    height: Number(variables.appBarHeight)
  }
})

export default theme
