import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BeneficiaryScreen, HomeScreen, TransactionScreen } from '../screens';
import { SCREEN_KEY } from '../utils';

type ScreenParamList = {
  Home: undefined;
  Transaction: undefined;
  Beneficiary: undefined;
};

export type NavigationProps = NavigationProp<ScreenParamList>;

const Stack = createNativeStackNavigator<ScreenParamList>();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={SCREEN_KEY.Home} component={HomeScreen} />
        <Stack.Screen
          name={SCREEN_KEY.Transaction}
          component={TransactionScreen}
        />
        <Stack.Screen
          name={SCREEN_KEY.Beneficiary}
          component={BeneficiaryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
