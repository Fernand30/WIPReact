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

    locationChange(text){
        alert(text)
    }

   goBack(){
      Actions.pop();
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
                   <View style={Styles.menuView}>
                      <TouchableOpacity onPress={this.toggle.bind(this)} style={{width:50,marginTop:20,}}>
                          <Image source = {Images.menu} style = {Styles.menuImage}/>
                      </TouchableOpacity> 
                      <View style={{width:250,borderBottomColor:'white',borderBottomWidth:1,}}>  
                          <Text style={Styles.registryText}> Location of your contact</Text>
                      </View>    
                      <View style={{width:50}} />
                   </View>   
                   <View style={{marginLeft:20,marginTop:20,marginBottom:20}}>        
                      <TextInput onChangeText={(text) => this.locationChange(text)} style={{width:250,height:30,backgroundColor:'white',paddingLeft:10,}}>

                      </TextInput>
                   </View>   
                        
                   <View style={{alignItems:'center'}}>
                      <MapView
                          style={{
                            width:width-40,
                            height:height - 300,
                            backgroundColor:'#ff0000',
                          }}
                          initialRegion={this.state.region}
                          showsUserLocation={true}
                          followUserLocation ={true}
                          scrollEnabled ={true}
                        >
                          <Text style={{backgroundColor:'transparent',marginTop:300,marginLeft:200,fontSize:20}}> WIP</Text>  

                        </MapView>
                   </View> 
                   <View>
                       <TouchableOpacity onPress={this.goBack.bind(this)} style={Styles.backButton} >
                          <Text style={{color:'white'}}> &lt;</Text>
                       </TouchableOpacity>    
                   </View>
            </ImageBackground>
       </SideMenu>     
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);