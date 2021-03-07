/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Avatar,
  Input,
  Icon,
  Overlay,
  Button,
  Text,
} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  useState,
  useEffect,
  useLayoutEffect,
} from 'react/cjs/react.development';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadAvatar} from '../Firebase/Upload';
import {firebase, storage} from '@react-native-firebase/storage';

const Profile = ({navigation}) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [newEmail, setNewEmail] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [oldPwd, setOldPwd] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const defaultAvatarFile = 'default.png';

  const [saveBtnEnabled, setSaveBtnEnabled] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

  function onAuthStateChanged(user) {
    setUser(user);
    setUserAvatar(user.photoURL);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Edit profile',
      headerRight: () => (
        <TouchableOpacity
          disabled={!saveBtnEnabled}
          onPress={() => {
            setConfirmDialogVisible(true);
          }}>
          <Text
            style={{
              marginRight: 18,
              fontSize: 20,
              color: saveBtnEnabled ? 'green' : 'grey',
              alignItems: 'stretch',
            }}>
            Save
          </Text>
        </TouchableOpacity>
      ),
    });
  });

  const ConfirmationOverlay = () => {
    return (
      <Overlay
        overlayStyle={{width: '65%'}}
        isVisible={confirmDialogVisible}
        onBackdropPress={() => {
          setOldPwd('');
          setConfirmDialogVisible(false);
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 20}}>Confirm changes:</Text>
          {newEmail !== '' && <Text>- email address: {newEmail}</Text>}
          {newPwd !== '' && <Text>- password</Text>}
          {newUserAvatar !== defaultAvatarFile && <Text>- avatar</Text>}
          <Button
            style={{marginTop: '5%'}}
            title="Update"
            type="solid"
            onPress={updateDetails}
          />
        </View>
      </Overlay>
    );
  };

  function reauthenticate(currentPassword) {
    var cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );
    return user.reauthenticateWithCredential(cred);
  }

  function updateDetails() {
    console.log('Updating details');
    if (newUserAvatar !== null) {
      uploadAvatar(user.uid, newUserAvatar).then(() => {
        const url = storage()
          .ref(user.uid + '/avatar/avatar.jpg')
          .getDownloadURL();
        console.log('URL:');
        console.log(url);
        user.updateDetails({photoURL: url});
      });
    }
    if (newEmail !== '') {
      reauthenticate(oldPwd)
        .then(() => {
          user
            .updateEmail(newEmail)
            .then(() => {
              console.log('Email updated!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (newPwd !== '') {
      reauthenticate(oldPwd)
        .then(() => {
          user
            .updatePassword(newPwd)
            .then(() => {
              console.log('Password updated!');
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }
    navigation.goBack();
  }

  if (initializing) return null;

  if (!user) {
    navigation.replace('Login');
    return null;
  }

  return (
    <LinearGradient
      style={{width: '100%', height: '100%'}}
      colors={['white', 'blue']}>
      <ConfirmationOverlay />
      <View style={[stylesList.mainView, stylesList.shadowStyle]}>
        <View style={[{marginBottom: '6%', marginTop: '8%'}]}>
          <Avatar
            source={{
              uri: newUserAvatar
                ? newUserAvatar
                : userAvatar
                ? userAvatar
                : defaultAvatarFile,
            }}
            style={{width: 200, height: 200}}
            overlayContainerStyle={{backgroundColor: 'grey'}}
            rounded
            size={215}
            activeOpacity={0.7}>
            <Avatar.Accessory
              {...{size: 34}}
              onPress={() =>
                launchImageLibrary(
                  {mediaType: 'photo', noData: true},
                  (response) => {
                    if (response.didCancel) {
                      console.log('Cancelled by user');
                    } else if (response.error) {
                      console.log(response.error);
                    } else {
                      setNewUserAvatar(response.uri);
                      setSaveBtnEnabled(true);
                    }
                  },
                )
              }
            />
          </Avatar>
        </View>
        <Input
          containerStyle={stylesList.textInput}
          placeholder="E-mail address..."
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          rightIcon={
            <Icon type="ionicon" name="at-circle-outline" color="grey" />
          }
          defaultValue={user.email}
          onChangeText={(text) => {
            text !== user.email && text !== ''
              ? setSaveBtnEnabled(true)
              : setSaveBtnEnabled(false);
            setNewEmail(text);
          }}
        />
        <Input
          containerStyle={stylesList.textInput}
          placeholder="New password..."
          secureTextEntry={true}
          autoCorrect={false}
          rightIcon={<Icon type="ionicon" name="key-outline" color="grey" />}
          onChangeText={(text) => {
            setNewPwd(text);
          }}
        />
        {(newPwd !== '' || newEmail !== user.email) && (
          <Input
            containerStyle={stylesList.textInput}
            placeholder="Old password..."
            secureTextEntry={true}
            autoCorrect={false}
            rightIcon={<Icon type="ionicon" name="key-outline" color="grey" />}
            onChangeText={(text) => {
              text !== '' ? setSaveBtnEnabled(true) : setSaveBtnEnabled(false);
              setOldPwd(text);
            }}
          />
        )}

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: '6%',
          }}>
          <Button
            title="Logout"
            type="outline"
            buttonStyle={{
              borderColor: 'white',
              height: 40,
            }}
            titleStyle={{color: 'white'}}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const stylesList = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    flex: 1,
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
  textInput: {
    width: '85%',
    height: 60,
    marginVertical: '2%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default Profile;
