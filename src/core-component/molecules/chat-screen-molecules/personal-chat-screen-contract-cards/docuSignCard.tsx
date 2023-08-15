import React from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Img } from '@src/assets/images/image-constants/Images';
import { MagicText } from '@src/core-component/atoms';
import LightGreenButton from '@src/core-component/atoms/light-green-button/lightGreenButton';
import Colors, { COLOR } from '@src/theme/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import RemixIcon from 'react-native-remix-icon';
import ChatCard from '@src/core-component/organisms/chat-card/chat-card.screen';
import { useTranslation } from 'react-i18next';

interface DocuSignCardProps {
  onPressSign?: () => void;
  isTracking?: boolean;
  Signers?: [];
  originalMessageObj?: {};
  parsedContent: any;
  loggedInUserId: string;
  MESSAGE_STATUS_MAPPING: any;
}

const DocuSignCard = (props: DocuSignCardProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { backgroundColor: theme?.background }]}>
      <View style={styles.header}>
        <Image resizeMode="contain" source={Img.DocuSign} style={styles.logo} />
        {!['declined', 'completed'].includes(
          (props?.originalMessageObj as any)?.metaData?.docusign?.sign?.[props?.loggedInUserId]
        ) ? (
          <LightGreenButton onPress={props?.onPressSign} title={t('personalChat.reviewSign')} />
        ) : (
          <LightGreenButton
            disabled={true}
            buttonStyle={{ backgroundColor: Colors.greyopacity006 }}
            titleStyle={{ color: Colors.greyText }}
            isDot
            title={t('personalChat.completed')}
          />
        )}
      </View>
      <View style={styles.separator} />
      <View style={styles.content}>
        <RemixIcon name="ri-draft-line" size={MetricsSizes.ms20} color={Colors.mainThemeBg} />
        <MagicText style={styles.productTitle} type="MEDIUM">
          {`${props?.parsedContent?.content?.item || ''} Smart Contract`}
        </MagicText>
      </View>
      {props?.parsedContent?.content?.users ? (
        <>
          <MagicText style={styles.signersTitleText} type="REGULAR">
            {t('personalChat.signers')}
          </MagicText>

          <View>
            <FlatList
              data={props?.parsedContent?.content?.users}
              renderItem={({ item }: any) => {
                return (
                  <ChatCard
                    signStatus={
                      (props?.originalMessageObj as any)?.metaData?.docusign?.loading &&
                      item?.id === props?.loggedInUserId
                        ? t('personalChat.processing')
                        : props?.MESSAGE_STATUS_MAPPING[
                            (props?.originalMessageObj as any)?.metaData?.docusign?.sign?.[item?.id]
                          ] ||
                          (props?.originalMessageObj as any)?.metaData?.docusign?.sign?.[
                            item?.id
                          ] ||
                          t('personalChat.notSigned')
                    }
                    isSigned
                    greyTextStyle={{
                      maxWidth: DEVICE_WIDTH * 0.45,
                    }}
                    userNameStyleProp={{ maxWidth: DEVICE_WIDTH * 0.37 }}
                    CardStyle={styles.customCardView}
                    imageUrl={null}
                    onPressCard={() => {}}
                    userMessage={item?.name}
                    userName={item?.email}
                  />
                );
              }}
            />
          </View>
        </>
      ) : null}
      {/* ============> Imp will be used in future */}
      {/* {isUserNotSigned ? (
        <Button activeOpacity={0.5} type="PRIMARY" label={'Sign'} style={styles.signButton} />
      ) : null} */}
      {/* ============> Imp will be used in future */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    borderWidth: 0.4,
    borderRadius: MetricsSizes.ms10,
    borderColor: Colors.greyText,
    marginTop: MetricsSizes.vs10,
    marginBottom: -MetricsSizes.vs20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: MetricsSizes.vs10,
  },
  logo: {
    height: MetricsSizes.vs32,
    width: MetricsSizes.hs70,
  },
  separator: {
    height: 0.4,
    width: '100%',
    backgroundColor: Colors.greyText,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: MetricsSizes.vs10,
    paddingVertical: MetricsSizes.vs12,
  },
  label: {
    fontSize: MetricsSizes.ms14,
  },
  productTitle: {
    fontSize: MetricsSizes.ms14,
    fontWeight: '600',
    color: COLOR.OUTLINE_BUTTON_TEXT,
    marginLeft: MetricsSizes.hs8,
    paddingTop: MetricsSizes.vs2,
    width: '90%',
  },
  customCardView: {
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs8,
    width: '100%',
    justifyContent: 'space-between',
  },
  signersTitleText: {
    fontSize: MetricsSizes.ms12,
    fontWeight: '600',
    color: Colors.greyText,
    marginLeft: MetricsSizes.hs8,
  },
  signButton: {
    width: DEVICE_WIDTH * 0.27,
    height: DEVICE_HEIGHT * 0.065,
    alignSelf: 'flex-start',
    margin: MetricsSizes.ms12,
  },
});

export default DocuSignCard;
