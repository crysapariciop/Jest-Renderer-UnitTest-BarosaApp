import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, TouchableOpacity, View } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import { MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import Colors from '@src/theme/colors';
import { useTranslation } from 'react-i18next';

interface LinkPropTypes {
  linkBanner: ImageSourcePropType | null;
  linkHeader: string;
  linkTitle?: string;
  linkText?: string;
  noPreview?: boolean;
  onPressLinkAction?: () => void;
}

export const LinkContentCard = (props: LinkPropTypes) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View
      style={[
        styles.linkDataCard,
        {
          backgroundColor: theme?.background,
        },
      ]}
    >
      <View style={styles.row}>
        {props?.noPreview ? null : (
          <View
            style={[
              styles.linkDataView,
              {
                backgroundColor: theme?.darkGreyChat,
              },
            ]}
          >
            <Image style={styles.linkBannerImg} source={props?.linkBanner} />
          </View>
        )}

        <View style={styles.linkTextView}>
          {props?.noPreview ? (
            <MagicText
              numberOfLines={2}
              style={[
                styles.noPreviewText,
                {
                  color: theme?.darkGreyChat,
                },
              ]}
              type="REGULAR"
            >
              {t('personalChat.noPreview')}
            </MagicText>
          ) : null}

          {props?.noPreview ? null : (
            <View>
              <MagicText numberOfLines={1} style={styles.linkHeaderText} type="SEMI_BOLD">
                {props?.linkHeader}
              </MagicText>
              <MagicText
                numberOfLines={2}
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
          )}

          <TouchableOpacity onPress={props?.onPressLinkAction}>
            <MagicText
              style={[
                styles.linkText,
                {
                  color: theme?.greenButton,
                },
              ]}
              type="REGULAR"
            >
              {props?.linkText}
            </MagicText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  linkDataCard: {
    width: '95%',
    alignSelf: 'center',
    margin: '2.5%',
    borderRadius: MetricsSizes.ms10,
    padding: '2.5%',
  },
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
  linkBannerImg: {
    height: '100%',
    width: '100%',
    borderRadius: MetricsSizes.ms15,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  noPreviewText: {
    fontSize: MetricsSizes.ms14,
    marginBottom: MetricsSizes.vs10,
    backgroundColor: Colors.chatCardBG,
    padding: MetricsSizes.ms10,
    borderRadius: MetricsSizes.ms10,
    marginLeft: -MetricsSizes.hs5,
    paddingTop: MetricsSizes.vs15,
  },
});
