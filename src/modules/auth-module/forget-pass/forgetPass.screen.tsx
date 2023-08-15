//import liraries
import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { MagicText, MagicTextInput } from '../../../core-component/atoms';
import { COLOR } from '../../../theme/colors';
import { MetricsSizes } from '../../../theme/metrics';
import { useTranslation } from 'react-i18next';
import Button from '../../../core-component/atoms/button';
import { EyeIcon, Google, HorizontalDashedLine } from '../../../assets/icons';
import { AppLogo } from '@src/assets/icons/on-boarding-icons';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { UserState, useAuth } from '../auth-store';
import { navigate } from '@src/core-navigation/navigationServices';
import Toast from 'react-native-toast-message';
import { useNetwork } from '@src/core-hooks/network';
import { RoutesUrl } from '@src/core-constant/routes';

// create a component
const ForgetPassword = () => {
  const { t: translate } = useTranslation();
  const { post } = useNetwork();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [emailValid, setIsEmailValid] = useState<boolean>(false);
  const [passwordValid, setIsPasswordValid] = useState<boolean>(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [secureEntry, setIsSecureEntry] = useState<boolean>(true);
  const { getSignedIn, getSocialLoginRedirUrl } = useAuth();
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { isLoaded } = userStateContents;

  const emailRegex = useMemo(() => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, []);
  const errorValidate = useCallback(() => {
    let isValidatedEmail = false;
    let isValidatedPass = false;
    if (email === '') {
      setEmailError('Email is required');
      setIsEmailValid(false);
      isValidatedEmail = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setIsEmailValid(false);
      isValidatedEmail = false;
    } else {
      setEmailError('');
      setIsEmailValid(true);
      isValidatedEmail = true;
    }
  }, [email]);

  // const navigateSignUp = useCallback(() => {
  //   navigate(RoutesUrl.AUTH_SIGNUP);
  // }, [navigate]);
  const handleSmBtnclick = (loginType: string) => {
    getSocialLoginRedirUrl(loginType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo style={styles.appLogo} />
      <View style={styles.parentContainer}>
        <MagicText type="SEMI_BOLD" style={[styles.commonDistanceFromTop, styles.formHeader]}>
          {translate('authFlow.forgotPass')}
        </MagicText>
        <MagicText style={(styles.formSubHeader, styles.commonMarginBottom)}>
          {translate('authFlow.enterEmailVerify')}
        </MagicText>
        <View style={styles.commonMarginBottom}>
          <MagicTextInput
            placeholder={translate('email')}
            onChangeText={(e) => {
              setEmail(e);
            }}
            isValid={emailValid}
            errorMessage={emailError}
          />
        </View>

        <Button
          label={isLoaded ? translate('authFlow.verify') : translate('signingIn')}
          style={styles.greyButton}
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  parentContainer: {
    flex: 1,
    marginHorizontal: MetricsSizes.hs24,
    justifyContent: 'flex-end',
  },
  appLogo: {
    color: COLOR.BLACK_SEMIBOLD,
    marginTop: MetricsSizes.vs24,
    marginHorizontal: MetricsSizes.hs24,
  },
  horizonatlDashedLine: {
    alignItems: 'center',
    marginTop: MetricsSizes.vs24,
  },
  commonDistanceFromTop: { marginTop: MetricsSizes.vs24 },

  commonVerticalDistance: { marginVertical: MetricsSizes.vs24 },
  formHeader: {
    fontSize: MetricsSizes.ms24,
    lineHeight: MetricsSizes.ms32,
    color: COLOR.BLACK_TEXT,
  },
  formSubHeader: {
    color: COLOR.SUB_HEADING_GREY,
    marginTop: MetricsSizes.vs4,
  },
  greyButton: { marginTop: MetricsSizes.vs8, marginBottom: MetricsSizes.vs32 },
  commonMarginBottom: { marginBottom: MetricsSizes.vs24 },
  forgotPasswordConatiner: {
    alignItems: 'flex-end',
    marginTop: MetricsSizes.vs4,
  },
  forgotPasswordLabel: {
    color: COLOR.GREEN,
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
  },
});

//make this component available to the app
export default ForgetPassword;
