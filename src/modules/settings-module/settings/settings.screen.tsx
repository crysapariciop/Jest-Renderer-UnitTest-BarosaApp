import Button from '@src/core-component/atoms/button';
import { useLogOut } from '@src/modules/auth-module/auth-store';
import { useTheme } from '@src/theme/themeProvider';
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import metrics, { MetricsSizes } from '@src/theme/metrics';
import { FONTS } from '@src/assets/fonts';
import { SettingsHeader } from '@src/assets/icons/headers-icons';

const SettingsScreen: React.FC = () => {
  const { getLogedOut } = useLogOut();
  const { theme }: any = useTheme();

  const handleOnLogout = (e: any) => {
    getLogedOut();
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.pageHeader}>
        <SettingsHeader />
        <MagicText type="MEDIUM" style={styles.settingsText}>
          Settings
        </MagicText>
      </View>
      <MenuProvider>
        <View style={styles.view}>
          <Button label={'Logout'} onPress={handleOnLogout} style={styles.button} />
        </View>
      </MenuProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: MetricsSizes.vs200,
    borderRadius: MetricsSizes.ms10,
  },
  settingsText: {
    color: Colors.whiteBg,
    fontSize: MetricsSizes.ms14,
    fontFamily: FONTS.BAROSA.SEMI_BOLD,
    fontWeight: '600',
    lineHeight: MetricsSizes.vs20,
    paddingLeft: MetricsSizes.hs10,
  },
  pageHeader: {
    height: MetricsSizes.vs60,
    width: '100%',
    backgroundColor: Colors.goldColor,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs16,
  },
});

export default SettingsScreen;
