//import liraries
import React, { useState } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import ConfirmProposalCard from './confirmProposalCard';
import RemixIcon from 'react-native-remix-icon';
import { DEVICE_HEIGHT, DEVICE_WIDTH, MetricsSizes } from '@src/theme/metrics';
import { MagicText } from '@src/core-component/atoms';
import { useTranslation } from 'react-i18next';
import Colors from '@src/theme/colors';
import { ProposalData } from '../Constants';

interface ProposalModalTypes {
  onPressCrossAction?: () => void;
  onShare: () => void;
  onRevice: () => void;
  showModal?: boolean;
  price: string;
  days: string;
  userName: string;
}

const ConfirmProposalModal = (props: ProposalModalTypes) => {
  const { t } = useTranslation();

  const [isInfo, setIsInfo] = useState(false);
  return (
    <Modal animationType="slide" visible={props?.showModal}>
      {isInfo ? (
        <View style={styles.container2}>
          <TouchableOpacity
            onPress={() => {
              setIsInfo(false);
            }}
            style={styles.infoIconContainer}
          >
            <RemixIcon size={MetricsSizes.ms25} name="ri-close-line" />
          </TouchableOpacity>

          <View style={{ marginTop: MetricsSizes.vs50 }}>
            <MagicText
              style={[styles.defaultText, { marginBottom: MetricsSizes.vs25 }]}
              type="SEMI_BOLD"
            >
              {`${t('personalChat.howProposalCal')}`}
            </MagicText>
            {ProposalData.map((item) => (
              <MagicText style={[styles.defaultText, { textAlign: 'left' }]} type="SEMI_BOLD">
                {`•   ${item}`}
              </MagicText>
            ))}

            <MagicText
              style={[styles.defaultText, { textAlign: 'left', marginTop: MetricsSizes.vs25 }]}
              type="SEMI_BOLD"
            >
              {t('personalChat.whatIsReturn')}
            </MagicText>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <ConfirmProposalCard
            userName={props?.userName}
            shippingNInsurance={'40'}
            barosaFee={'400'}
            returnDays={props?.days}
            price={props?.price}
            onPressInfoAction={() => {
              setIsInfo(true);
            }}
            onPressReviceAction={props?.onRevice}
            onPressShareAction={props?.onShare}
          />
        </View>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    width: DEVICE_WIDTH * 0.9,
    height: DEVICE_HEIGHT * 0.9,
    backgroundColor: Colors.confirmationCardBG,
    borderRadius: MetricsSizes.ms20,
    alignSelf: 'center',
    marginTop: MetricsSizes.vs15,
    padding: MetricsSizes.hs20,
  },
  infoIconContainer: {
    position: 'absolute',
    right: MetricsSizes.hs10,
    top: MetricsSizes.vs10,
  },
  defaultText: {
    fontSize: MetricsSizes.ms14,
    textAlign: 'center',
    color: Colors.black,
  },
});

export default ConfirmProposalModal;
