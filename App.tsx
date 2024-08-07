import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {
  HomeScreen,
  TransactionScreen,
} from './src/screens';
import { persistor, store } from './src/states/store';
import { SCREEN_KEY } from './src/utils';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name={SCREEN_KEY.Home} component={HomeScreen} />
            <Stack.Screen
              name={SCREEN_KEY.Transaction}
              component={TransactionScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
