import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import InstagramLogin from 'react-native-instagram-login'
import TwitterButton from './TwitterButton';
import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
import Styles from './styles.js'
import twitter, {auth} from 'react-native-twitter';

export default class Login extends Component {
  
  constructor(props){
        super(props);
        this.state = ({
                      displayName: '',
                      email: '',
                      authorized: false,
                       tokens: {
                          consumerKey: 'TTDfr3eeAzBTJ0Ca7LHf84Whw',
                          consumerSecret: 'V2AbHG4iDv3Y7lfZsCt0toqpYElOaUcz2pTbLsnZ7u2e6UodUz',
                          accessToken: '925936195141451778-DeWXCxrYgeLBvTTigvabBk1N2QIl2lc',
                          accessTokenSecret: 'cdgSFUGja7AnhGT0FkQgzjrtf0odt1R0j0xMQ0f72L5Tl',
                        },
                      twitter: null,
                      });
        GoogleSignin.configure({
          iosClientId: '375541008713-k4sj7j5f5d2qh2teuir5bj023oauo64p.apps.googleusercontent.com', // only for iOS
        })
        .then(() => {
          // you can now call currentUserAsync()
        });
        this.state=({
          user: '',
        })
      }

  componentDidMount(){
    
  }

  goLoginWithEmail(){
      global.flag  =5;
      Actions.registerprofile();
  }

  goInstagram(token){

    fetch('https://api.instagram.com/v1/users/self/?access_token='+token+'')
      .then((response) => response.json())
      .then((responseJson) => {
        global.user = responseJson.data;
        global.flag = 1;
        this.dataInsertToFirebase(responseJson.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  goGoogleLogOut(){
     GoogleSignin.signOut()
      .then(() => {
        console.log('out');
      })
      .catch((err) => {

      });
  }

  goFacebook(){ 
      FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
      if (!error) {
        alert('success');
        global.flag = 2;
      } else {
        console.log(error);
      }
    })
  }

  goTwitter(){
      global.flag = 3;
      auth(this.state.tokens, 'rnte://auth')
              .then(({accessToken, accessTokenSecret}) => {
                const tokens = {...this.state.tokens, accessToken, accessTokenSecret};
                alert(tokens)
              })
              .catch((err)=>{
                console.log(err)
              });
  }

  goGoogle(){

      GoogleSignin.signIn() 
          .then((user) => {
            global.user = user;
            global.flag = 4;
            this.dataInsertToFirebase(user)
            
          })
          .catch((err) => {
            alert(JSON.stringify(err));
          })
          .done();
  }

  dataInsertToFirebase(user){
        if(global.flag == 1){
           firebase.auth().createUserWithEmailAndPassword('seegalbird@mail.com', 'password').then(()=>{
                    Actions.registerprofile();
                }).catch(function(error) {
                    Actions.registerprofile();
                });
        }else if(global.flag == 2){

        }else if(global.flag == 3){
          
        }else if(global.flag == 4){
          firebase.auth().createUserWithEmailAndPassword(user.email, 'password').then(()=>{
                    Actions.registerprofile();
                }).catch(function(error) {
                    Actions.registerprofile();
                });
        }
    }
  handleTokens(tokens) {
    this.setState({
      authorized: true,
      tokens,
      twitter: twitter(tokens),
    });
  }
  render() {
    that = this;
    return (
            <ImageBackground source = {Images.bg} style = {Styles.backgroundImage}>
                   <View style={{height:30,}}/>
                   <View style={Styles.logoImageView}>
                      <Image source = {Images.logo} style = {Styles.logoImage}/>
                   </View>   
                   <Text style = {Styles.welcomText}>Welcome to{"\n"}where is the people?</Text>
                   <View style = {Styles.socialButtonView}>
                        <View style = {Styles.flexRow}>
                            <View>
                                <TouchableOpacity onPress={() => this.refs.ins.show()}>
                                      <Image source = {Images.instagramIcon} style={Styles.socialIcon}/>
                                  </TouchableOpacity>    
                                  
                                  <InstagramLogin
                                    ref='ins'
                                    clientId='f630e777d2e1494aa7094892dc90d90c'
                                    redirectUrl='https://www.google.com/'
                                    scopes={['public_content+follower_list']}
                                    onLoginSuccess={(token) => this.goInstagram(token)}
                                  />
                            </View> 
                            <View>
                                <TouchableOpacity onPress = {this.goFacebook.bind(this)}>
                                    <Image source = {Images.facebookIcon} style={Styles.socialIcon}/>
                                </TouchableOpacity>  
                                
                            </View>   
                        </View>
                        <View style = {[Styles.flexRow,{marginTop:30}]}>
                            <View>
                                 <TwitterButton/> 
                                
                            </View> 
                            <View>
                                <TouchableOpacity onPress = {this.goGoogle.bind(this)}>
                                    <Image source = {Images.googleIcon} style={Styles.socialIcon}/>
                                </TouchableOpacity>    
                                
                            </View>   
                        </View>   
                   </View>
                   <View style = {[Styles.commonView,{marginTop:30}]}>
                         <TouchableOpacity onPress = {this.goLoginWithEmail.bind(this)} style  = {Styles.loginButton}>
                              <Text style = {Styles.buttonText}>Register with email</Text>
                         </TouchableOpacity>     
                   </View> 
                   <Text style={Styles.linkText}>Privacy Policies and Conditions{"\n"}Recover Password</Text>     
            </ImageBackground>
    );
  }
}

AppRegistry.registerComponent('Login', () => Layout_Text);
