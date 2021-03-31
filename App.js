// React Navigation
import 'react-native-gesture-handler'; // Oltava ensimmäisenä koodissa
import * as React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// React Native Paper
import { Provider as PaperProvider } from 'react-native-paper';

import { StyleSheet} from 'react-native';

// Omat komponentit
import Categories from "./src/components/Categories";
import Movies from "./src/components/Movies";
import Details from "./src/components/Details";

const Stack = createStackNavigator();


export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="Details" component={Details} />
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
