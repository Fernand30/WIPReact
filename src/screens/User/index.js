import React,{Component,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import SideMenu from 'react-native-side-menu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Menu from './Menu';


import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'
var userJson = global.user;
export default class Profile extends Component {

  constructor(props){
  
    super(props);
    this.toggle = this.toggle.bind(this);

      this.state = ({
        isOpen: false,
        selectedItem: '',
      });
  }

  componentDidMount() {
       
    }

   goBack(){
      Actions.pop();
   } 

   goReady(){
      Actions.profilesearch();
   } 

   goProfile(){
      
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
                      <TouchableOpacity onPress={this.toggle} style={{flex:1,marginTop:20,}}>
                          <Image source = {Images.menu} style = {Styles.menuImage}/>
                      </TouchableOpacity> 
                      <View style={{flex:1}}>
                          {(global.Userphotourl!='')?<Image source={{uri:global.Userphotourl}} style={Styles.photoView}/>
                                               :<Image source={Images.account} style={Styles.photoView}/>    }
                      </View>   
                      <View style={{flex:1}}>
                          <Text style={[Styles.commonText,{marginTop:10,fontSize:24}]}> USER </Text>
                      </View>
                      <View style={{flex:1,justifyContent:'center'}}>    
                          <Image source={Images.key} style={Styles.keyImageView}/>                    
                      </View>    
                  </View>   
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Profile</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Cotacts</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Chats</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Wip Requests</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Add Events</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Help</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Sign Off</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{paddingLeft:20, marginTop:30, flexDirection:'row'}}>
                      <Image source ={Images.key} style={Styles.keyImageView} />
                      <TouchableOpacity onPress = {this.goProfile.bind(this)} style={Styles.commonButton}>
                          <Text style={Styles.commonText}> Policies and Conditions</Text>
                      </TouchableOpacity>                       
                  </View>
                  <View style={{height:20}} />
                   <View style={Styles.flexView}>
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