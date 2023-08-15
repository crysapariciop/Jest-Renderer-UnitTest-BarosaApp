import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, SafeAreaView } from 'react-native';
import { Dragon, EyeIcon, Google, Group } from '../assets/icons';

import { useTheme } from '../theme/themeProvider';
import { MagicText, MagicTextInput } from '../core-component/atoms';
import Button from '../core-component/atoms/button';
import Colors, { COLOR } from '../theme/colors';
const HomeScreen = () => {
  const { theme }: any = useTheme();
  const [password, setPassword] = useState<string>('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  // language
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.background }}>
      <View style={{ backgroundColor: theme?.background }}>
        <Text>{t('Investing made simple')}</Text>
        <Dragon height={50} width={50} fill="blue" />
        <Group height={50} width={50} />
        <EyeIcon />
        <MagicText type="REGULAR">normal</MagicText>
        <MagicText type="MEDIUM">medium</MagicText>
        <MagicText type="SEMI_BOLD">semibold</MagicText>
        <View style={{ flexDirection: 'row', backgroundColor: Colors.whiteBg }}>
          <MagicTextInput placeholder="First Name" />
          <MagicTextInput
            placeholder="Password"
            rightIcon={<EyeIcon />}
            secureTextEntry={isSecureEntry}
            onChangeText={(pwd) => {
              setPassword(pwd);
            }}
            onRightIconPress={
              password.length > 0 ? () => setIsSecureEntry(!isSecureEntry) : () => {}
            }
          />
        </View>
        <View style={{ backgroundColor: COLOR.WHITE, marginTop: 20 }}>
          <Button label="Continue with Google" type="PRIMARY" leftIcon={<Google />} />
          <Button label="Continue with Google" type="SECONDARY" leftIcon={<Google />} />
          <Button label="Continue with Google" type="OUTLINE" leftIcon={<Google />} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
