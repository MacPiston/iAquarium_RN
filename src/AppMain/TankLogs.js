import * as React from 'react';
import { Text, View } from "react-native";
import LinearGradient from 'react-native-linear-gradient';

function TankLogs({ navigation }) {
    return (
        <LinearGradient style={{flex: 1}} colors={gradientColors}>
            <Text>Tank Logs</Text>
        </LinearGradient>
    );
}

const gradientColors = ['white', '#00a6ff'];

export default TankLogs;