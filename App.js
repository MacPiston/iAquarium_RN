import * as React from 'react';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/UserAccess/LoginScreen';
import RegisterScreen from './src/UserAccess/RegisterScreen';
import MainStack from './src/AppMain/MainStack';
import auth from '@react-native-firebase/auth';

const InitialStack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  if (initializing) return null;

  return (
    <NavigationContainer>
      <InitialStack.Navigator initialRouteName={user ? 'MainStack' : 'Login'}>
        <InitialStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <InitialStack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <InitialStack.Screen
          name="MainStack"
          component={MainStack}
          options={{headerShown: false}}
        />
      </InitialStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
