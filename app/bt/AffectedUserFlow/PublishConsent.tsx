import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { useAffectedUserContext } from './AffectedUserContext';
import ExportTemplate from '../../views/Export/ExportTemplate';
import { useStrategyContent } from '../../TracingStrategyContext';
import { Screens } from '../../navigation';
import * as BTNativeModule from '../nativeModule';

const PublishConsent = (): JSX.Element => {
  const navigation = useNavigation();
  const [isConsenting, setIsConsenting] = useState(false);
  const { t } = useTranslation();

  const { healthAuthority } = useAffectedUserContext();

  const { StrategyCopy, StrategyAssets } = useStrategyContent();

  const exportPublishNextRoute = Screens.ExportComplete;
  const onClose = () => navigation.navigate(Screens.Settings);

  const consent = async () => {
    setIsConsenting(true);
    const cb = (errorMessage: string, successMessage: string) => {
      if (successMessage != null) {
        navigation.navigate(exportPublishNextRoute);
      } else {
        Alert.alert(errorMessage);
      }
      setIsConsenting(false);
    };
    BTNativeModule.submitDiagnosisKeys(cb);
  };

  return (
    <ExportTemplate
      onNext={consent}
      onClose={onClose}
      icon={StrategyAssets.exportPublishIcon}
      headline={StrategyCopy.exportPublishTitle}
      body={t('export.publish_consent_body_bluetooth', {
        name: healthAuthority.name,
      })}
      nextButtonLabel={t('export.consent_button_title')}
      buttonSubtitle={StrategyCopy.exportPublishButtonSubtitle}
      buttonLoading={isConsenting}
    />
  );
};

export default PublishConsent;
