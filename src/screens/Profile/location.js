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
import MapView from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import Menu from '../User/Menu';
import Geocoder from 'react-native-geocoder';

import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'
var userJson = global.user;


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.5000023;
const LONGITUDE = -66.7951947;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA =LATITUDE_DELTA * ASPECT_RATIO;

export default class Profile extends Component {

  constructor(props){
    super(props);
    Geocoder.fallbackToGoogle('AIzaSyBDlXDjhHSBgI6etr234bO23X6Dc1QYJ7I');
    Geocoder.geocodeAddress(this.props.that.state.location).then(res => {
            LATITUDE = res[0]['position']['lat']
            LONGITUDE = res[0]['position']['lng']
    }).catch(err => console.log(err))
    
    this.state = ({
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      isOpen: false,
      selectedItem: '',
      annotations: [],
      isFirstLoad:true,
      mapRegionInput: undefined,
      longitude: '',
      latitude: '',
      fullAddress: this.props.that.state.location,
    });
  }

  componentDidMount() {
    
  }

   goBack(){
      this.props.that.setState({location: this.state.fullAddress})
      Actions.pop();
   } 

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

_onRegionChangeComplete(region) {
    var NY = {
      lat: region.latitude,
      lng: region.longitude
    };
    Geocoder.geocodePosition(NY).then(res => {
      this.setState({
        fullAddress: res[0]['formattedAddress'],
      })      
    })
    .catch(err => console.log(err)) 
  }
locationChange(){
  var address  = this.state.fullAddress;
  if(address == '') address = this.props.that.state.location;

  Geocoder.geocodeAddress(address).then(res => {
      LATITUDE = res[0]['position']['lat']
      LONGITUDE = res[0]['position']['lng']
      this.setState({
        region:{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
      })
    }).catch(err => console.log(err))
}

updateMenuState(isOpen) {
  this.setState({ isOpen });
}

changeAddress(text){
  this.setState({
    fullAddress:text,
  })
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
                      <TextInput  onSubmitEditing={this.locationChange.bind(this)} value={this.state.fullAddress} onChangeText={(text) => this.changeAddress(text)} style={{width:250,height:30,backgroundColor:'white',paddingLeft:10,}}>

                      </TextInput>
                   </View>   
                        
                   <View style={{alignItems:'center'}}>
                      <MapView
                          style={{
                            width:width-40,
                            height:height - 300,
                            backgroundColor:'#ff0000',
                          }}
                          region={this.state.region}
                          showsUserLocation={true}
                          followUserLocation ={true}
                          scrollEnabled ={true}
                          onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}      
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