import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { useTheme } from '@src/theme/themeProvider';
import RemixIcon from 'react-native-remix-icon';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { FONTS } from '@src/assets/fonts';
import Colors from '@src/theme/colors';
import { MessagesHeader } from '@src/assets/icons/headers-icons';

interface PropTypes {
  onPressSearchAction?: () => void;
  onPressEditAction?: () => void;
  onPressBackAction?: () => void;
  onPressInviteBackAction?: () => void;
  onPressCrossAction?: () => void;
  onChangeText?: (val: string) => void;
  placeholder?: string;
  headerText: string;
  value?: string;
  isPeople: boolean;
  isMessages: boolean;
  isInvite: boolean;
}

const HeaderTop = (props: PropTypes) => {
  const [isSearchPeople, setIsSearchPeople] = useState(false);
  const [isSearchPrev, setIsSearchPrev] = useState(false);

  const [inputValue, setInputValue] = useState('');

  const { theme } = useTheme();
  return (
    <>
      {props?.isPeople || props?.isMessages ? (
        <View
          style={[
            styles.searchMainContainer,
            {
              backgroundColor: theme?.background,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              props?.onPressBackAction();
              setIsSearchPrev(false);
              setIsSearchPeople(false);
            }}
          >
            <RemixIcon
              name="arrow-left-line"
              size={MetricsSizes.ms20}
              color={theme?.darkGreyBottomTab}
            />
          </TouchableOpacity>
          <View style={[styles.searchSubContainer, { backgroundColor: theme?.searchWhite }]}>
            <TextInput
              style={styles.input}
              placeholder={
                !props.placeholder && props?.isMessages
                  ? 'Search previous messages'
                  : !props.placeholder && props?.isPeople
                  ? 'Search for people'
                  : props.placeholder
              }
              value={props.value}
              onChangeText={(val: string) => {
                props?.onChangeText(val);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                props.onPressCrossAction();
                inputValue ? setInputValue('') : null;
              }}
            >
              <RemixIcon
                name="close-line"
                size={MetricsSizes.ms20}
                color={theme?.darkGreyBottomTab}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : props.isInvite ? (
        <View
          style={[
            styles.inviteMainView,
            {
              backgroundColor: theme?.background,
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              props.onPressInviteBackAction();
            }}
          >
            <RemixIcon
              name="arrow-left-line"
              size={MetricsSizes.ms20}
              color={theme?.darkGreyBottomTab}
            />
          </TouchableOpacity>
          <MagicText
            style={[
              styles.headerText,
              {
                color: theme?.blackText,
                paddingLeft: MetricsSizes.hs10,
                paddingTop: MetricsSizes.vs2,
              },
            ]}
            type="SEMI_BOLD"
          >
            Invite
          </MagicText>
        </View>
      ) : (
        <View style={[styles.container, { backgroundColor: Colors.goldColor }]}>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            <MessagesHeader />
            <MagicText
              style={{
                color: Colors.whiteBg,
                fontSize: MetricsSizes.ms14,
                fontWeight: '600',
                fontFamily: FONTS.BAROSA.SEMI_BOLD,
                lineHeight: 20,
                alignSelf: 'center',
                paddingLeft: 10,
              }}
              type="REGULAR"
            >
              {props.headerText}
            </MagicText>
          </View>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={{ paddingLeft: MetricsSizes.hs16 }}
              onPress={() => {
                setIsSearchPrev(true);
                props.onPressSearchAction();
              }}
            >
              <RemixIcon name="search-line" size={MetricsSizes.ms20} color={theme?.background} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingLeft: MetricsSizes.hs16 }}
              onPress={() => {
                setIsSearchPeople(true);
                props.onPressEditAction();
              }}
            >
              <RemixIcon name="edit-box-line" size={MetricsSizes.ms20} color={theme?.background} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: MetricsSizes.vs6,
    paddingHorizontal: MetricsSizes.hs16,
    width: DEVICE_WIDTH,
    top: DEVICE_HEIGHT * 0,
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: MetricsSizes.ms14,
    fontWeight: '600',
  },
  searchMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.vs8,
    paddingHorizontal: MetricsSizes.hs16,
    width: DEVICE_WIDTH,
    top: DEVICE_HEIGHT * 0,
  },
  searchSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderRadius: MetricsSizes.ms8,
    width: DEVICE_WIDTH * 0.8,
    marginRight: MetricsSizes.hs16,
    marginLeft: MetricsSizes.hs16,
  },
  backButton: {
    marginRight: MetricsSizes.hs8,
  },
  input: {
    flex: 1,
    fontSize: MetricsSizes.ms14,
    paddingVertical: MetricsSizes.vs8,
    fontFamily: FONTS.BAROSA.REGULAR,
  },
  clearButton: {
    marginLeft: 8,
  },
  inviteMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: MetricsSizes.vs20,
    paddingHorizontal: MetricsSizes.hs16,
    width: DEVICE_WIDTH,
    top: DEVICE_HEIGHT * 0,
    borderBottomWidth: 0.5,
  },
});

export default HeaderTop;
