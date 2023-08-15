import { View, StyleSheet } from 'react-native';

import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { DropDownIcon } from '@src/assets/icons';
import Colors, { COLOR } from '@src/theme/colors';
import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import RemixIcon from 'react-native-remix-icon';
import { useTranslation } from 'react-i18next';

type PopUpMenuTypes = {
  onPress?: () => void;
};

const PopUpMenu = ({ onPress = () => {} }: PopUpMenuTypes) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <MenuTrigger
        style={styles.button}
        children={
          <View style={styles.popUpHeaderContainer}>
            <MagicText style={styles.popUpHeaderText}>{t('profileStack.myStuff')}</MagicText>
            <DropDownIcon />
          </View>
        }
      />
      <MenuOptions customStyles={optionsStyles}>
        <MenuOption
          onSelect={() => {}}
          children={
            <View style={styles.popUpChildrenRow}>
              <RemixIcon name={'ri-inbox-line'} size={MetricsSizes.ms20} color={COLOR.BLACK_TEXT} />
              <MagicText style={styles.popUpChildrenText}>{t('profileStack.myStuff')}</MagicText>
            </View>
          }
        />
        <MenuOption
          onSelect={onPress}
          children={
            <View style={styles.popUpChildrenRow}>
              <RemixIcon name={'ri-team-line'} size={MetricsSizes.ms20} color={COLOR.BLACK_TEXT} />
              <MagicText style={styles.popUpChildrenText}>{t('profileStack.myFriends')}</MagicText>
            </View>
          }
        />
      </MenuOptions>
    </Menu>
  );
};
const optionsStyles = {
  optionsContainer: {
    width: MetricsSizes.vs140,
    padding: MetricsSizes.ms5,
    marginTop: MetricsSizes.vs34,
    marginLeft: MetricsSizes.hs_18,
  },
  optionText: {
    color: Colors.blackText,
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.whiteBg,
  },
  popUpHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: MetricsSizes.ms1,
    borderRadius: MetricsSizes.ms4,
    borderColor: Colors.dropDownBorder,
    backgroundColor: Colors.whiteBg,
    padding: MetricsSizes.ms8,
  },
  popUpChildrenRow: {
    flexDirection: 'row',
    marginTop: MetricsSizes.vs4,
    marginLeft: MetricsSizes.hs4,
    alignItems: 'center',
  },
  popUpChildrenText: { marginLeft: MetricsSizes.hs4 },
  popUpHeaderText: { marginRight: MetricsSizes.ms8 },
});

export default PopUpMenu;
