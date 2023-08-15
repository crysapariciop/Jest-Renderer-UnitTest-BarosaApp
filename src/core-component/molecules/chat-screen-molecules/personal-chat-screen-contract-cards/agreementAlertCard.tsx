import React from 'react';
import { View, StyleSheet } from 'react-native';
import RemixIcon from 'react-native-remix-icon';
import { MagicText } from '@src/core-component/atoms';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';

interface ProposalCardPropTypes {
  titleText: string;
}

const AgreementAlertCard: React.FC<ProposalCardPropTypes> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <RemixIcon size={MetricsSizes.ms40} name="ri-magic-fill" />
      </View>

      <MagicText style={styles.defaultText} type="SEMI_BOLD">
        {props?.titleText}
      </MagicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: Colors.confirmationCardBG,
    borderRadius: MetricsSizes.ms20,
    alignSelf: 'center',
    marginTop: MetricsSizes.vs15,
    padding: MetricsSizes.hs20,
  },
  iconContainer: {
    position: 'absolute',
    left: -MetricsSizes.ms15,
    top: -MetricsSizes.ms15,
  },

  defaultText: {
    fontSize: MetricsSizes.ms14,
    textAlign: 'left',
    color: Colors.whiteBg,
    marginRight: MetricsSizes.hs20,
  },
});

export default AgreementAlertCard;
