import React, { useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, SafeAreaView, Linking } from 'react-native';
import { MagicText, MagicTextInput } from '../../../core-component/atoms';
import Colors from '../../../theme/colors';
import { MetricsSizes } from '../../../theme/metrics';
import { useTranslation } from 'react-i18next';
import Button from '../../../core-component/atoms/button';
import { EyeIcon, EyeOffIcon, Google, HorizontalDashedLine } from '../../../assets/icons';
import { AppLogo } from '@src/assets/icons/on-boarding-icons';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { UserState, useAuth } from '../auth-store';
import { navigate } from '@src/core-navigation/navigationServices';
import { useNetwork } from '@src/core-hooks/network';
import { AppScreen } from '@src/core-constant/navigation';

const SignInScreen = () => {
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

    if (password === '') {
      setPassError('Password is required');
      setIsPasswordValid(false);
      isValidatedPass = false;
    } else {
      setPassError('');
      setIsPasswordValid(true);
      isValidatedPass = true;
    }
    return isValidatedEmail && isValidatedPass;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    const payload = {
      email,
      password,
    };

    if (errorValidate()) {
      getSignedIn(payload);
    }
  }, [email, password]);

  const handleSmBtnclick = (loginType: string) => {
    getSocialLoginRedirUrl(loginType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppLogo style={styles.appLogo} />
      <View style={styles.parentContainer}>
        <Button
          type="OUTLINE"
          leftIcon={<Google />}
          onPress={() => navigate(AppScreen.WEB_VIEW_MODAL)}
          // onPress={() => handleSmBtnclick('google')}
          label={translate('continueWithGoogle')}
        />
        <View style={styles.horizonatlDashedLine}>
          <HorizontalDashedLine />
        </View>
        <MagicText type="SEMI_BOLD" style={[styles.commonDistanceFromTop, styles.formHeader]}>
          {translate('signIntoYourAccount')}
        </MagicText>
        <MagicText style={(styles.formSubHeader, styles.commonMarginBottom)}>
          {translate('letsGetYouStartedWithBarosa')}
        </MagicText>
        <View style={styles.commonMarginBottom}>
          <MagicTextInput
            containerStyle={styles.textInputContainer}
            placeholder={translate('email')}
            onChangeText={(e) => {
              setEmail(e);
            }}
            isValid={emailValid}
            errorMessage={emailError}
            keyboardType="email-address"
          />
        </View>

        <MagicTextInput
          containerStyle={styles.textInputContainer}
          placeholder={translate('password')}
          rightIcon={!secureEntry ? <EyeOffIcon /> : <EyeIcon />}
          onChangeText={(e) => {
            setPassword(e);
          }}
          isValid={passwordValid}
          errorMessage={passError}
          secureTextEntry={secureEntry}
          onRightIconPress={() => {
            setIsSecureEntry(!secureEntry);
          }}
          keyboardType="default"
        />
        <Button
          type="TEXT"
          label={translate('forgotPassword')}
          style={[styles.commonMarginBottom, styles.forgotPasswordConatiner]}
          labelStyle={styles.forgotPasswordLabel}
          onPress={() => {
            navigate(AppScreen.WEB_VIEW_MODAL, {
              title: 'Forgot password',
              url: 'https://www.google.co.in',
            });
          }}
        />
        <Button
          label={isLoaded ? translate('signIn') : translate('signingIn')}
          onPress={handleLogin}
        />
        <Button
          onPress={() => navigate(AppScreen.SIGN_UP_SCREEN)}
          type="SECONDARY"
          label={translate('dontHaveAnAccountSignUp')}
          style={styles.greyButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteBg,
  },
  parentContainer: {
    flex: 1,
    marginHorizontal: MetricsSizes.hs24,
    justifyContent: 'flex-end',
  },
  appLogo: {
    color: Colors.semiBoldBlack,
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
    color: Colors.black,
  },
  formSubHeader: {
    color: Colors.subHeadingGrey,
    marginTop: MetricsSizes.vs4,
  },
  greyButton: { marginTop: MetricsSizes.vs8, marginBottom: MetricsSizes.vs32 },
  commonMarginBottom: { marginBottom: MetricsSizes.vs24 },
  forgotPasswordConatiner: {
    alignItems: 'flex-end',
    marginTop: MetricsSizes.vs4,
  },
  forgotPasswordLabel: {
    color: Colors.green,
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
  },
  textInputContainer: {
    borderBottomWidth: MetricsSizes.ms1,
    borderBottomColor: Colors.textInputBorderGrey,
  },
});

export default SignInScreen;
