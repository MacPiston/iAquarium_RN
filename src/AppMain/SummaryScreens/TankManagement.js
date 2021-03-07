import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {View, Text, StyleSheet, TextInput, Button, Image} from 'react-native';

function TankManagement({navigation}) {
  return (
    <LinearGradient style={stylesList.gradientStyle} colors={gradientColors}>
      <View></View>
    </LinearGradient>
  );
}

const stylesList = StyleSheet.create({
  gradientStyle: {
    width: '100%',
    height: '100%',
  },
});

const gradientColors = ['white', 'green'];

export default TankManagement;
