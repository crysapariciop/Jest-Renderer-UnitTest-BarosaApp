import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ImageSourcePropType,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Avatar from '@src/core-component/molecules/user-avtar';
import { MagicText } from '@src/core-component/atoms';
import DocCard from '@src/core-component/molecules/chat-screen-molecules/personal-chat-screen-contract-cards/docCard';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { useTheme } from '@src/theme/themeProvider';
import { LinkContentCard } from '../../molecules/chat-screen-molecules/linkContentCard';
import RemixIcon from 'react-native-remix-icon';
import { BrandCard } from '../../molecules/chat-screen-molecules/personal-chat-screen-contract-cards/brandDetailsCard';
import { Img } from '@src/assets/images/image-constants/Images';
import DocuSignCard from '../../molecules/chat-screen-molecules/personal-chat-screen-contract-cards/docuSignCard';
import { useTranslation } from 'react-i18next';
import TrackCard from '../../molecules/chat-screen-molecules/personal-chat-screen-contract-cards/trackDetailsCard';
import PricePendingCard from '../../molecules/chat-screen-molecules/personal-chat-screen-contract-cards/pricePendingCard';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { UserState } from '@src/modules/auth-module/auth-store';
import { MESSAGE_STATUS_MAPPING } from '../../molecules/chat-screen-molecules/Constants';
import { getQueryParams } from '../../molecules/chat-screen-molecules/personal-chat-input/utils';
import { useIndiItemList } from '@src/core-hooks/get-Items';
import { SOCKET_EVENT } from '@src/core-hooks/socket';
import { socketNew } from '@src/core-navigation';
import { indiConversation } from '@src/modules/messaging-module/messaging-store/state';
import { useNetwork } from '@src/core-hooks/network';
import {
  SocketMessagesAtom,
  SocketMessagesData,
} from '@src/modules/messaging-module/messaging-store/atom';
import WebView from 'react-native-webview';
import { Left } from '@src/assets/icons';
import { IS_ANDROID } from '@src/core-utils/utils';
import { SharedStyles } from '@src/theme/sharedStyle';
import { PaymentReqCard } from '@src/core-component/molecules/chat-screen-molecules/personal-chat-screen-contract-cards/paymentReqCard';
import ProposalConfirmationCard from '@src/core-component/molecules/chat-screen-molecules/personal-chat-screen-contract-cards/proposalConfirmationCard';

interface PersonalChatProps {
  personalChatText: string | number | null;
  messageData: string;
  thumbStatus?: string;
  imageUrl?: ImageSourcePropType;
  linkBanner?: ImageSourcePropType;
  isLinkCard?: boolean;
  isSeen?: boolean;
  isDocCard?: boolean;
  isDocuSign?: boolean;
  isBrand?: boolean;
  isBrandWithPrice?: boolean;
  isTrack?: boolean;
  isPricePending?: boolean;
  isBrandWithBlockChain?: boolean;
  originalMessageObj: {};
  fromId: string;
  toId: string;
  chatTime?: string;
  isUser: string;
  senderAvtar?: ImageSourcePropType | null;
  recieverAvtar?: ImageSourcePropType | null;
}

export const PersonalChatCard = (props: PersonalChatProps) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { getIndividualItem } = useIndiItemList();
  const userConversation = useRecoilValue(indiConversation);
  const [chatData, setChatData] = useRecoilState<SocketMessagesAtom>(SocketMessagesData);
  const [isModal, setIsModal] = useState(false);
  const { post } = useNetwork();

  const message = props?.messageData;
  const { contents: userState } = useRecoilValueLoadable(UserState);
  const { userId: loggedInUserId, images }: any = userState.data;

  const { isAccepted, isUpdated, parsedContent } = useMemo(() => {
    let parsedContent;
    try {
      parsedContent = JSON.parse(message);
    } catch (err) {
      parsedContent = message;
    }
    const accepted = /accept/gi.test(parsedContent?.type);
    const isPricePending = /accept|reject/gi.test(parsedContent?.type);
    const mssgContent = parsedContent?.message ?? {};
    return {
      isAccepted: accepted ? true : false,
      isUpdated: isPricePending,
      parsedContent,
      mssgContent,
    };
  }, [message]);

  const [mssg, setMssg] = useState(parsedContent.content);
  const [mssgDataType, setMssgDataType] = useState(parsedContent.type);
  const [webViewModal, setWebViewModal] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');
  const [webEventTitle, setWebEventTitle] = useState('');

  const [previewData, setPreviewData] = useState({
    imgLink: '',
    heading: '',
    description: '',
  });

  useEffect(() => {
    if (webEventTitle === 'Review and sign document(s) | DocuSign') {
      setLoadingFn(true);
      setWebEventTitle('');
      setWebViewModal(false);
    }
  }, [webEventTitle]);

  const setLoadingFn = (isLoading: boolean) => {
    setChatData((prev: any) => {
      const found = prev?.pastConvo?.findIndex(
        (prev: any) => prev?._id === (props?.originalMessageObj as any)?._id
      );
      if (found === -1) {
        return { ...prev, pastConvo: prev?.pastConvo };
      }
      const clonePrev: any = { ...prev?.pastConvo };
      clonePrev[found].metaData.docusign.loading = isLoading;
      return { ...prev, pastConvo: Object.values(clonePrev) };
    });
  };

  const openDocuSignLink = useCallback(async () => {
    setLoadingFn(true);
    try {
      const link = await post('/get-sign-link', {
        envelopeId: (props?.originalMessageObj as any)?.metaData?.docusign?.envelopeId,
        messageId: (props?.originalMessageObj as any)?._id,
      });
      setWebViewModal(true);
      setWebViewUrl(link?.url);
    } catch (error) {
      console.error('Error:', error);
      setLoadingFn(false);
    }
  }, [props?.originalMessageObj as any, setChatData]);

  const handleRejectClick = useCallback(() => {
    const obj = {
      messageId: (props?.originalMessageObj as any)._id,
      roomname: userConversation?.data?._id ?? userConversation?._id,
      fromId: props?.fromId,
      toId: props?.toId,
      content: JSON.stringify({
        ...JSON.parse((props?.originalMessageObj as any)?.content),
        type: 'price-rejected',
      }),
      conversationId: userConversation?.data?._id ?? userConversation?._id,
    };
    socketNew.current?.emit(SOCKET_EVENT.UPDATE_MESSAGE_TYPE, obj);
  }, [
    props?.fromId,
    props?.originalMessageObj,
    props?.toId,
    userConversation?._id,
    userConversation?.data?._id,
  ]);

  const handleAcceptClick = useCallback(() => {
    const roommNamme = userConversation?.data?._id ?? userConversation?._id;
    const updateMessageObj = {
      messageId: (props?.originalMessageObj as any)._id,
      roomname: roommNamme,
      fromId: props?.fromId,
      toId: props?.toId,
      content: JSON.stringify({
        ...JSON.parse((props?.originalMessageObj as any)?.content),
        type: 'price-accepted',
      }),
      conversationId: roommNamme,
    };
    socketNew.current?.emit(SOCKET_EVENT.UPDATE_MESSAGE_TYPE, updateMessageObj);

    const obj = {
      fromId: props?.fromId,
      toId: props?.toId,
      conversationId: roommNamme,
      messageId: (props?.originalMessageObj as any)._id,
      roomname: roommNamme,
      step: 'docusign',
      stepHistory: {
        'agreed-price': JSON.parse((props?.originalMessageObj as any)?.content),
      },
    };
    socketNew.current?.emit(SOCKET_EVENT.UPDATE_TRANSACTION_MESSAGE, obj);
  }, [
    props?.fromId,
    props?.originalMessageObj,
    props?.toId,
    userConversation?._id,
    userConversation?.data?._id,
  ]);

  useEffect(() => {
    if (parsedContent?.type === 'link') {
      let productId = getQueryParams('id', parsedContent?.content);
      let productUserId = getQueryParams('userId', parsedContent?.content);
      if (productId) {
        getIndividualItem(productId, productUserId || '', setPreviewData);
      }
    }
  }, [getIndividualItem, parsedContent?.content, parsedContent?.type]);

  return (
    <View
      style={[
        styles.personalChatMainView,
        {
          alignSelf: props?.isUser === 'sender' ? 'flex-end' : 'flex-start',
        },
      ]}
    >
      {props?.isUser === 'reciever' ? (
        <Avatar
          RemixIconSize={MetricsSizes.ms24}
          defaultUserStyle={styles.defaultUser}
          imageURL={props?.recieverAvtar ?? null}
          style={styles.recieverAvtar}
        />
      ) : null}
      <TouchableOpacity
        style={[
          styles.personalChatChatView,
          {
            borderTopLeftRadius: props?.isUser === 'sender' ? MetricsSizes.ms15 : 0,
            borderBottomRightRadius: props?.isUser === 'sender' ? 0 : MetricsSizes.ms15,
            backgroundColor: theme?.chatCard,
          },
        ]}
      >
        {props?.isDocCard ? (
          <DocCard
            linkBanner={Img.pdfSample}
            linkHeader={'testing'}
            linkTitle={'testing'}
            linkText={'testing'}
          />
        ) : null}

        {/* ======> Used in future */}

        {/pending|rejected|accepted/gi.test(mssgDataType) ? (
          <ProposalConfirmationCard
            shippingNInsurance={'40'}
            barosaFee={'400'}
            onPressCounterAction={handleRejectClick}
            onPressAcceptAction={handleAcceptClick}
            isAccepted={isAccepted}
            isUpdated={isUpdated}
            price={mssg?.price}
            userName={`${(props?.originalMessageObj as any)?.creator?.firstName} ${
              (props?.originalMessageObj as any)?.creator?.lastName
            }`}
            onPressInfoAction={() => {
              setIsModal(true);
            }}
          />
        ) : null}

        {/* {
          (props?.originalMessageObj as any)?.
        } */}
        {/* ======> Used in future */}

        {/* {/pending|rejected|accepted/gi.test(mssgDataType) ? (
          <PricePendingCard
            onPressRejectAction={handleRejectClick}
            onPressAcceptAction={handleAcceptClick}
            isAccepted={isAccepted}
            isUpdated={isUpdated}
            isSender={props?.isUser === 'sender'}
            priceValue={mssg?.price}
            daysValue={mssg?.['return-policy']}
          />
        ) : null} */}
        {mssgDataType === 'docusign' ? (
          <DocuSignCard
            onPressSign={openDocuSignLink}
            originalMessageObj={props?.originalMessageObj}
            loggedInUserId={loggedInUserId}
            parsedContent={parsedContent}
            MESSAGE_STATUS_MAPPING={MESSAGE_STATUS_MAPPING}
          />
        ) : null}
        {mssgDataType === 'shipment' && <TrackCard isTracking trackId={'123456789012'} />}
        {props?.isBrandWithPrice ? (
          <BrandCard
            isDelivery
            isNormal
            productPrice="$22,100"
            brandBanner={Img.sampleWatch}
            brandHeader={'Rolex Submariner | 2003'}
            buttonTitle={'See detail'}
          />
        ) : null}

        {props.isBrandWithBlockChain ? (
          <BrandCard
            buttonTitle={t('personalChat.seeonBlock')}
            brandBanner={Img.sampleWatch}
            brandHeader={'Rolex Submariner | 2003'}
          />
        ) : null}

        {mssgDataType === 'link' && (
          <LinkContentCard
            noPreview={
              !previewData.imgLink && !previewData?.heading && !previewData?.description
                ? true
                : false
            }
            onPressLinkAction={() => {
              Linking.openURL(mssg);
            }}
            linkBanner={previewData?.imgLink ? { uri: previewData?.imgLink } : null}
            linkHeader={previewData?.heading}
            linkTitle={previewData?.description}
            linkText={`${mssg}`}
          />
        )}

        <MagicText style={styles.personalChatChatText} type="REGULAR">
          {props?.personalChatText}
        </MagicText>
        <View style={styles.spacer} />

        <View style={styles.seenTimeStampView}>
          {props.isSeen && props?.isUser === 'sender' ? (
            <RemixIcon
              name="ri-check-double-line"
              size={MetricsSizes.ms15}
              color={theme?.greenButton}
            />
          ) : null}

          <MagicText
            style={[
              styles.personalChatTimeStamp,
              {
                color: theme?.darkestGreyText,
              },
            ]}
            type="REGULAR"
          >
            {props?.chatTime}
          </MagicText>
        </View>
      </TouchableOpacity>
      {props?.isUser === 'sender' ? (
        <Avatar
          RemixIconSize={MetricsSizes.ms24}
          defaultUserStyle={styles.defaultUser}
          imageURL={props?.senderAvtar ?? null}
          style={styles.senderAvtar}
        />
      ) : null}

      <Modal visible={webViewModal && webViewUrl ? true : false}>
        <View style={[SharedStyles.direction, styles.headerView]}>
          <Pressable
            hitSlop={15}
            onPress={() => {
              setWebViewModal(false);
              setWebViewUrl('');
              setLoadingFn(false);
            }}
          >
            <Left height={MetricsSizes.vs20} width={MetricsSizes.hs20} />
          </Pressable>
          <Text numberOfLines={1} style={styles.webContainer}>
            {t('personalChat.docusignAgreement')}
          </Text>
        </View>
        <WebView
          source={{ uri: webViewUrl }}
          onShouldStartLoadWithRequest={(event) => {
            setWebEventTitle(event?.title);
            return true;
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  personalChatMainView: {
    flexDirection: 'row',
    marginTop: MetricsSizes.vs20,
    marginHorizontal: MetricsSizes.hs10,
  },
  personalChatChatView: {
    width: DEVICE_WIDTH * 0.825,
    borderBottomLeftRadius: MetricsSizes.ms15,
    borderTopRightRadius: MetricsSizes.ms15,
  },

  personalChatChatText: {
    margin: MetricsSizes.ms7,
    fontSize: MetricsSizes.ms12,
  },

  senderAvtar: {
    alignSelf: 'flex-end',
    height: MetricsSizes.ms24,
    width: MetricsSizes.ms24,
    marginLeft: MetricsSizes.hs5,
  },
  personalChatTimeStamp: {
    fontSize: MetricsSizes.ms10,
    marginLeft: MetricsSizes.hs5,
  },

  loaderView: {
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seenTimeStampView: {
    alignItems: 'center',
    marginBottom: MetricsSizes.vs2,
    marginRight: MetricsSizes.hs15,
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  defaultUser: {
    alignSelf: 'flex-start',
    height: MetricsSizes.ms24,
    width: MetricsSizes.ms24,
    borderRadius: MetricsSizes.ms25,
    paddingBottom: MetricsSizes.vs5,
  },
  spacer: { height: MetricsSizes.vs10 },
  recieverAvtar: {
    alignSelf: 'flex-start',
    height: MetricsSizes.ms24,
    width: MetricsSizes.ms24,
    marginRight: MetricsSizes.hs5,
  },
  webContainer: { paddingLeft: MetricsSizes.hs10, width: '95%', fontSize: MetricsSizes.ms18 },
  headerView: {
    marginTop: IS_ANDROID ? MetricsSizes.vs20 : MetricsSizes.vs10,
    marginBottom: MetricsSizes.vs20,
    paddingHorizontal: MetricsSizes.hs16,
  },
});
