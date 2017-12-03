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
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import ModalDropdown from 'react-native-modal-dropdown';
import MapView from 'react-native-maps';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
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
      nationality: 'Unspecified',
      hobbies: 'Unspecified',
      music: 'Unspecified',
      sport: 'Unspecified',
      drink: 'Unspecified',
      identify: 'Unspecified',
      searchText:'',
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

   goBack(){
      Actions.pop();
   } 

   selectNationality(idx,value){
    this.setState({
      nationality:value,
    })
   }

   selectHobbies(idx,value){
    this.setState({
      hobbies:value,
    })
   }

   selectMusic(idx,value){
    this.setState({
      music:value,
    })
   }

   selectSport(idx,value){
    this.setState({
      sport:value,
    })
   }

   selectDrink(idx,value){
    this.setState({
      drink:value,
    })
   }

   selectIdentify(idx,value){
    this.setState({
      identify:value,
    })
   }

   goReady(){
     Actions.addcontact()
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
                          <Text style={Styles.registryText}> Profile</Text>
                      </View>    
                      <View style={{flex:1}} />
                   </View>   
                   
                   <View style={Styles.flexView}>
                      <View style={{flex:1,paddingRight:5}}>
                            <Text style={Styles.commonText}>Nationality: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginLeft:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectNationality(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.nationality}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>   
                       </View>

                       <View style={{flex:1,paddingLeft:5}}>
                            <Text style={Styles.commonText}>Hobbies: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginRight:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectHobbies(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.hobbies}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>    
                       </View>    
                   </View> 
                   <View style={Styles.flexView}>
                      <View style={{flex:1,paddingRight:5}}>
                            <Text style={Styles.commonText}>Favorite music: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginLeft:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectNationality(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.nationality}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>   
                       </View>

                       <View style={{flex:1,paddingLeft:5}}>
                            <Text style={Styles.commonText}>Sport: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginRight:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectHobbies(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.hobbies}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>    
                       </View>    
                   </View> 
                   <View style={Styles.flexView}>
                      <View style={{flex:1,paddingRight:5}}>
                            <Text style={Styles.commonText}>Drink: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginLeft:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectNationality(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.nationality}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>   
                       </View>

                       <View style={{flex:1,paddingLeft:5}}>
                            <Text style={Styles.commonText}>You Identify as: </Text>
                             <ModalDropdown options={['Unspecified', 'Specified']}
                                  style={{marginTop:10,width:Metrics.modalWidth,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                                  textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                                  dropdownStyle={{width:Metrics.modalWidth-30,height:60,backgroundColor:'#64a17e',marginRight:15,marginTop:5,borderWidth:0}}
                                  dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                                  onSelect={(idx, value) => this.selectHobbies(idx, value)}
                                  
                                >
                                  <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{marginRight:10,marginTop:5,}}>{this.state.hobbies}</Text>
                                    <Image source={Images.dropdown} style={{marginTop:10,width:20,height:10,marginRight:10}}/>
                                  </View>  
                             </ModalDropdown>    
                       </View>    
                   </View> 

                  <View style={Styles.flexView}>
                      <Text style={Styles.commonText}> Place of study: </Text>
                      <View style={{flexDirection:'row',marginRight:10,}}>
                          <TextInput onChangeText={(text)=>this.setState({searchText:text})} placeholder ='search' style={Styles.searchText} value = {this.state.searchText}/>
                          <Image source={Images.search} style={Styles.searchImage}/>  
                      </View>    
                   </View>     
                   <View style={Styles.mapView}>
                      <MapView
                          style={{
                            width:width-40,
                            height:Metrics.screenHeight-450,
                            backgroundColor:'#ff0000',
                          }}
                          initialRegion={this.state.region}
                        >
                          <Text style={{backgroundColor:'transparent',marginTop:300,marginLeft:200,fontSize:20}}> WIP</Text>  

                        </MapView>
                   </View> 
                   <View style={Styles.bottomflexView}>
                      <TouchableOpacity onPress={this.goBack.bind(this)}>
                          <Text style={[Styles.commonText,{marginLeft:20,}]}>&lt;</Text>
                      </TouchableOpacity>    
                      <TouchableOpacity onPress = {this.goReady.bind(this)} style={Styles.readyButton}>
                          <Text style={{color:'white'}}> Ready&gt;</Text>
                      </TouchableOpacity>
                   </View> 
            </KeyboardAwareScrollView>       
            </ImageBackground>
        </SideMenu>    
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);