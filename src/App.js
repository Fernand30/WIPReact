import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Router, Route, Schema, Animations, Scene,TabBar} from 'react-native-router-flux'

import Login from './screens/Login';
import RegiserProfile from './screens/Profile';
import Location from './screens/Profile/location';
import Events from './screens/Events';
import User from './screens/User';
import ProfileSearch from './screens/ProfileSearch';
import AddContact from './screens/AddContact';


const Routes = () => (

  <Router hideNavBar={true}>
    <Scene key = "root">
      <Scene key = "login" component = {Login} hideNavBar={true} {...this.props} initial/>
      <Scene key = "registerprofile" component = {RegiserProfile} hideNavBar={true} panHandlers={null} />
      <Scene key = "events" component = {Events} hideNavBar={true} panHandlers={null} />
      <Scene key = "user" component = {User} hideNavBar={true} panHandlers={null} />
      <Scene key = "profilesearch" component = {ProfileSearch} hideNavBar={true} panHandlers={null} />
      <Scene key = "addcontact" component = {AddContact} hideNavBar={true} panHandlers={null}  />
      <Scene key = "location" component = {Location} hideNavBar={true} panHandlers={null}  />

    </Scene>
 </Router>


);

export default Routes



