//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MagicText, MagicTextInput } from '../../../core-component/atoms';
import { COLOR } from '../../../theme/colors';
import { MetricsSizes } from '../../../theme/metrics';
import { useTranslation } from 'react-i18next';
import Button from '../../../core-component/atoms/button';
import { EyeIcon, Google, HorizontalDashedLine } from '../../../assets/icons';
import { useTheme } from '@src/theme/themeProvider';
import { useRecoilValue } from 'recoil';

// create a component
const SignUpScreen = () => {
  const { theme }: any = useTheme();
  const { t } = useTranslation();

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
  //  const {isLoaded} = useRecoilValue(UserState);
  //  const {getSignedUp, getSocialLoginRedirUrl} = useAuth();
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const errorValidate = () => {
    let isValidated = false;
    let isValidatedEmail = false;
    let isValidatedPass = false;
    if (firstName === '') {
      setfNameError('FirstName is required');
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
    } else {
      setlNameError('');
      setIsLastNameValid(true);
      isValidated = true;
    }
    if (email === '') {
      setEmailError('Email is required');
      isValidatedEmail = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      isValidatedEmail = false;
    } else {
      setEmailError('');
      isValidatedEmail = true;
    }
    if (password === '') {
      setPassError('Password is required');
      isValidatedPass = false;
    } else if (password.length < 8) {
      setPassError('Password length should be greater than eight');
      isValidatedPass = false;
    } else {
      setPassError('');
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
      // getSignedUp(payload);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.parentContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <MagicText type="SEMI_BOLD" style={styles.headingText}>
          {t('barosa')}
        </MagicText>
        <Button type="OUTLINE" leftIcon={<Google />} label={t('continueWithGoogle')} />
        <View style={styles.horizonatlDashedLine}>
          <HorizontalDashedLine />
        </View>
        <MagicText type="SEMI_BOLD" style={[styles.commonDistanceFromTop, styles.formHeader]}>
          {t('createAnAccount')}
        </MagicText>
        <MagicText style={styles.formSubHeader}>{t('letsGetYouStartedWithBarosa')}</MagicText>

        <View style={[styles.row, styles.commonVerticalDistance]}>
          <View style={styles.rightRow}>
            <MagicTextInput
              placeholder={t('firstName')}
              onChangeText={(val) => {
                setFirstName(val);
              }}
              isValid={firstNameValid}
              errorMessage={fNameError}
            />
          </View>
          <View style={styles.leftRow}>
            <MagicTextInput
              placeholder={t('lastName')}
              onChangeText={(val) => {
                setLastName(val);
              }}
            />
          </View>
        </View>
        <MagicTextInput
          placeholder={t('email')}
          onChangeText={(val) => {
            setEmail(val);
          }}
        />
        <View style={styles.commonVerticalDistance}>
          <MagicTextInput
            placeholder={t('password')}
            rightIcon={<EyeIcon />}
            onChangeText={(val) => {
              setPassword(val);
            }}
          />
        </View>
        <Button label={t('createAnAccount')} />
        <Button
          type="SECONDARY"
          label={t('alreadyHaveAnAccountSignIn')}
          style={styles.greyButton}
        />

        <MagicText style={[styles.commonVerticalDistance, styles.footerText]}>
          {t('byCreatingAnAccountYouAgreeToOur')}{' '}
          <MagicText style={[styles.footerText, styles.privacyPolicyText]}>
            {t('termsConditions')}
          </MagicText>{' '}
          {t('and')}{' '}
          <MagicText style={[styles.footerText, styles.privacyPolicyText]}>
            {t('privacyPolicy')}
          </MagicText>
          .
        </MagicText>
      </ScrollView>
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
  },
  headingText: {
    color: COLOR.BLACK_SEMIBOLD,
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
    color: COLOR.BLACK_TEXT,
  },
  commonVerticalDistance: { marginVertical: MetricsSizes.vs24 },
  row: {
    flexDirection: 'row',
  },
  footerText: {
    textAlign: 'center',
    fontSize: MetricsSizes.ms9,
    lineHeight: MetricsSizes.ms12,
    color: COLOR.PLACEHOLDER_TEXT_GREY,
  },
  privacyPolicyText: { color: COLOR.PRIMARY_BUTTON_COLOR },
  rightRow: { flex: 1, marginRight: MetricsSizes.hs8 },
  leftRow: { flex: 1, marginLeft: MetricsSizes.hs8 },
  formSubHeader: {
    color: COLOR.SUB_HEADING_GREY,
    marginTop: MetricsSizes.vs4,
  },
  greyButton: { marginTop: MetricsSizes.vs8 },
});

//make this component available to the app
export default SignUpScreen;
