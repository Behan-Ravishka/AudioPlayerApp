import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PlaylistScreen from '../screens/PlaylistScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" id={undefined as undefined}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Playlist" component={PlaylistScreen} />
    </Stack.Navigator>
  );
}
