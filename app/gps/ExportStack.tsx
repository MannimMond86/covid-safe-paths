import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import ExportCodeInput from '../views/Export/ExportCodeInput';
import ExportComplete from '../views/Export/ExportComplete';
import ExportConfirmUpload from '../views/Export/ExportConfirmUpload';
import ExportIntro from '../views/Export/ExportIntro';
import ExportLocationConsent from '../views/Export/ExportLocationConsent';
import ExportPublishConsent from '../views/Export/ExportPublishConsent';
import ExportSelectHA from '../views/Export/ExportSelectHA';

import { PublishConsent } from '../bt/PositiveDiagnosis/PublishConsent';

import { isGPS } from '../COVIDSafePathsConfig';
import { Screens } from '../navigation';

const Stack = createStackNavigator();

const fade = ({ current }: any) => ({
  cardStyle: { opacity: current.progress },
});

const SCREEN_OPTIONS = {
  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  cardStyle: {
    backgroundColor: 'transparent', // prevent white flash on Android
  },
  headerShown: false,
};

const ExportStack = (): JSX.Element => (
  <Stack.Navigator
    mode='modal'
    screenOptions={{
      ...SCREEN_OPTIONS,
      cardStyleInterpolator: fade,
      gestureEnabled: false,
    }}
    initialRouteName={isGPS ? Screens.ExportSelectHA : Screens.ExportIntro}>
    <Stack.Screen name={Screens.ExportIntro} component={ExportIntro} />
    <Stack.Screen name={Screens.ExportSelectHA} component={ExportSelectHA} />
    <Stack.Screen name={Screens.ExportCodeInput} component={ExportCodeInput} />
    <Stack.Screen
      name={Screens.ExportLocationConsent}
      component={ExportLocationConsent}
    />
    <Stack.Screen name={Screens.PublishConsent} component={PublishConsent} />
    <Stack.Screen
      name={Screens.ExportPublishConsent}
      component={ExportPublishConsent}
    />
    <Stack.Screen
      name={Screens.ExportConfirmUpload}
      component={ExportConfirmUpload}
    />
    <Stack.Screen name={Screens.ExportDone} component={ExportCodeInput} />
    <Stack.Screen name={Screens.ExportComplete} component={ExportComplete} />
  </Stack.Navigator>
);

export default ExportStack;
