import React,{Component,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Menu from '../User/Menu';

import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'
var userJson = global.user;


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.5000023;
const LONGITUDE = -66.7951947;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class Profile extends Component {

  constructor(props){
    super(props);
    this.state = ({
      pub: 'Public',
      costUnit: '$',
      money: '0 ~ 10',
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isOpen: false,
      selectedItem: '',
    });
  }

  componentDidMount() {
      
    }

   searchWip(){
      
   }

   goBack(){
      Actions.login();
   } 

   selectPublic(idx,value){
    this.setState({
      pub:value,
    })
   }

   selectCostUnit(idx,value){
    this.setState({
      costUnit:value,
    })
   }

   selectMoney(idx,value){
    this.setState({
      money:value,
    })
   }

   goOnEvent(){
     Actions.user();
   }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  render() {
    that = this;
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
            <ImageBackground source = {Images.bg} style = {Styles.backgroundImage}>
                   <View style={{height:20,}}/>
                   <KeyboardAwareScrollView>
                   <View style={Styles.menuView}>
                      <TouchableOpacity onPress={this.toggle.bind(this)} style={{flex:1,marginTop:20,}}>
                          <Image source = {Images.menu} style = {Styles.menuImage}/>
                      </TouchableOpacity> 
                      <View style={{borderBottomColor:'white',borderBottomWidth:1,paddingLeft:5,paddingRight:5,paddingBottom:5,}}>   
                          <Text style={Styles.registryText}>Events</Text>
                      </View>    
                      <View style={{flex:1}} />
                   </View>   
                   <View style={Styles.flexView}>        
                      <TouchableOpacity onPress = {this.searchWip.bind(this)} style={Styles.searchWipButton}>
                          <Text style={{color:'white'}}> Search WIP</Text>
                      </TouchableOpacity>
                      <ModalDropdown options={['Public', 'Private']}
                            style={{marginTop:10,width:120,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                            textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                            dropdownStyle={{width:100,height:60,backgroundColor:'#64a17e',marginRight:10,marginTop:5,borderWidth:0}}
                            dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                            onSelect={(idx, value) => this.selectPublic(idx, value)}
                            
                          >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                              <Text style={{marginTop:5,}}>{this.state.pub}</Text>
                              <Image source={Images.dropdown} style={{marginLeft:20,marginTop:10,width:20,height:10,marginRight:10}}/>
                            </View>  
                          </ModalDropdown>   
                   </View>   
                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}>Cost of Entry: </Text>
                       <ModalDropdown options={['$', '£','€']}
                            style={{marginTop:10,width:60,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                            textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                            dropdownStyle={{width:40,height:90,backgroundColor:'#64a17e',marginLeft:10,marginTop:5,borderWidth:0}}
                            dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                            onSelect={(idx, value) => this.selectCostUnit(idx, value)}
                            
                          >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                              <Text style={{marginRight:10,marginTop:5,}}>{this.state.costUnit}</Text>
                              <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                            </View>  
                       </ModalDropdown>   
                       <ModalDropdown options={['0 ~ 10', '10 ~ 100']}
                        style={{marginTop:10,width:120,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                        textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                        dropdownStyle={{width:100,height:120,backgroundColor:'#64a17e',marginRight:10,marginTop:5,borderWidth:0}}
                        dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                        onSelect={(idx, value) => this.selectMoney(idx, value)}                            
                        >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                              <Text style={{marginRight:10,marginTop:5,}}>{this.state.money}</Text>
                              <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                            </View>  
                        </ModalDropdown>   
                   </View>   
                   <View style={Styles.mapView}>
                      <MapView
                          style={{
                            width:width-40,
                            height:height - 300,
                            backgroundColor:'#ff0000',
                          }}
                          initialRegion={this.state.region}
                        >
                          <Text style={{backgroundColor:'transparent',marginTop:300,marginLeft:200,fontSize:20}}> WIP</Text>  

                        </MapView>
                   </View> 
                   <View style={{alignItems:'center'}}>
                       <TouchableOpacity onPress={this.goOnEvent.bind(this)} style={Styles.onEventButton} >
                          <Text style={{color:'white'}}> Add on event</Text>
                       </TouchableOpacity>    
                   </View>
            </KeyboardAwareScrollView>       
            </ImageBackground>
       </SideMenu>     
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);