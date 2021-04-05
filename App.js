// React Navigation
import 'react-native-gesture-handler'; // Oltava ensimmäisenä koodissa
import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet} from 'react-native';

// Omat komponentit
import Categories from "./src/components/Categories";
import Movies from "./src/components/Movies";
import Details from "./src/components/Details";
import Trailer from "./src/components/Trailer";

const Stack = createStackNavigator();

import { Appbar } from 'react-native-paper';

// Appbar:ia varten
function CustomNavigationBar({ navigation, previous }) {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="LEFFAT" subtitle={"Uusimmat ja suosituimmat elokuvat"} />
    </Appbar.Header>
  );
}


export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator 
      initialRouteName="Categories"
      screenOptions={{
        header: (props) => <CustomNavigationBar {...props} />,
      }}
      >
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Trailer" component={Trailer} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
