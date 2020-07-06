import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NavigationRoute } from 'react-navigation';

import ExportTemplate from '../../views/Export/ExportTemplate';
import { useStrategyContent } from '../../TracingStrategyContext';
import { Screens } from '../../navigation';
import * as BTNativeModule from '../nativeModule';

interface PublishConsentProps {
  route: NavigationRoute;
}

const PublishConsent = ({ route }: PublishConsentProps): JSX.Element => {
  const navigation = useNavigation();
  const [isConsenting, setIsConsenting] = useState(false);
  const { t } = useTranslation();

  const {
    InterpolatedStrategyCopy,
    StrategyCopy,
    StrategyAssets,
  } = useStrategyContent();

  const exportPublishNextRoute = Screens.ExportComplete;
  const onClose = () => navigation.navigate(Screens.Settings);

  const selectedAuthority = route.params?.selectedAuthority;
  const code = route.params?.code;

  const consent = async () => {
    setIsConsenting(true);
    const cb = (errorMessage: string, successMessage: string) => {
      if (successMessage != null) {
        navigation.navigate(exportPublishNextRoute, {
          selectedAuthority,
          code,
        });
      } else {
        Alert.alert(errorMessage);
      }
      setIsConsenting(false);
    };
    BTNativeModule.submitDiagnosisKeys(cb);
  };

  return (
    <ExportTemplate
      onClose={onClose}
      onNext={consent}
      nextButtonLabel={t('export.consent_button_title')}
      buttonSubtitle={StrategyCopy.exportPublishButtonSubtitle}
      headline={StrategyCopy.exportPublishTitle}
      body={InterpolatedStrategyCopy.exportPublishBody(selectedAuthority.name)}
      buttonLoading={isConsenting}
      icon={StrategyAssets.exportPublishIcon}
    />
  );
};

export default PublishConsent;
