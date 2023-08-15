import React from 'react';
import { View, TouchableOpacity, TextStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { MailBox } from '@src/assets/icons/on-boarding-icons';
import MagicText from '@src/core-component/atoms/MagicText';
import { styles } from './emailVerification.styles';
import Button from '@src/core-component/atoms/button';
import { useTheme } from '@src/theme/themeProvider';
import { navigate } from '@src/core-navigation/navigationServices';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { UserState } from '../auth-store';
import { useVerifyEmail } from './store';
import { AppScreen } from '@src/core-constant/navigation';

interface DoubleTextProps {
  lightText: string;
  boldText: string;
  lightStyle?: TextStyle;
  boldStyle?: TextStyle;
  touchable?: boolean;
  onPress?: () => void;
}

const DoubleText: React.FC<DoubleTextProps> = ({
  lightText,
  boldText,
  lightStyle,
  boldStyle,
  touchable,
  onPress = () => {},
}) => {
  const { theme }: any = useTheme();

  return (
    <View style={styles.doubleTextView}>
      <MagicText
        style={[styles.text, lightStyle, { color: theme?.highlighDarkGrey }]}
        type="REGULAR"
      >
        {lightText}
      </MagicText>
      <TouchableOpacity
        disabled={!touchable}
        onPress={() => {
          onPress();
        }}
      >
        <MagicText style={[styles.text, boldStyle]} type="SEMI_BOLD">
          {' '}
          {boldText}
        </MagicText>
      </TouchableOpacity>
    </View>
  );
};

const EmailVerification: React.FC = () => {
  const { t: translate } = useTranslation();
  const { theme }: any = useTheme();
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const userData = userStateContents.data;
  const { resendVerifyEmail } = useVerifyEmail();

  const { userId, token, userType, firstName, lastName, bio, images } = userData;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.contentContainer}>
        <MagicText style={styles.headerText} type="SEMI_BOLD">
          {translate('authFlow.veifyYourEmail')}
        </MagicText>
        <MagicText style={[styles.subtitleText, { color: theme?.subTitleText }]} type="REGULAR">
          {translate('authFlow.youNeedToVerifyEmail')}
        </MagicText>
        <View style={styles.mailContainer}>
          <MailBox />
          <View style={styles.bottomSpace}>
            <DoubleText lightText={translate('authFlow.emailsent')} boldText={userData?.email} />
            <DoubleText
              touchable
              lightText={translate('authFlow.emailnotrecieved')}
              boldText={translate('resend')}
              boldStyle={{ color: theme?.greenButton }}
              onPress={() => {
                resendVerifyEmail({});
              }}
            />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <Button
            type="SECONDARY"
            label={translate('skipForNow')}
            onPress={() => navigate(AppScreen.BOTTOM_TAB_NAVIGATOR)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;
