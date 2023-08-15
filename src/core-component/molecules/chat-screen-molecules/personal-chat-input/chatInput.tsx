//import liraries
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import { MagicText } from '@src/core-component/atoms';
import Button from '@src/core-component/atoms/button';
import { useTheme } from '@src/theme/themeProvider';
import RemixIcon from 'react-native-remix-icon';
import { ChatInputProps } from './types';
import { FONTS } from '@src/assets/fonts';
import { DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import Colors, { COLOR } from '@src/theme/colors';
import { STEP_SUGGESTIONS } from '@src/modules/messaging-module/personal-chat-module/Constants';
import { ConversationItemTransactionState } from '@src/modules/messaging-module/messaging-store/state';
import { useRecoilValue } from 'recoil';
import SuggestionStepsModal from '@src/core-component/organisms/suggestion-steps-modal/suggestionStepsModal';
import { findUrlsInString } from './utils';
import { useTranslation } from 'react-i18next';
import { useIndiItemList } from '@src/core-hooks/get-Items';
import ConfirmProposalModal from '../personal-chat-screen-contract-cards/confirmProposalModal';

const ChatInput = (props: ChatInputProps) => {
  const { t } = useTranslation();
  const [image, setImage] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [chatText, setChatText] = useState<string>('');
  const [isConfirmation, setIsConfirmation] = useState<boolean>(false);

  const [messageObj, setMessageObj] = useState({ price: '', 'return-policy': '' });

  const UserPersonalChat = props?.userConversation;
  const participants = UserPersonalChat?.members;

  const { getIndividualItem } = useIndiItemList();

  const currentConversationTransaction: any = useRecoilValue(ConversationItemTransactionState);

  const initialSuggestionState = {
    step: '',
    isActive: false,
  };

  const [currentSuggestionStep, setCurrentSuggestionStep] = useState(initialSuggestionState);
  const [itemDetails, setItemDetails] = useState({
    imgLink: '',
    heading: '',
    description: '',
  });

  const { status: currentTransaction, itemIds } = useMemo(() => {
    return {
      status: currentConversationTransaction?.[UserPersonalChat?._id]?.status || '',
      itemIds: currentConversationTransaction?.[UserPersonalChat?._id]?.itemIds,
    };
  }, [currentConversationTransaction, UserPersonalChat?._id]);

  const productId = itemIds?.[0] ?? '';

  useEffect(() => {
    if (productId) {
      getIndividualItem(productId, '', setItemDetails);
    }
  }, []);

  const usersDocuSign = useMemo(() => {
    let userArr = participants?.map((ele: any) => {
      return {
        id: ele._id,
        email: ele?.email,
        name: `${ele?.firstName} ${ele?.lastName}`,
        status: 'Not Signed',
      };
    });
    return userArr;
  }, [participants]);

  const currentStep =
    STEP_SUGGESTIONS[currentTransaction as keyof typeof STEP_SUGGESTIONS] ??
    STEP_SUGGESTIONS['propose-terms'];

  const suggestedStepCb = useCallback(() => {
    setCurrentSuggestionStep({
      step: currentTransaction,
      isActive: !currentSuggestionStep.isActive,
    });
  }, [currentSuggestionStep.isActive, currentTransaction]);

  const StepsList = [
    {
      id: 1,
      status:
        currentStep?.stepTag === '1'
          ? 'active'
          : currentStep?.stepTag > '1'
          ? 'completed'
          : 'notActive',
    },
    {
      id: 2,
      status:
        currentStep?.stepTag === '2'
          ? 'active'
          : currentStep?.stepTag > '2'
          ? 'completed'
          : 'notActive',
    },
    {
      id: 3,
      status:
        currentStep?.stepTag === '3'
          ? 'active'
          : currentStep?.stepTag > '3'
          ? 'completed'
          : 'notActive',
    },
    {
      id: 4,
      status:
        currentStep?.stepTag === '4'
          ? 'active'
          : currentStep?.stepTag >= '4'
          ? 'completed'
          : 'notActive',
    },
  ];

  const updateMessageObj = (val: string, type: string) => {
    switch (type) {
      case 'value':
        setMessageObj((prev) => ({
          ...prev,
          price: val,
        }));
        break;
      case 'days':
        setMessageObj((prev) => ({
          ...prev,
          'return-policy': val,
        }));
        break;
      default:
        break;
    }
  };

  const SetDefaultState = () => {
    setCurrentSuggestionStep(initialSuggestionState);
  };

  const handleChatSendBtn = (mssg: any, mssgType?: string) => {
    let mssgObjString = '';
    if (!mssg && !image) {
      return;
    }
    if (mssgType === 'propose-terms') {
      let mssgObj = {
        content: mssg,
        type: 'price_pending',
      };
      mssgObjString = JSON.stringify(mssgObj);
      props?.sentBtnCb(mssgObjString);
      setImage('');
      setMessage('');
      return;
    }
    if (mssgType === 'docusign') {
      let mssgObj = {
        content: mssg,
        type: 'docusign',
      };

      mssgObjString = JSON.stringify(mssgObj);
      props?.sentBtnCb(mssgObjString, true);
      setImage('');
      setMessage('');
      return;
    }
    const urlsInMssg: string[] | null = findUrlsInString(mssg);
    if (urlsInMssg) {
      let mssgObj = {
        content: mssg,
        type: 'link',
      };
      mssgObjString = JSON.stringify(mssgObj);
    } else {
      let mssgObj = {
        content: mssg,
        type: 'text',
      };
      mssgObjString = JSON.stringify(mssgObj);
    }

    props?.sentBtnCb(mssgObjString);
    setImage('');
    setMessage('');
  };

  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.greayBGView,
        {
          backgroundColor: theme?.chatCard,
        },
      ]}
    >
      <View
        style={[
          styles.bottomInputView,
          {
            backgroundColor: theme?.background,
          },
        ]}
      >
        <TextInput
          value={chatText}
          onChangeText={(val) => {
            setChatText(val);
          }}
          multiline
          style={styles.input}
          placeholder={props?.placeholder || 'Type here...'}
        />

        <View style={styles.buttonRowView}>
          {/* ==========> Imp will be used in future */}
          {/* {props?.type === 'D' ? (
            <TouchableOpacity onPress={suggestedStepCb} style={styles.cardContainer}>
              <View style={styles.iconContainer}>
                <View style={styles.iconCircle}>
                  <MagicText style={styles.iconText} type="REGULAR">
                    {currentStep?.stepTag}
                  </MagicText>
                </View>
              </View>
              <MagicText style={styles.cardText} type="SEMI_BOLD">
                {currentStep?.stepText}
              </MagicText>
            </TouchableOpacity>
          ) : null} */}
          {/* ==========> Imp will be used in future */}
          {props?.type === 'D' ? (
            <View style={styles.stepsAlignment}>
              <View style={styles.row}>
                {StepsList.map((item) => (
                  <>
                    {item.status === 'active' ? (
                      <View style={[styles.iconContainer, { marginHorizontal: MetricsSizes.hs2 }]}>
                        <View style={styles.iconCircle}>
                          <MagicText
                            style={[
                              styles.iconText,
                              { fontSize: MetricsSizes.ms10, paddingTop: MetricsSizes.vs2 },
                            ]}
                            type="REGULAR"
                          >
                            {currentStep?.stepTag}
                          </MagicText>
                        </View>
                      </View>
                    ) : item.status === 'completed' ? (
                      <View style={styles.greenDot} />
                    ) : (
                      <View style={styles.greyDot} />
                    )}
                  </>
                ))}
              </View>
              <MagicText style={styles.buttonText} type="REGULAR">
                {currentStep?.stepText}
              </MagicText>
            </View>
          ) : null}

          {currentTransaction === 'propose-terms' || currentTransaction === 'docusign' ? (
            <TouchableOpacity
              onPress={() => {
                suggestedStepCb();
              }}
              style={styles.attachButton}
            >
              <RemixIcon
                name={currentTransaction === 'propose-terms' ? 'ri-attachment-2' : 'ri-draft-line'}
                color={Colors.greyText}
                size={MetricsSizes.ms20}
              />
              <MagicText style={styles.buttonText} type="REGULAR">
                {currentTransaction === 'propose-terms'
                  ? t('personalChat.attach')
                  : t('personalChat.contract')}
              </MagicText>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      <Button
        onPress={() => {
          setChatText('');
          handleChatSendBtn(chatText);
        }}
        type="PRIMARY"
        label={'Send'}
        style={styles.greenButton}
      />
      <ConfirmProposalModal
        userName={UserPersonalChat?.name}
        price={messageObj?.price}
        days={messageObj?.['return-policy']}
        onShare={() => {
          currentTransaction === 'docusign'
            ? handleChatSendBtn(
                { users: usersDocuSign, item: itemDetails.heading },
                currentTransaction
              )
            : handleChatSendBtn(messageObj, currentTransaction || 'propose-terms');
          SetDefaultState();
          setIsConfirmation(false);
        }}
        onRevice={() => {
          setIsConfirmation(false);
        }}
        showModal={isConfirmation}
      />
      <SuggestionStepsModal
        type={currentTransaction}
        participants={UserPersonalChat?.members}
        onChangeTextValue={(val) => {
          updateMessageObj(val, 'value');
        }}
        onChangeTextDays={(val) => {
          updateMessageObj(val, 'days');
        }}
        onPressCancel={() => {
          SetDefaultState();
        }}
        onPressSend={() => {
          if (
            currentTransaction === 'propose-terms' &&
            (messageObj.price === '' || messageObj?.['return-policy'] === '')
          ) {
            Alert.alert(t('personalChat.insertAlert'));
          } else if (currentTransaction === 'docusign') {
            handleChatSendBtn(
              { users: usersDocuSign, item: itemDetails.heading },
              currentTransaction
            );
            SetDefaultState();
            setIsConfirmation(false);
          } else {
            setIsConfirmation(true);
          }
        }}
        showModal={currentSuggestionStep.isActive}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: MetricsSizes.ms14,
    paddingLeft: MetricsSizes.hs15,
    fontFamily: FONTS.BAROSA.REGULAR,
  },
  bottomInputView: {
    margin: MetricsSizes.ms10,
    borderRadius: MetricsSizes.ms10,
    width: DEVICE_WIDTH * 0.95,
    minHeight: MetricsSizes.vs100,
  },
  greenButton: {
    width: DEVICE_WIDTH * 0.25,
    paddingVertical: MetricsSizes.vs13,
    margin: MetricsSizes.ms7,
    position: 'absolute',
    right: MetricsSizes.hs10,
    bottom: MetricsSizes.vs10,
  },
  greayBGView: {
    width: DEVICE_WIDTH,
  },
  loaderView: {
    alignSelf: 'center',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonRowView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: DEVICE_WIDTH * 0.27,
    margin: MetricsSizes.ms10,
  },
  attachButton: {
    alignItems: 'center',
    marginHorizontal: MetricsSizes.ms5,
    marginTop: MetricsSizes.vs5,
  },
  buttonText: {
    fontSize: MetricsSizes.ms9,
    color: Colors.greyText,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: MetricsSizes.ms10,
    backgroundColor: Colors.chatCardBG,
    borderRadius: MetricsSizes.ms30,
    paddingLeft: MetricsSizes.hs15,
  },
  iconContainer: {
    borderWidth: 1,
    height: MetricsSizes.ms20,
    width: MetricsSizes.ms20,
    borderColor: Colors.mainThemeBg,
    borderRadius: MetricsSizes.ms25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    borderRadius: MetricsSizes.ms25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: MetricsSizes.ms12,
    color: Colors.mainThemeBg,
  },
  cardText: {
    fontSize: MetricsSizes.ms12,
    color: COLOR.BLACK_TEXT,
    marginLeft: MetricsSizes.hs7,
    maxWidth: DEVICE_WIDTH * 0.5,
    marginTop: MetricsSizes.vs2,
  },
  greenDot: {
    height: MetricsSizes.ms8,
    width: MetricsSizes.ms8,
    backgroundColor: Colors.greenButton,
    borderRadius: MetricsSizes.ms25,
    marginVertical: MetricsSizes.hs4,
    marginHorizontal: MetricsSizes.hs2,
  },
  greyDot: {
    height: MetricsSizes.ms8,
    width: MetricsSizes.ms8,
    backgroundColor: Colors.lightGrey,
    borderRadius: MetricsSizes.ms25,
    marginVertical: MetricsSizes.hs4,
    marginHorizontal: MetricsSizes.hs2,
  },
  stepsAlignment: {
    alignItems: 'flex-end',
    marginTop: MetricsSizes.vs5,
    marginRight: MetricsSizes.hs10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatInput;
