const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;

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
    alignSelf: "center"
  },

  logoImage: {
    width:100,
    height: 175,
    resizeMode: 'stretch'
  },

  welcomText :{
    marginTop:20,
    textAlign:'center',
    fontSize:16,
    color:'white',
    backgroundColor:'transparent',
  },

  socialButtonView:{
    paddingTop:40,
    paddingLeft:90,
    paddingRight:90,
  },

  socialIcon:{
    width:70,
    height:70,
    resizeMode:'cover',
  },

  commonText:{
    backgroundColor:'transparent',
    textAlign:'center',
    color:'white'
  },

  buttonText:{
    backgroundColor:'transparent',
    textAlign:'center',
    color:'white',
    fontWeight:'700',
  },

  flexRow:{
    flexDirection:'row',
    justifyContent:'space-between'
  },

  loginButton: {
    width:250,
    height:40,
    borderRadius:20,
    backgroundColor:'#03cca1',
    alignItems:'center',
    justifyContent:'center',
  },

  linkText:{
    textAlign:'center',
    color:'white',
    fontSize:14,
    backgroundColor:'transparent',
    marginTop:20,
    textDecorationLine:'underline'
  },
};
