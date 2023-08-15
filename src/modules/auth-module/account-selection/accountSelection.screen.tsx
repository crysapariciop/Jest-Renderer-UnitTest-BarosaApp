import React, { useCallback, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

// Importing assets, components, and styles
import { useTranslation } from 'react-i18next';
import { AppLogo } from '@src/assets/icons/on-boarding-icons';
import MagicText from '@src/core-component/atoms/MagicText';
import AccountSelector from '@src/core-component/molecules/onboarding-account-selector/accountSelector.screen';
import { styles } from './accountSelection.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '@src/core-component/atoms/button';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import { useNetwork } from '@src/core-hooks/network';
import { UserState, useAuth } from '../auth-store';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';

const AccountSelection = () => {
  const [userType, setUserType] = useState<string>('invidual_user');
  const { contents: userStateContents } = useRecoilValueLoadable(UserState);
  const { data: loginUser } = userStateContents;
  const { userId, token } = loginUser;

  const { updateUserType } = useAuth();

  const { theme }: any = useTheme();

  // Account type options
  const accountTypes = [
    {
      title: 'Individual User',
      subtitle: 'I’m a buyer and seller of products',
      userType: 'indivisual_user',
    },
    {
      title: 'Manufacturer',
      subtitle: 'I’m a manufacturer who makes products',
      userType: 'manufacturer',
    },
    {
      title: 'Dealer',
      subtitle: 'I’m a dealer with good reach to buyers',
      userType: 'dealer',
    },
  ];

  const { t } = useTranslation();

  const { post } = useNetwork();

  const handleProfileSetbtn = () => {
    if (token) {
      const payload = {
        userType,
      };
      updateUserType(payload, userId, true); // change name
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      {/* App logo */}
      <AppLogo style={styles.logo} />

      {/* Account selection section */}
      <View style={styles.selectionContainer}>
        {/* Title */}
        <MagicText type="SEMI_BOLD" style={styles.selectionTitle}>
          {t('authFlow.chooseAccType')}
        </MagicText>

        {/* Subtitle */}
        <MagicText
          type="REGULAR"
          style={[styles.selectionSubtitle, { color: theme?.subTitleText }]}
        >
          {t('authFlow.purusId')}
        </MagicText>

        {/* Account type options */}
        <AccountSelector
          data={accountTypes}
          onUserTypeSelect={(e) => {
            setUserType(e);
          }}
        />

        {/* Next button */}

        <Button
          label={t('Next')}
          onPress={() => {
            handleProfileSetbtn();
          }}
          style={{
            marginTop: MetricsSizes.vs15,
            width: DEVICE_WIDTH * 0.9,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default AccountSelection;
