import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  NativeModules,
  TouchableOpacity,
  Image
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import twitter, {auth} from 'react-native-twitter';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts, Images} from '../../theme';
import Styles from './styles.js'


const { RNTwitterSignIn } = NativeModules;

const Constants = {
    //Dev Parse keys
    TWITTER_COMSUMER_KEY: 'TTDfr3eeAzBTJ0Ca7LHf84Whw',
    TWITTER_CONSUMER_SECRET: 'V2AbHG4iDv3Y7lfZsCt0toqpYElOaUcz2pTbLsnZ7u2e6UodUz',
};

export default class TwitterButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      tokens: {
                          consumerKey: 'TTDfr3eeAzBTJ0Ca7LHf84Whw',
                          consumerSecret: 'V2AbHG4iDv3Y7lfZsCt0toqpYElOaUcz2pTbLsnZ7u2e6UodUz',
                          accessToken: '925936195141451778-DeWXCxrYgeLBvTTigvabBk1N2QIl2lc',
                          accessTokenSecret: 'cdgSFUGja7AnhGT0FkQgzjrtf0odt1R0j0xMQ0f72L5Tl',
                        },
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  _twitterSignIn() {

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

  handleLogout() {
    RNTwitterSignIn.logOut();
    this.setState({
      isLoggedIn: false,
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>        
          <TouchableOpacity onPress = {this._twitterSignIn.bind(this)}>
              <Image source = {Images.twitterIcon} style={Styles.socialIcon}/>
          </TouchableOpacity>    
      </View>
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 50,
  }
});