const React = require("react-native");
const { Dimensions, Platform } = React;
const commonColor = require("../../theme/variables/commonColor");
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
const viewSpace = responsiveHeight(2);
const statusBar = responsiveHeight(3);
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
    marginTop:viewSpace,
  },

  statusBar: {
      height:statusBar,
  },

  bottomflexView: {
    marginTop:viewSpace,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },


  commonView:{
    alignItems:'center'
  },

  backButton:{
      marginTop:responsiveHeight(5),
      marginLeft:20,
      width:40,
      height:30,
      borderRadius:10,
      paddingLeft:5,
      justifyContent:'center',
      backgroundColor:'#e06666',
  },

  menuView: {
    marginTop: 30,
    flexDirection:'row',
    justifyContent:'space-between'
  },

  menuImage: {
    marginLeft:responsiveHeight(5),
    width:30,
    height: 20,
    resizeMode: 'stretch'
  },

  commonText:{
    backgroundColor:'transparent',
    marginLeft:10,
    color:'white',
  },

  leftText:{
    backgroundColor:'transparent',
    color:'white',
    width: 130,
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
    fontSize: responsiveFontSize(3),
    backgroundColor:'transparent'
  },

  readyButton: {marginRight:10,width:100,height:40,borderRadius:10,backgroundColor:'green',alignItems:'center',justifyContent:'center'},

  photoView: {width:60,height:60,borderRadius:30,resizeMode:'cover',},

  textInputStyle: {paddingLeft:10,backgroundColor:'#64a17e', width:140,height:30,borderRadius:15},
  eachView: {flexDirection:'row', marginTop:20,paddingLeft:10,alignItems:'center'},
};
