import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import BlueGradientColors from '../reusable/BackgroundGradient';
import {useState} from 'react/cjs/react.development';
import {Overlay, Icon} from 'react-native-elements';

const ParameterBox = (props) => {
  return (
    <View
      style={[
        stylesList.shadowStyle,
        {
          width: '45%',
          aspectRatio: 1,
          borderRadius: 5,
        },
      ]}
      backgroundColor={props.backgroundColor}>
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            height: '100%',
            aspectRatio: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            type={props.iconType}
            name={props.iconName}
            size={110}
            color={props.iconColor}
          />
          <Text style={{color: 'white', fontSize: 25}}>{props.text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const TankSummary = ({navigation}) => {
  const [tankName, setTankName] = useState('No Tank selected!');
  const [isTankSelected, setIsTankSelected] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [statusIcon, setStatusIcon] = useState('md-close-circle');
  const [statusIconColor, setStatusIconColor] = useState('grey');

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Icon
            style={{marginRight: 18}}
            type="ionicon"
            size={32}
            name="ios-person-circle-outline"
            color="blue"
          />
        </TouchableOpacity>
      ),
    });
  });

  function toggleOverlay() {
    setOverlayVisible(!overlayVisible);
  }

  function navigateTo(route) {
    if (isTankSelected) {
      navigation.navigate(route);
    } else {
      toggleOverlay();
    }
  }

  return (
    <LinearGradient
      style={{width: '100%', height: '100%'}}
      colors={BlueGradientColors}>
      <View>
        <Overlay isVisible={overlayVisible} onBackdropPress={toggleOverlay}>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
            }}>
            Please add or select a Tank using "Manage Tanks" option
          </Text>
        </Overlay>
        <View
          style={[
            {
              height: '8%',
              marginVertical: '3%',
              marginHorizontal: '4%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: 'white',
              borderRadius: 5,
            },
            stylesList.shadowStyle,
          ]}>
          <Text style={[stylesList.tankName, {}]}>{tankName}</Text>
          <Icon
            type="ionicon"
            name={statusIcon}
            size={45}
            color={statusIconColor}
          />
        </View>
        <View style={stylesList.parameterBoxView}>
          <ParameterBox
            text="Manage Tanks"
            backgroundColor="green"
            iconName="fishbowl-outline"
            iconColor="white"
            iconType="material-community"
            onPress={() => {
              navigation.navigate('Tank Management');
            }}
          />
          <ParameterBox
            text="Water params"
            backgroundColor="orange"
            iconName="water-outline"
            iconColor="white"
            iconType="ionicon"
            onPress={() => {
              navigateTo('Water params');
            }}
          />
        </View>
        <View style={stylesList.parameterBoxView}>
          <ParameterBox
            text="Plants"
            backgroundColor="darkmagenta"
            iconName="leaf-outline"
            iconColor="white"
            iconType="ionicon"
          />
          <ParameterBox
            text="Animals"
            backgroundColor="darkred"
            iconName="heart-outline"
            iconColor="white"
            iconType="ionicon"
          />
        </View>
        <View style={stylesList.parameterBoxView}>
          <ParameterBox
            text="Feeding"
            backgroundColor="black"
            iconName="cafe-outline"
            iconColor="white"
            iconType="ionicon"
          />
          <ParameterBox
            text="Equipment"
            backgroundColor="darkblue"
            iconName="bulb-outline"
            iconColor="white"
            iconType="ionicon"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const stylesList = StyleSheet.create({
  tankName: {
    alignSelf: 'center',
    fontSize: 28,
  },
  parameterBoxView: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: '2%',
  },
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.15,
    elevation: 4,
  },
});

export default TankSummary;
