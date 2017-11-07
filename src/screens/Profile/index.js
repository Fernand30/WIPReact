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
  Platform,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import { Switch } from 'react-native-switch';
import SideMenu from 'react-native-side-menu';
import Menu from '../User/Menu';
import Axios from 'react-native-axios';
import firebaseImage from 'firebase'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'


import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'

global.fullAddress = 'Terrazas del avila, Caracas, Venezuela';
const config = {
  apiKey: "AIzaSyB1iiLylcQdPCxsmFAX9yTzROJrMpBVwa4",
  authDomain: "wipreactnative",
  storageBucket: "wipreactnative.appspot.com",
}
firebaseImage.initializeApp(config)
const storage = firebaseImage.storage()
const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob
const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = storage.ref('images').child(`${sessionId}`)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}

export default class Profile extends Component {

  constructor(props){
    super(props);

    
    if(global.flag == 1){
      this.state = ({
        photoURL: global.user.profile_picture,
        givenName: global.user.full_name,
        familyName: '',
        birthday: global.user.birthday,
        gender: 'Male',
        phone: '',
        email: global.user.email,
        passwd: '',
        confirmPW: '',
        setPublic: true,
        isOpen: false,
        selectedItem: '',
      });
    }else if(global.flag == 2){
      this.state = ({ 
        setPublic: true,
        isOpen: false,
        selectedItem: '',
        passwd: '',
        confirmPW: '',
      });
    }else if(global.flag == 3){
      this.state = ({
        photoURL: '',
        givenName: global.user.userName,       
        email: global.user.email,        
        setPublic: true,
        isOpen: false,
        selectedItem: '',
        passwd: '',
        confirmPW: '',
      });
    }else if(global.flag == 4){
      this.state = ({
        photoURL: global.user.photo,
        givenName: global.user.givenName,
        familyName: global.user.familyName,
        birthday: global.user.birthday,
        gender: 'Male',
        phone: '',
        email: global.user.email,
        passwd: '',
        confirmPW: '',
        setPublic: true,
        isOpen: false,
        selectedItem: '',
      });
    }else if(global.flag == 5){
      this.state = ({
        photoURL: '',
        givenName: '',
        familyName: '',
        birthday: '',
        gender: '',
        phone: '',
        email: '',
        passwd: '',
        confirmPW: '',
        setPublic: true,
        isOpen: false,
        selectedItem: '',
      });
    }
    
  }

  componentDidMount() {
    this.setState({location: 'Terrazas del avila, Caracas, Venezuela',});
  }

   goReady(){
      if(this.state.passwd != this.state.confirmPW){
        alert('password is not confirm. please try again');
        return;
      }
      
      this.ref = firebase.firestore().collection(this.state.email).doc('doc').set(
                          {
                            photoURL: this.state.photoURL,
                            givenName: this.state.givenName,
                            familyName: this.state.familyName,
                            birthday: this.state.birthday,
                            gender: this.state.gender,
                            phoneNumber: this.state.phoneNumber,
                            email: this.state.email,
                            passwd: this.state.passwd,
                            setPublic: this.state.setPublic,
                          }
                      );  

     var jsonPostData = JSON.stringify({
                 field_55: this.state.setPublic,
                 field_56: this.state.givenName,
                 field_58: this.state.familyName,
                 field_60: this.state.gender,
                 field_62: this.state.birthday,
                 field_63: this.state.phoneNumber,
                 field_65: 'Venezuela',
                 field_66: 'identify',
                 field_68: this.state.email,
                 field_69: this.state.photoURL,
                 field_72: this.state.location,
                 field_76: this.state.passwd,
                 field_78: 'School',
                 field_80: 'song',
                 field_81: 'drink',
                 field_83: 'sport',
                 field_84: 'hobbies',
                 field_100: 'token',
          });

      fetch('https://api.caagcrm.com/api/sheets/8/items/', {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic YndwT1dURXRKQmxpQWJ2Z1VJSTI2RFJvZkR6NTNYOE9DWU5Ca0dLdVZDN3AyVGlrN0E6T3E0Vm02YUFoa08xMTBqVzZhYjh5TEZZQ1I1M0cxTk0wQ2RVOGFHTUhsQVl5UlpzbVg=',
        },
        body: jsonPostData,
      }).then((response) => {
                    if(response.status=="200"){
                      console.log('success')
                      //alert(JSON.stringify(response))
                    }
               }).catch(function(err) {
                 
        }).done();
      Actions.events();
   }

   getData(){
      this.ref = firebase.firestore().collection(global.user.email)
       .doc('doc')
       .get()
       .then((documentSnapshot) => {
           const value = documentSnapshot.data();           
            global.photoURL = value['photoURL'];
            //global.displayName = value['displayName'] ;
            global.email = value['email'] ;         
       });
   }

   goBack(){
      Actions.pop();
   } 

   selectGender(idx,value){
    this.setState({
      gender:value,
    })
   }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  upadtePicture(){
    this._pickImage();
  }

  changeDate(date){
      this.setState({
        birthday: date,
      })
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  _pickImage() {
    ImagePicker.launchImageLibrary({}, response  => {
      uploadImage(response.uri)
        .then(url => this.photoUpdate(url))
        .catch(error => console.error(error))
    })
  }

  photoUpdate(url){
      this.setState({photoURL: url});
  }

  goLocation(){
    Actions.location({that:this});
  }

  givenNameChange(text){
    this.setState({givenName: text})
  }
  lastNameChange(text){
    this.setState({familyName: text})
  }

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
                      <TouchableOpacity onPress={this.toggle.bind(this)} style={{flex:1,marginTop:20,}}>
                          <Image source = {Images.menu} style = {Styles.menuImage}/>
                      </TouchableOpacity> 
                      <View style={{flex:1,borderBottomColor:'white',borderBottomWidth:1,marginLeft:40,marginRight:40}}>  
                          <Text style={Styles.registryText}> Registery</Text>
                      </View>    
                      <View style={{flex:1}} />
                   </View>   
                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}> Profile Photo </Text>
                      <View style={{flex:1,alignItems:'center'}}>
                          <TouchableOpacity onPress={this.upadtePicture.bind(this)}>
                              {(this.state.photoURL!='')?<Image source={{uri:this.state.photoURL}} style={Styles.photoView}/>
                                               :<Image source={Images.account} style={Styles.photoView}/>    }
                          </TouchableOpacity>                 
                      </View>    
                      <View style={{flex:1}}/>
                   </View>   
                   <View style={Styles.flexView}>
                      <Text style={Styles.commonText}> Public Profile ? </Text>
                      <View style={{flex:1,alignItems:'center'}}>
                          <Switch
                            value={true}
                            onValueChange={(val) => this.setState({setPublic: val})}
                            disabled={false}
                            activeText={''}
                            inActiveText={''}
                            backgroundActive={'green'}
                            backgroundInactive={'gray'}
                            circleActiveColor={'#30a566'}
                            circleInActiveColor={'#000000'}
                          />
                      </View> 
                      <View style={{flex:1}}/>  
                   </View>   
                   <View style={Styles.flexView}>
                      <View style={{flex:1, paddingLeft:20}}>
                          <Text style={Styles.leftText}> Name</Text>
                          <TextInput onChangeText={(text) => this.givenNameChange(text)} style={Styles.textInputStyle} value = {this.state.givenName}/>
                      </View>  
                      <View style={{flex:1}}>
                          <Text style={Styles.leftText}> Last Name</Text>
                          <TextInput onChangeText={(text)=>this.lastNameChange(text)} style={Styles.textInputStyle}  value = {this.state.familyName}/>
                      </View>  
                   </View>  
                   <View style={Styles.flexView}>
                      <View style={{flex:1, marginTop:10,paddingLeft:20}}>
                          <Text style={Styles.leftText}> Date of Birth</Text>
                          <DatePicker
                              style={{marginTop:10}}
                              date={this.state.birthday}
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              minDate="2016-05-01"
                              maxDate="2016-06-01"
                              confirmBtnText="Confirm"
                              cancelBtnText="Cancel"
                              customStyles={{
                                dateIcon: {
                                  position: 'absolute',
                                  right: 0,
                                  top: 4,
                                  marginLeft: 0
                                },
                                dateInput: {
                                  position: 'absolute',
                                  left: 0,
                                  top: 4,
                                  marginLeft: 0,
                                  width:100,
                                  height:30,
                                  backgroundColor:'#64a17e',
                                  borderWidth:0,
                                  borderRadius:15,
                                }
                                // ... You can check the source to find the other keys.
                              }}
                              onDateChange={(date) => {
                                this.changeDate(date);
                              }}
                            />
                      </View>  
                      <View style={{flex:1}}>
                          <Text style={Styles.leftText}> Gender</Text>
                          <ModalDropdown options={['Male', 'Female']}
                            style={{marginTop:10,width:140,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                            textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                            dropdownStyle={{width:120,height:60,backgroundColor:'#64a17e',marginRight:10,marginTop:5,borderWidth:0}}
                            dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                            onSelect={(idx, value) => this.selectGender(idx, value)}
                            
                          >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                              <Text style={{marginRight:10,marginTop:5,}}>{this.state.gender}</Text>
                              <Image source={Images.dropdown} style={{marginLeft:30,marginTop:10,width:20,height:10,marginRight:10}}/>
                            </View>  
                          </ModalDropdown>
                      </View>  
                   </View>   
                   <View style={Styles.flexView}>
                      <View style={{flex:1, paddingLeft:20}}>
                          <Text style={Styles.leftText}> Phone:</Text>
                          <TextInput  keyboardType="number-pad" onChangeText={(text)=>this.setState({phoneNumber: text})} style={Styles.textInputStyle} returnKeyType='done'/>
                      </View>  
                      <View style={{flex:1}}>
                          <Text style={Styles.leftText}> Email</Text>
                          <TextInput onChangeText={(text)=>this.setState({email: text})} style={Styles.textInputStyle} value={this.state.email}/>
                      </View>  
                   </View>   
                   {(global.flag==5)?<View style={Styles.flexView}>
                                           <View style={{flex:1, paddingLeft:20}}>
                                               <Text style={Styles.leftText}> Password</Text>
                                               <TextInput onChangeText={(text)=>this.setState({passwd: text})} style={Styles.textInputStyle} secureTextEntry={true}/>
                                           </View>  
                                           <View style={{flex:1}}>
                                               <Text style={Styles.leftText}> Confirm Password</Text>
                                               <TextInput onChangeText={(text)=>this.setState({confirmPW: text})} style={Styles.textInputStyle}  secureTextEntry={true}/>
                                           </View>  
                                        </View>
                                      :null }  
                   <View style={{marginTop:20}}>
                     <Text style={[{marginLeft:20},Styles.leftText]}> Location</Text>
                     <TouchableOpacity onPress={this.goLocation.bind(this)}>
                        <Text style={[{marginLeft:20,marginTop:10},Styles.leftText]}> {this.state.location} &gt;</Text>
                     </TouchableOpacity>  
                   </View>  
                   <View style={Styles.flexView}>
                      <View />  
                      <TouchableOpacity onPress = {this.goReady.bind(this)} style={Styles.readyButton}>
                          <Text style={{color:'white'}}> Ready&gt;</Text>
                      </TouchableOpacity>
                   </View>       
            </ImageBackground>
        </SideMenu>    
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);