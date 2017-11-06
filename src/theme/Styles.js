import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Metrics from './Metrics';
import Constants from './Constants';
import Fonts from './Fonts';

const Styles = {
    container : {
        flex : 1,
    },

    fullContainer : {
        width : Metrics.screenWidth,
        height : Metrics.screenHeight,
    },

    columnContainer : {
        flex : 1,
        flexDirection : 'column'
    },

    rowContainer : {
        flex : 1,
        flexDirection : 'row',
    },
    responsiveContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: responsiveHeight(50), // 50% of screen height
      width: responsiveWidth(50), // 50% of screen width
    },
    sampleText: {
      fontSize: responsiveFontSize(5), // 2% of total screen size
      fontFamily:Fonts.ultra,
    },
    alignCenter:{
      alignItems:'center'
    },
    justifyCenter:{
      justifyContent:'center'
    },
}

export default Styles;
