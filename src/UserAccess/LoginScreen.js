import * as React from 'react';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import BlueGradientColors from '../reusable/BackgroundGradient';
import HairlineSeparator from '../reusable/Separators';
import auth from '@react-native-firebase/auth';

const LoginScreen = (props) => {
  const [email, setEmail] = React.useState('');
  const [pwd, setPwd] = React.useState('');

  function loginUser() {
    if (email != '' && pwd != '') {
      console.log('Logging in...');
      auth()
        .signInWithEmailAndPassword(email, pwd)
        .then(() => {
          console.log('User logged in');
          props.navigation.replace('MainStack');
        })
        .catch((error) => {
          console.log('Failed to log in');
        });
    }
  }

  function registerUser() {
    props.navigation.navigate('Register');
  }

  return (
    <LinearGradient style={{flex: 1}} colors={BlueGradientColors}>
      <View style={stylesList.viewStyle}>
        <Text style={stylesList.titleStyle}>Welcome to iAquarium!</Text>
        <View style={stylesList.imageContainerStyle}>
          <Image
            style={stylesList.imageStyle}
            source={require('./img/logo.png')}
          />
        </View>
        <HairlineSeparator />
        <View style={stylesList.textInputContainerStyle}>
          <TextInput
            style={stylesList.textInputStyle}
            placeholderTextColor="white"
            onChangeText={(text) => setEmail(text)}
            autoCompleteType="off"
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter email..."
          />
          <TextInput
            style={stylesList.textInputStyle}
            placeholderTextColor="white"
            onChangeText={(text) => setPwd(text)}
            secureTextEntry={true}
            autoCompleteType="off"
            autoCapitalize="none"
            placeholder="Password..."
          />
        </View>
        <View style={stylesList.buttonContainerStyle}>
          <Button
            style={stylesList.buttonStyle}
            title="Login"
            titleStyle={{
              fontSize: 24,
            }}
            onPress={loginUser}
          />
          <Button
            style={stylesList.buttonStyle}
            title="Register"
            onPress={registerUser}
          />
        </View>
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
  imageContainerStyle: {
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    borderRadius: 9,
  },
  textInputContainerStyle: {
    width: '90%',
    marginTop: 12,
  },
  textInputStyle: {
    color: 'white',
    fontSize: 20,
    height: 50,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 4,
    marginVertical: 4,
    paddingLeft: 4,
  },
  buttonContainerStyle: {
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonStyle: {
    color: 'white',
  },
});

export default LoginScreen;
