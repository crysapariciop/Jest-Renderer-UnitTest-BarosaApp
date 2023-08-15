//import liraries
import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

// create a component
const DocCard = (props: any) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.linkDataCard,
        {
          backgroundColor: theme?.background,
        },
      ]}
    >
      <View style={styles.linkDataMainView}>
        <View style={styles.linkDataView}>
          <Image style={styles.linkBanner} source={props.linkBanner} />
        </View>
        <View style={styles.linkTextView}>
          <MagicText numberOfLines={1} style={styles.linkHeaderText} type="SEMI_BOLD">
            {props?.linkHeader}
          </MagicText>
          <MagicText
            numberOfLines={1}
            style={[
              styles.linkTitleText,
              {
                color: theme?.darkGreyChat,
              },
            ]}
            type="REGULAR"
          >
            {props?.linkTitle}
          </MagicText>
        </View>
        <View style={styles.downloadButton}>
          <TouchableOpacity>
            <RemixIcon
              size={MetricsSizes.ms30}
              color={theme?.darkGreyBottomTab}
              name="ri-download-line"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkDataCard: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    margin: '2.5%',
    borderRadius: MetricsSizes.ms10,
    padding: '2.5%',
  },
  linkDataMainView: { flexDirection: 'row', alignItems: 'center' },

  linkDataView: {
    height: MetricsSizes.ms50,
    width: MetricsSizes.ms50,
    borderRadius: MetricsSizes.ms10,
  },
  linkTextView: {
    marginLeft: MetricsSizes.hs8,
    width: '80%',
  },
  linkHeaderText: {
    fontSize: MetricsSizes.ms14,
    marginBottom: MetricsSizes.vs5,
  },
  linkTitleText: {
    fontSize: MetricsSizes.ms12,
    marginBottom: MetricsSizes.vs5,
  },
  linkText: {
    fontSize: MetricsSizes.ms12,
    marginBottom: MetricsSizes.vs5,
  },
  linkBanner: { height: '100%', width: '100%' },
  downloadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    right: '80%',
  },
});

export default DocCard;
