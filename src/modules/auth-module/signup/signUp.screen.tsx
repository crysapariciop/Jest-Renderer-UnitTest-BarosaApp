import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MagicText, MagicTextInput } from '../../../core-component/atoms';
import Colors from '../../../theme/colors';
import { MetricsSizes } from '../../../theme/metrics';
import { useTranslation } from 'react-i18next';
import Button from '../../../core-component/atoms/button';
import { EyeIcon, EyeOffIcon, Google, HorizontalDashedLine } from '../../../assets/icons';

import { useTheme } from '@theme/themeProvider';
import { navigate } from '@src/core-navigation/navigationServices';
import { AppLogo } from '@src/assets/icons/on-boarding-icons';
import { UserState, useAuth } from '../auth-store';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AppScreen } from '@src/core-constant/navigation';

const SignUpScreen = () => {
  const { theme }: any = useTheme();
  const { t: translate } = useTranslation();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstNameValid, setIsFirstNameValid] = useState<boolean>(true);
  const [lastNameValid, setIsLastNameValid] = useState<boolean>(true);
  const [emailValid, setIsEmailValid] = useState<boolean>(true);
  const [passwordValid, setIsPasswordValid] = useState<boolean>(true);
  const [fNameError, setfNameError] = useState('');
  const [lNameError, setlNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [secureEntry, setIsSecureEntry] = useState<boolean>(true);
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { isLoaded } = userStateContents;
  const { getSignedUp, getSocialLoginRedirUrl } = useAuth();

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const nameRegex = /\d/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const errorValidate = () => {
    let isValidated = false;
    let isValidatedEmail = false;
    let isValidatedPass = false;

    if (firstName === '') {
      setfNameError('FirstName is required');
      setIsFirstNameValid(false);
      isValidated = false;
    } else if (nameRegex.test(firstName)) {
      setfNameError('Invalid First Name');
      setIsFirstNameValid(false);
      isValidated = false;
    } else {
      setfNameError('');
      setIsFirstNameValid(true);
      isValidated = true;
    }

    if (lastName === '') {
      setlNameError('Last Name is required');
      setIsLastNameValid(false);
      isValidated = false;
    } else if (nameRegex.test(lastName)) {
      setlNameError('Invalid Last Name');
      setIsLastNameValid(false);
      isValidated = false;
    } else {
      setlNameError('');
      setIsLastNameValid(true);
      isValidated = true;
    }

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
    } else if (!passwordRegex.test(password)) {
      setPassError('Password must contain a minimum 8 characters, 1 letter and 1 number');
      setIsPasswordValid(false);
      isValidatedPass = false;
    } else {
      setPassError('');
      setIsPasswordValid(true);
      isValidatedPass = true;
    }

    return isValidatedEmail && isValidatedPass && isValidated;
  };

  const handleSignUpBtn = async () => {
    const payload = {
      email,
      firstName,
      lastName,
      password,
    };
    if (errorValidate()) {
      getSignedUp(payload);
    }
  };

  const handleSmBtnclick = (loginType: string) => {
    getSocialLoginRedirUrl(loginType);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <KeyboardAwareScrollView>
        <View style={styles.parentContainer}>
          <AppLogo style={styles.appLogo} />
          <Button
            type="OUTLINE"
            leftIcon={<Google />}
            label={translate('continueWithGoogle')}
            onPress={() => {
              handleSmBtnclick('google');
            }}
          />
          <View style={styles.horizonatlDashedLine}>
            <HorizontalDashedLine />
          </View>
          <MagicText type="SEMI_BOLD" style={[styles.commonDistanceFromTop, styles.formHeader]}>
            {translate('createAnAccount')}
          </MagicText>
          <MagicText style={styles.formSubHeader}>
            {translate('letsGetYouStartedWithBarosa')}
          </MagicText>

          <View style={[styles.row, styles.commonVerticalDistance]}>
            <View style={styles.rightRow}>
              <MagicTextInput
                containerStyle={styles.textInputContainer}
                placeholder={translate('firstName')}
                onChangeText={(val) => {
                  setFirstName(val);
                }}
                isValid={firstNameValid}
                errorMessage={fNameError}
              />
            </View>
            <View style={styles.leftRow}>
              <MagicTextInput
                containerStyle={styles.textInputContainer}
                placeholder={translate('lastName')}
                onChangeText={(val) => {
                  setLastName(val);
                }}
                isValid={lastNameValid}
                errorMessage={lNameError}
              />
            </View>
          </View>
          <MagicTextInput
            containerStyle={styles.textInputContainer}
            placeholder={translate('email')}
            onChangeText={(val) => {
              setEmail(val);
            }}
            isValid={emailValid}
            errorMessage={emailError}
          />
          <View style={styles.commonVerticalDistance}>
            <MagicTextInput
              containerStyle={styles.textInputContainer}
              placeholder={translate('password')}
              rightIcon={!secureEntry ? <EyeOffIcon /> : <EyeIcon />}
              onChangeText={(val) => {
                setPassword(val);
              }}
              isValid={passwordValid}
              errorMessage={passError}
              secureTextEntry={secureEntry}
              onRightIconPress={() => {
                setIsSecureEntry(!secureEntry);
              }}
              keyboardType="default"
            />
          </View>
          <Button
            onPress={() => {
              handleSignUpBtn();
            }}
            label={translate('createAnAccount')}
          />
          <Button
            onPress={() => navigate(AppScreen.SIGN_IN_SCREEN)}
            type="SECONDARY"
            label={translate('alreadyHaveAnAccountSignIn')}
            style={styles.greyButton}
          />

          <MagicText style={[styles.commonVerticalDistance, styles.footerText]}>
            {translate('byCreatingAnAccountYouAgreeToOur')}{' '}
            <MagicText
              style={[styles.footerText, styles.privacyPolicyText]}
              onPress={() => {
                navigate(AppScreen.WEB_VIEW_MODAL, {
                  title: 'Terms & Conditions',
                  url: 'https://www.google.co.in',
                });
              }}
            >
              {translate('termsConditions')}
            </MagicText>{' '}
            {translate('and')}{' '}
            <MagicText
              style={[styles.footerText, styles.privacyPolicyText]}
              onPress={() => {
                navigate(AppScreen.WEB_VIEW_MODAL, {
                  title: 'Privacy policy',
                  url: 'https://www.google.co.in',
                });
              }}
            >
              {translate('privacyPolicy')}
            </MagicText>
            .
          </MagicText>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  parentContainer: {
    flex: 1,
    marginHorizontal: MetricsSizes.hs24,
  },
  appLogo: {
    color: Colors.semiBoldBlack,
    marginTop: MetricsSizes.vs24,
    marginBottom: MetricsSizes.vs140,
  },
  horizonatlDashedLine: {
    alignItems: 'center',
    marginTop: MetricsSizes.vs24,
  },
  commonDistanceFromTop: { marginTop: MetricsSizes.vs24 },
  formHeader: {
    fontSize: MetricsSizes.ms24,
    lineHeight: MetricsSizes.ms32,
    color: Colors.blackText,
  },
  commonVerticalDistance: { marginVertical: MetricsSizes.vs24 },
  row: {
    flexDirection: 'row',
  },
  footerText: {
    textAlign: 'center',
    fontSize: MetricsSizes.ms9,
    lineHeight: MetricsSizes.ms12,
    color: Colors.placeHolderTextGrey,
  },
  privacyPolicyText: { color: Colors.greenButton },
  rightRow: { flex: 1, marginRight: MetricsSizes.hs8 },
  leftRow: { flex: 1, marginLeft: MetricsSizes.hs8 },
  formSubHeader: {
    color: Colors.subHeadingGrey,
    marginTop: MetricsSizes.vs4,
  },
  greyButton: { marginTop: MetricsSizes.vs8 },
  textInputContainer: {
    borderBottomWidth: MetricsSizes.ms1,
    borderBottomColor: Colors.textInputBorderGrey,
  },
});

export default SignUpScreen;
