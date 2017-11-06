import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { StatusBar, Platform } from 'react-native';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Constants = {
    Navbar_Height : 45,
    Statusbar_Height : STATUSBAR_HEIGHT,
    Primary_Input_FontSize : responsiveFontSize(2.5),
}

export default Constants;
