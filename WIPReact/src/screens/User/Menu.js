import React from 'react';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
} from 'react-native';

const window = Dimensions.get('window');
import {Colors, Fonts, Images, Metrics, Constants } from '../../theme';
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  Container: {
    flex: 1,
    backgroundColor: '#41d4b7',
    paddingTop:40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
  imageView:{width:20,height:20,resizeMode: 'stretch'},
  textView: {marginLeft:20,backgroundColor:'transparent',color:'white',fontSize:16},
  eachView: {flexDirection:'row', alignItems: 'center', paddingLeft: 20,marginTop:30},

});

export default function Menu({ onItemSelected }) {
  return (
    
      <View style={styles.Container}>
        
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Profile')}>Profile</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Contacts')}>Contacts</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Chats')}>Chats</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Requests')}>Wip Requests</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Events')}>Add Events</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Help')}>Help</Text>
          </View>
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Sign')}>Sign Off</Text>
          </View>  
          <View style={styles.eachView}>
              <Image source = {Images.key} style={styles.imageView}/>
              <Text style={styles.textView} onPress={() => onItemSelected('Policies')}>Policies and Conditions</Text>
          </View> 
          <View style={{marginTop:30,marginLeft:30,marginRight:30,borderTopWidth:1,borderTopColor:'white',flexDirection:'row',justifyContent:'space-between',paddingTop:20}}>
              
          </View>
      </View>  
    
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};
