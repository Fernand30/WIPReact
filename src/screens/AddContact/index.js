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
import CheckBox from 'react-native-modest-checkbox'
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
     
   }

   onCheckChange(checked){
      //alert(checked.checked)
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
                          <Text style={Styles.registryText}>Add Contact</Text>
                      </View>    
                      <View style={{flex:1}} />
                   </View>  
                   <View style={{marginTop:20,marginBottom:20,}}>                   
                       <View style={{flex:1,paddingRight:20,paddingLeft:20,marginTop:20,}}>
                              <TextInput onChangeText={(text)=>this.setState({searchText:text})} placeholder ='search bar' style={Styles.searchText} value = {this.state.searchText}/>
                              <Image source={Images.search} style={Styles.searchImage}/>   
                       </View>  
                   </View>    
                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}>Friend of my friends</Text>
                      <Image source={Images.zoom} style={Styles.zoomImage}/> 
                   </View>   

                   <View style={{flexDirection:'row',paddingLeft:20,marginTop:10}}>
                      <CheckBox
                        label=''
                        onChange={(checked) => this.onCheckChange(checked)}
                      />
                      <TouchableOpacity style={Styles.touchButton}>
                          <Text style={Styles.commonText}> Daniella Castro</Text>
                          <Image source={Images.key} style={{width:20,height:20,resizeMode:'stretch'}}/>
                      </TouchableOpacity>    
                   </View>  
                   <View style={{flexDirection:'row',paddingLeft:20,marginTop:10}}>
                      <CheckBox
                        label=''
                        onChange={(checked) => this.onCheckChange(checked)}
                      />
                      <TouchableOpacity style={Styles.touchButton}>
                          <Text style={Styles.commonText}> Enrique Suarez</Text>                          
                      </TouchableOpacity>    
                   </View>  


                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}>Similia Events</Text>
                      <Image source={Images.zoom} style={Styles.zoomImage}/> 
                   </View>   

                   <View style={{flexDirection:'row',paddingLeft:20,marginTop:10}}>
                      <CheckBox
                        label=''
                        onChange={(checked) => this.onCheckChange(checked)}
                      />
                      <TouchableOpacity style={Styles.touchButton}>
                          <Text style={Styles.commonText}>Estefania Fernandez</Text>
                          
                      </TouchableOpacity>    
                   </View>  
                   <View style={{flexDirection:'row',paddingLeft:20,marginTop:10}}>
                      <CheckBox
                        label=''
                        onChange={(checked) => this.onCheckChange(checked)}
                      />
                      <TouchableOpacity style={Styles.touchButton}>
                          <Text style={Styles.commonText}> Enrique Suarez</Text>                          
                      </TouchableOpacity>    
                   </View> 


                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}>They added me</Text>
                      <Image source={Images.zoom} style={Styles.zoomImage}/> 
                   </View>   

                   <View style={{flexDirection:'row',paddingLeft:20,marginTop:10}}>
                      <CheckBox
                        label=''
                        onChange={(checked) => this.onCheckChange(checked)}
                      />
                      <TouchableOpacity style={Styles.touchButton}>
                          <Text style={Styles.commonText}> Enrique Suarez</Text>
                          
                      </TouchableOpacity>    
                   </View>  
              
                   
                   <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingRight:20,paddingLeft:20,marginTop:100}}>
                      <TouchableOpacity onPress={this.goBack.bind(this)} style={Styles.cancelButton}>
                          <Text style={Styles.commonText}>&lt; Cancel</Text>
                      </TouchableOpacity>    
                      <TouchableOpacity onPress = {this.goReady.bind(this)} style={Styles.readyButton}>
                          <Text style={{color:'white'}}> Ready &gt;</Text>
                      </TouchableOpacity>
                   </View> 
            </KeyboardAwareScrollView>       
            </ImageBackground>
        </SideMenu>    
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);