import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  zIndex: zIndex,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.blueGrey900,
    primary2Color: Colors.blueGrey800,
    primary3Color: Colors.blueGrey300,
    accent1Color: Colors.orangeA400,
    accent2Color: Colors.orangeA200,
    accent3Color: Colors.orangeA100,

    textColor: Colors.white,
    alternateTextColor: Colors.white,

    canvasColor: '#242426',//Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.blueGrey500
  }
};
