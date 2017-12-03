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
  ListView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MapView from 'react-native-maps';
import SideMenu from 'react-native-side-menu';
import Menu from '../User/Menu';
import Geocoder from 'react-native-geocoder';
import GooglePlaceAutocomplete from 'react-native-google-place-autocomplete';

import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'
var userJson = global.user;


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 10.5000023;
const LONGITUDE = -66.7951947;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA =LATITUDE_DELTA * ASPECT_RATIO;
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
      dataSource: ds.cloneWithRows(['row1','row2']),
    });
  }

  componentDidMount() {
    
  }

  nothingBack(){
   Actions.pop();  
  }
 goBack(item){
    this.props.that.setState({location: item})
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
        dataSource: ds.cloneWithRows([res[0]['formattedAddress']]),
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
      
       const region = {
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,    
      }
      this._onRegionChangeComplete(region)
    }).catch(err => alert(err))
    
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
    
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
            <ImageBackground source = {Images.bg} style = {Styles.backgroundImage}>
              <View style={{height:40,}}/>
                  <View style={{flexDirection:'row'}}>
                   <GooglePlaceAutocomplete
                      style={{flex:1,marginLeft:10,marginRight:10}}
                      googleAPIKey="AIzaSyBDlXDjhHSBgI6etr234bO23X6Dc1QYJ7I"
                      onResult={(result) => this.goBack(result.formatted_address)}
                      placeholder="Enter location..." />
                        
                   <TouchableOpacity onPress={this.nothingBack.bind(this)} style={{position:'absolute',top:10,right:20,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{color:'black',fontSize:18}}>Cancel</Text>
                    </TouchableOpacity>
                  </View>    
            </ImageBackground>
       </SideMenu>     
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);