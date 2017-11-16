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
  Switch,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SideMenu from 'react-native-side-menu';
import Menu from '../User/Menu';
import firebaseImage from 'firebase'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'react-native-fetch-blob'


import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'

global.fullAddress = 'Terrazas del avila, Caracas, Venezuela';
const config = {
  apiKey: "AIzaSyDG8AmendOwWKA_SW3ZA-69dsR-zr_WjHc",
  authDomain: "where-is-people",
  storageBucket: "where-is-people.appspot.com",
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
        birthday: '',
        gender: 'Male',
        phone: '',
        email: '',
        passwd: '',
        confirmPW: '',
        setPublic: true,
        isOpen: false,
        selectedItem: '',
        token: '',
      });
    }else if(global.flag == 2){
      this.state = ({ 
        setPublic: true,
        isOpen: false,
        selectedItem: '',
        passwd: '',
        confirmPW: '',
        token: '',
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
        token: '',
      });
    }else if(global.flag == 4){
      this.state = ({
        photoURL: global.user.photoUrl320,
        givenName: global.user.givenName+' '+global.user.familyName,
        familyName: global.user.familyName,
        birthday: '',
        gender: 'Male',
        phone: '',
        email: global.user.email,
        passwd: '',
        confirmPW: '',
        setPublic: true,
        isOpen: false,
        selectedItem: '',
        token: global.fireToken,
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
        token: '',
      });
    }
    
  }

  componentDidMount() {
    this.setState({location: 'Terrazas del avila, Caracas, Venezuela',});
    if(global.flag == 4){
      this.getData();
    }    
  }

   goReady(){
      
      if((this.state.passwd != this.state.confirmPW) || (this.state.email=='')){
        alert('password is not confirm. please try again');
        return;
      }   

      if((global.flag == 1)||(global.flag ==2 )||(global.flag == 3)||(global.flag == 5)){
                 firebase.auth().createUserWithEmailAndPassword(this.state.email, 'password').then((data)=>{
                      global.uid = data.uid;
                      const crd = firebase.auth.EmailAuthProvider.credential(
                          this.state.email,
                          'password'
                      );
                      global.fireToken = crd['token'];
                      this.state.token = global.fireToken;
                      this.callApi()
                }).catch(function(error){
                      firebase.auth().signInWithEmailAndPassword(this.state.email, 'password').then((data)=>{
                          global.uid = data.uid;
                          const crd = firebase.auth.EmailAuthProvider.credential(
                              this.state.email,
                              'password'
                          );
                          global.fireToken = crd['token'];
                          this.state.token = global.fireToken;
                          this.callApi()
                      }).catch(function(error){
                          alert(error)
                      });
                }); 
      }else{
        this.callApi()
      }         
   }

   callApi(){
    var id = ''
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
                 field_100: global.fireToken,
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
                      id = JSON.parse(response._bodyInit).sheet_item.id 
                      this.ref = firebase.firestore().collection(global.uid).doc('doc').set(
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
                            token: this.state.token,
                            id: id,
                          }
                      );  
                      global.Userusername = this.state.givenName;
                      global.Userphotourl = this.state.photoURL;
                      global.Userbirthday = this.state.birthday;
                      global.Useremail = this.state.email;
                      
                      Actions.events();  
                    }
               }).catch(function(err) {
                alert(err)
        }).done();        
   }

   getData(){
      this.ref = firebase.firestore().collection(global.uid)
       .doc('doc')
       .get()
       .then((documentSnapshot) => {
           const value = documentSnapshot.data();    
           if(value){
                this.setState({
                  photoURL: value['photoURL'],
                  givenName: value['givenName'],
                  familyName: value['familyName'],
                  birthday: value['birthday'],
                  gender: value['gender'],
                  phone: value['phone'],
                  email: value['email'],
                  passwd: '',
                  confirmPW: '',
                  setPublic: value['setPublic'],
                  isOpen: false,
                  selectedItem: '',
                  token: value['token'],
                })      
           }            
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
  changePublic(val){
    this.setState({
      setPublic: val,
    })
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
            
                   <View style={Styles.statusBar}/>
                   <KeyboardAwareScrollView>  
                   <View  style={Styles.menuView}>
                      <View style={{flex: 1}}/>
                      <View style={{borderBottomColor:'white',borderBottomWidth:1,paddingLeft:5,paddingRight:5,paddingBottom:5,}}>  
                          <Text style={Styles.registryText}>Register</Text>
                      </View>    
                      <View style={{flex:1}} />
                   </View> 

                   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20,}}>
                     
                          <Text style={Styles.commonText}> Profile Photo </Text>
                     
                      <View style={{flex:1,alignItems:'center'}}>
                          <TouchableOpacity onPress={this.upadtePicture.bind(this)}>
                              {(this.state.photoURL!='')?<Image source={{uri:this.state.photoURL}} style={Styles.photoView}/>
                                               :<Image source={Images.account} style={Styles.photoView}/> }
                          </TouchableOpacity>                 
                      </View>    
                      <View style={{flex:1}}/>
                   </View>   
                   <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:20,}}>
                      
                          <Text style={Styles.commonText}> Public Profile ? </Text>
                     
                      <View style={{flex:1,alignItems:'center'}}>
                          <Switch
                            value={this.state.setPublic}
                            onValueChange={(val) => this.changePublic(val)}
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
                   
                      <View style={Styles.eachView}>
                          <Text style={Styles.leftText}> Name</Text>
                          <TextInput onChangeText={(text) => this.givenNameChange(text)} style={Styles.textInputStyle} value = {this.state.givenName}/>
                      </View>  
                  
                
                  
                       <View style={Styles.eachView}>
                          <Text style={Styles.leftText}> Date of Birth</Text>
                          <DatePicker
                              style={{marginTop:0}}
                              date={this.state.birthday}
                              mode="date"
                              placeholder="select date"
                              format="YYYY-MM-DD"
                              minDate="1900-01-01"
                              maxDate="2200-01-01"
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
                  
                       <View style={Styles.eachView}>
                          <Text style={Styles.leftText}> Gender</Text>
                          <ModalDropdown options={['Male', 'Female']}
                            style={{marginTop:10,width:140,backgroundColor:'#64a17e',height:30,borderRadius:15}}
                            textStyle ={{backgroundColor:'transparent',color:'white',textAlign:'center',marginTop:10}}
                            dropdownStyle={{width:120,height:60,backgroundColor:'#64a17e',marginLeft:10,marginTop:5,borderWidth:0}}
                            dropdownTextStyle={{backgroundColor:'#64a17e',color:'white'}}
                            onSelect={(idx, value) => this.selectGender(idx, value)}
                            
                          >
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                              <Text style={{marginRight:10,marginTop:5,}}>{this.state.gender}</Text>
                              <Image source={Images.dropdown} style={{marginLeft:30,marginTop:10,width:20,height:10,marginRight:10}}/>
                            </View>  
                          </ModalDropdown>
                      </View>  
                   
                   
                      <View style={Styles.eachView}>
                          <Text style={Styles.leftText}> Phone</Text>
                          <TextInput  keyboardType="number-pad" onChangeText={(text)=>this.setState({phoneNumber: text})} style={Styles.textInputStyle} returnKeyType='done'/>
                      </View>  
                       <View style={Styles.eachView}>
                          <Text style={Styles.leftText}> Email</Text>
                          <TextInput onChangeText={(text)=>this.setState({email: text})} style={Styles.textInputStyle} value={this.state.email}/>
                      </View>  
                   
                   {(global.flag==5)?  <View>
                                            <View style={Styles.eachView}>
                                               <Text style={Styles.leftText}> Password</Text>
                                               <TextInput onChangeText={(text)=>this.setState({passwd: text})} style={Styles.textInputStyle} secureTextEntry={true}/>
                                           </View>  
                                            <View style={Styles.eachView}>
                                               <Text style={Styles.leftText}> Confirm Password</Text>
                                               <TextInput onChangeText={(text)=>this.setState({confirmPW: text})} style={Styles.textInputStyle}  secureTextEntry={true}/>
                                           </View>  
                                        </View>
                                      :null }  
                   <View style={{marginTop:20}}>
                     <Text style={[{marginLeft:10},Styles.leftText]}> Location</Text>
                     <TouchableOpacity onPress={this.goLocation.bind(this)}>
                        <Text style={{marginLeft:10,marginTop:10,backgroundColor:'transparent',color:'white'}}> {this.state.location} &gt;</Text>
                     </TouchableOpacity>  
                   </View>  
                   <View style={{alignItems:'center',marginTop:10}}>
                      <TouchableOpacity onPress = {this.goReady.bind(this)} style={Styles.readyButton}>
                          <Text style={{color:'white'}}> Ready</Text>
                      </TouchableOpacity>
                   </View>   
                   </KeyboardAwareScrollView>       
            </ImageBackground>
        </SideMenu>    
    );
  }
}

AppRegistry.registerComponent('Profile', () => Layout_Text);