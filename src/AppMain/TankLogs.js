import * as React from 'react';
import { Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import BlueGradientColors from '../reusable/BackgroundGradient'

function TankLogs({ navigation }) {
    return (
        <LinearGradient style={{flex: 1}} colors={BlueGradientColors}>
            <Text>Tank Logs</Text>
        </LinearGradient>
    );
}

export default TankLogs;