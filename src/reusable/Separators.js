import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    Image,
  } from 'react-native';

const HairlineSeparator = () => {
return (
    <View style={separatorStyles.hairlineStyle}/>
);
;}

const separatorStyles = StyleSheet.create({
    hairlineStyle: {
        marginVertical: 8,
        alignSelf: 'stretch',
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
    }
})

export default HairlineSeparator;