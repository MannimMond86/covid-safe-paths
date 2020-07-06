import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { IconButton } from '../../components/IconButton';
import { Typography } from '../../components/Typography';

import { Screens } from '../../navigation';
import { Icons } from '../../assets';
import {
  Spacing,
  Colors,
  Outlines,
  Typography as TypographyStyles,
} from '../../styles';

const CODE_LENGTH = 8;

const CodeInputScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [code, setCode] = useState<string>('');
  const [isCheckingCode, setIsCheckingCode] = useState(false);
  const [codeInvalid, setCodeInvalid] = useState(false);

  const length = CODE_LENGTH;

  const handleOnChangeText = (code: string) => {
    if (code.length <= length) {
      setCode(code);
    }
  };

  const selectedAuthority = {
    name: 'HA',
  };

  const validateCode = async () => {
    setIsCheckingCode(true);
    setCodeInvalid(false);
    try {
      const valid = code === '12345678';

      if (valid) {
        navigation.navigate(Screens.AffectedUserPublishConsent, {
          selectedAuthority,
          code,
        });
      } else {
        setCodeInvalid(true);
      }
      setIsCheckingCode(false);
    } catch (e) {
      Alert.alert(t('common.something_went_wrong'), e.message);
      setIsCheckingCode(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1 }}
      testID={'affected-user-code-input-screen'}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View style={styles.headerIcons}>
          <IconButton
            icon={Icons.BackArrow}
            size={27}
            onPress={() => navigation.goBack()}
          />
          <IconButton
            icon={Icons.Close}
            size={22}
            onPress={() => navigation.navigate(Screens.Settings)}
          />
        </View>

        <View style={styles.headerContainer}>
          <Typography style={styles.header}>
            {t('export.code_input_title_bluetooth')}
          </Typography>

          <Typography use='body1'>
            {t('export.code_input_body_bluetooth', {
              name: selectedAuthority.name,
            })}
          </Typography>

          {/* there's a flex end bug on android, this is a hack to ensure some spacing */}
          <View
            style={{
              flexGrow: 1,
              marginVertical: Platform.OS === 'ios' ? 0 : 10,
            }}>
            <View style={styles.codeInputContainer}>
              <TextInput
                testID={'code-input'}
                value={code}
                style={styles.codeInput}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                onChangeText={handleOnChangeText}
                blurOnSubmit={false}
              />
            </View>

            {codeInvalid && (
              <Typography style={styles.errorSubtitle} use='body2'>
                {t('export.code_input_error')}
              </Typography>
            )}
          </View>

          <Button
            disabled={code.length < CODE_LENGTH}
            loading={isCheckingCode}
            label={t('common.next')}
            onPress={validateCode}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.medium,
    backgroundColor: Colors.primaryBackgroundFaintShade,
  },
  headerContainer: {
    flex: 1,
    marginBottom: Spacing.large,
  },
  header: {
    ...TypographyStyles.header2,
  },
  errorSubtitle: {
    marginTop: Spacing.medium,
    color: Colors.errorText,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  codeInputContainer: {
    flex: 1,
    paddingVertical: Spacing.large,
  },
  codeInput: {
    ...TypographyStyles.primaryTextInput,
    ...Outlines.textInput,
    padding: Spacing.small,
    textAlign: 'center',
  },
});

export default CodeInputScreen;