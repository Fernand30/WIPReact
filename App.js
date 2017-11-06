/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
var { FBLogin, FBLoginManager } = require('react-native-facebook-login');
import twitter, {auth} from 'react-native-twitter';
import InstagramLogin from 'react-native-instagram-login'
const { RNTwitterSignIn } = NativeModules;
//import firebase from 'react-native-firebase';
const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: 'TTDfr3eeAzBTJ0Ca7LHf84Whw',
    TWITTER_CONSUMER_SECRET: 'V2AbHG4iDv3Y7lfZsCt0toqpYElOaUcz2pTbLsnZ7u2e6UodUz',
};
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component<{}> {

  constructor(props){
    super(props);
    GoogleSignin.configure({
  iosClientId: '375541008713-k4sj7j5f5d2qh2teuir5bj023oauo64p.apps.googleusercontent.com', 
    })
    .then(() => {
      
    });
  }

  googleSignin(){
      GoogleSignin.signIn()
      .then((user) => {
        alert("success")
      })
      .catch((err) => {
        alert(err)
      })
      .done();
  }

  _twitterSignIn(){
      RNTwitterSignIn.init(Constants.TWITTER_COMSUMER_KEY, Constants.TWITTER_CONSUMER_SECRET);

      RNTwitterSignIn.logIn()
        .then((loginData)=>{
          const { authToken, authTokenSecret, email, userName} = loginData;
          global.user = loginData;
          global.flag = 3;
          const tokens = {...this.state.tokens, authToken, authTokenSecret};
          Actions.registerprofile();
        }).catch((error)=>{
          console.log(error)
        });
  }

  goInstagram(token){
    fetch('https://api.instagram.com/v1/users/self/?access_token='+token+'')
      .then((response) => response.json())
      .then((responseJson) => {
        alert('onLoginSuccess')
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <TouchableOpacity onPress={this.googleSignin.bind(this)}>
              <Text> Google</Text>
        </TouchableOpacity>  
        <FBLogin /> 
        <TouchableOpacity onPress = {this._twitterSignIn.bind(this)}>
              <Text> Twitter</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.refs.ins.show()}>
              <Text> instagarm</Text>
        </TouchableOpacity>    
        
        <InstagramLogin
          ref='ins'
          clientId='f630e777d2e1494aa7094892dc90d90c'
          redirectUrl='https://www.google.com/'
          scopes={['public_content+follower_list']}
          onLoginSuccess={(token) => this.goInstagram(token)}
        />      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
