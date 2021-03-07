import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  return ( 
  <LinearGradient style={{flex: 1}} colors={gradientColors}>
      <View style={stylesList.viewStyle}>
        <Text style={stylesList.titleStyle}>Create account</Text>
      </View>
  </LinearGradient>
  );
};

const stylesList = StyleSheet.create({
  viewStyle: {
    marginTop: 50,
    marginHorizontal: 16,
    alignContent: 'center',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    elevation: 3,
  },
  titleStyle: {
    color: '#0085cc',
    fontSize: 36,
    marginTop: 10,
  },
});

const gradientColors = ['white', '#00a6ff'];

export default RegisterScreen;
