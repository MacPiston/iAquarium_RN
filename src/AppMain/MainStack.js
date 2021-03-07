import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TankSummary from './TankSummary';
import TankLogs from './TankLogs';
import TankManagement from './SummaryScreens/TankManagement';
import Profile from './Profile';
import {Icon} from 'react-native-elements';

const SummaryStack = createStackNavigator();
function SummaryStackScreen() {
  return (
    <SummaryStack.Navigator initialRouteName="Tank Summary">
      <SummaryStack.Screen name="Tank Summary" component={TankSummary} />
      <SummaryStack.Screen name="Tank Management" component={TankManagement} />
      <SummaryStack.Screen name="Profile" component={Profile} />
    </SummaryStack.Navigator>
  );
}

const LogStack = createStackNavigator();
function LogStackScreen() {
  return (
    <LogStack.Navigator>
      <LogStack.Screen name="Logs" component={TankLogs} />
    </LogStack.Navigator>
  );
}

const MainStackTab = createBottomTabNavigator();
function MainStackNavigator() {
  return (
    <MainStackTab.Navigator
      initialRouteName="Summary"
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;
          if (route.name === 'Summary') iconName = 'bar-chart-outline';
          if (route.name === 'Logs') iconName = 'trending-up-outline';
          return (
            <Icon type="ionicon" name={iconName} color={color} size={size} />
          );
        },
      })}>
      <MainStackTab.Screen name="Summary" component={SummaryStackScreen} />
      <MainStackTab.Screen name="Logs" component={LogStackScreen} />
    </MainStackTab.Navigator>
  );
}

export default MainStackNavigator;
