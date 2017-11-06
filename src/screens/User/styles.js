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

  flexView: {
    marginTop:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },

  commonView:{
    alignItems:'center'
  },

  menuView: {
    marginTop:30,
    flexDirection:'row',
    justifyContent:'space-between',
  },

  menuImage: {
    marginLeft:10,
    width:30,
    height: 20,
    resizeMode: 'stretch'
  },

  commonButton: {
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:15,
    height:30,
    backgroundColor:'green',
    alignItems:'center',
    justifyContent:'center',
    marginLeft:30,
  },

  keyImageView: {
    marginLeft:10,
    width:30,
    height: 30,
    resizeMode: 'stretch',
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
    color:'white',
  },

  leftText:{
    backgroundColor:'transparent',
    color:'white',
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

  registryText:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    backgroundColor:'transparent'
  },

  readyButton: {marginRight:10,width:100,height:40,borderRadius:10,backgroundColor:'green',alignItems:'center',justifyContent:'center'},

  photoView: {width:60,height:60,borderRadius:30,resizeMode:'cover',marginLeft:30},

  textInputStyle: {paddingLeft:10,marginTop:10,backgroundColor:'#64a17e', width:140,height:30,borderRadius:15},
};
