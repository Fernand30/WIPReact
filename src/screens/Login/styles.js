const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const deviceHeight = Dimensions.get("window").height;
const imagesize = responsiveHeight(10);
export default {
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
  },

  commonView:{
    alignItems:'center'
  },

  logoImageView: {
    marginTop: 30,
    alignItems: "center"
  },

  logoImage: {
    height: 137, // 50% of screen height
    width: 100, // 50% of screen width
    resizeMode: 'cover'
  },

  whereText :{
    marginTop:5,
    textAlign:'center',
    fontSize: responsiveFontSize(3),
    color:'white',
    backgroundColor:'transparent',
  },

  welcomText :{
    marginTop:20,
    textAlign:'center',
    fontSize: responsiveFontSize(2),
    color:'white',
    backgroundColor:'transparent',
  },

  socialButtonView:{
    paddingTop:responsiveHeight(5),
    paddingLeft:responsiveWidth(25),
    paddingRight:responsiveWidth(25),
    paddingBottom:responsiveHeight(5),
  },

  socialIcon:{
    height: imagesize, 
    width: imagesize, 
    resizeMode:'cover',
  },

  commonText:{
    backgroundColor:'transparent',
    textAlign:'center',
    color:'white',
    fontSize: responsiveFontSize(5),
  },

  buttonText:{
    backgroundColor:'transparent',
    textAlign:'center',
    color:'white',
    fontWeight:'700',
    fontSize: responsiveFontSize(2),
  },

  flexRow:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  loginButton: {
    height: responsiveHeight(5), // 50% of screen height
    width: responsiveWidth(60), // 50% of screen width
    borderRadius:20,
    backgroundColor:'#03cca1',
    alignItems:'center',
    justifyContent:'center',
  },

  linkText:{
    textAlign:'center',
    color:'white',
    fontSize: responsiveFontSize(2),
    backgroundColor:'transparent',
    marginTop:20,
    textDecorationLine:'underline'
  },
};
