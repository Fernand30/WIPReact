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
import GoogleSignIn from 'react-native-google-sign-in';
//var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
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
        alert(error);
        return;
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
    //   FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
    //   if (!error) {
    //     alert('success');
    //     global.flag = 2;
    //   } else {
    //     console.log(error);
    //   }
    // })
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

  async goGoogle(){
          await GoogleSignIn.configure({
            clientID: '894250356144-pvaqt4t8tt8jiu81ab9ahurh86qvbo8a.apps.googleusercontent.com',
            scopes: ['openid', 'email', 'profile'],
            shouldFetchBasicProfile: true,
          });
          const user = await GoogleSignIn.signInPromise();   
          setTimeout(() => {
            global.flag = 4;
            global.user = user;
            this.dataInsertToFirebase(user)
          }, 500);
  }

  dataInsertToFirebase(user){
    
        if(global.flag == 1){
           Actions.registerprofile();
        }else if(global.flag == 2){

        }else if(global.flag == 3){
          
        }else if(global.flag == 4){
                firebase.auth().createUserWithEmailAndPassword(user.email, 'password').then((data)=>{
                      global.uid = data.uid;
                      
                      const crd = firebase.auth.GoogleAuthProvider.credential(
                          user.idToken,
                          user.accessToken,
                      );
                    global.fireToken = crd.token;
                    Actions.registerprofile();
                }).catch(function(error) {
                      firebase.auth().signInWithEmailAndPassword(user.email, 'password').then((data)=>{
                          global.uid = data.uid;
                          
                          const crd = firebase.auth.GoogleAuthProvider.credential(
                              user.idToken,
                              user.accessToken,
                          );
                          global.fireToken = crd.token;
                          Actions.registerprofile();
                      }).catch(function(error){
                          alert(error)
                      });
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
                                    scopes={["basic","comments","follower_list","likes","public_content","relationships"]}
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
