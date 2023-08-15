import React, { useMemo } from 'react';
import { Modal, View, StyleSheet, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import { MagicText, MagicTextInput } from '@src/core-component/atoms';
import Button from '@src/core-component/atoms/button';
import Colors from '@src/theme/colors';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { ModalTypes } from './type';
import ChatCard from '../chat-card/chat-card.screen';

export const SuggestionStepsModal = (props: ModalTypes) => {
  const { t } = useTranslation();

  const usersDocuSign = useMemo(() => {
    let userArr = props?.participants?.map((ele: any) => {
      return {
        id: ele._id,
        email: ele?.email,
        name: `${ele?.firstName} ${ele?.lastName}`,
        status: 'Not Signed',
      };
    });
    return userArr;
  }, [props?.participants]);

  return (
    <Modal animationType="slide" visible={props?.showModal}>
      <View style={styles.container}>
        <View style={styles.modalContent}>
          <View style={styles.contentContainer}>
            {props?.type === 'docusign' ? (
              <View style={{ flex: 1 }}>
                <MagicText style={styles.signersTitleText} type="REGULAR">
                  {t('personalChat.signers')}
                </MagicText>

                <FlatList
                  data={usersDocuSign}
                  renderItem={({ item }: any) => {
                    return (
                      <ChatCard
                        isSigned
                        greyTextStyle={{
                          maxWidth: DEVICE_WIDTH * 0.38,
                        }}
                        signStatus={item?.status}
                        CardStyle={styles.customCardView}
                        imageUrl={null}
                        onPressCard={() => {}}
                        userMessage={item?.email}
                        userName={item?.name}
                      />
                    );
                  }}
                />
              </View>
            ) : (
              <>
                <MagicText style={styles.labelText}>{t('personalChat.price')}</MagicText>
                <MagicTextInput
                  inputMode="numeric"
                  value={props?.value}
                  onChangeText={props?.onChangeTextValue}
                  mainViewStyle={styles.inputFieldContainer}
                  style={styles.inputField}
                  placeholder={t('personalChat.enterValue')}
                />

                <MagicText style={styles.labelText}>{t('personalChat.returnPeriod')}</MagicText>
                <MagicTextInput
                  inputMode="numeric"
                  value={props?.daysValue}
                  onChangeText={props?.onChangeTextDays}
                  mainViewStyle={styles.inputFieldContainer}
                  style={styles.inputField}
                  placeholder={t('personalChat.enterDays')}
                />
              </>
            )}

            <View style={styles.divider} />

            <View style={styles.buttonContainer}>
              <Button
                onPress={props?.onPressCancel}
                style={styles.button}
                label={t('personalChat.cancel')}
                type="SECONDARY"
              />
              <Button
                onPress={props?.onPressSend}
                style={styles.button}
                label={t('personalChat.send')}
                type="PRIMARY"
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.opacity03,
  },
  modalContent: {
    backgroundColor: Colors.whiteBg,
    bottom: MetricsSizes.vs0,
    width: DEVICE_WIDTH,
    position: 'absolute',
    alignItems: 'center',
    paddingVertical: MetricsSizes.vs30,
    borderTopLeftRadius: MetricsSizes.ms30,
    borderTopRightRadius: MetricsSizes.ms30,
  },
  contentContainer: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: DEVICE_WIDTH * 0.9,
  },
  labelText: {
    color: Colors.darkGrey,
  },
  inputFieldContainer: {
    borderBottomWidth: 0,
    marginBottom: MetricsSizes.vs15,
  },
  inputField: {
    backgroundColor: Colors.chatCardBG,
    borderRadius: MetricsSizes.ms10,
    width: '100%',
    paddingLeft: MetricsSizes.hs10,
    alignSelf: 'center',
  },
  divider: {
    height: MetricsSizes.vs1,
    backgroundColor: Colors.darkGrey,
    width: '100%',
    marginVertical: MetricsSizes.vs15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    width: DEVICE_WIDTH * 0.425,
  },
  customCardView: {
    alignItems: 'center',
    paddingHorizontal: MetricsSizes.hs8,
    width: DEVICE_WIDTH * 0.9,
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

export default SuggestionStepsModal;
