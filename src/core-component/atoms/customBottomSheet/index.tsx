import React, { ReactNode } from 'react';

import {
  View,
  Pressable,
  Modal,
  TouchableOpacity,
  ModalProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CustomBottomSheetStyle from './style';
import MagicText from '../MagicText';
import { MetricsSizes } from '@src/theme/metrics';
import { useTranslation } from 'react-i18next';

type CustomBottomSheetPropType = {
  children?: ReactNode;
  title?: string | null;
  titleStyle?: object;
  showModal?: boolean;
  onDismiss?: () => void;
  onRequestClose?: () => void;
  hrLineStyle?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
  showHeader?: boolean;
} & ModalProps;

const CustomBottomSheet = ({
  showModal = false,
  onDismiss = () => {},
  onRequestClose = () => {},
  title,
  titleStyle,
  hrLineStyle,
  cardStyle,
  showHeader = true,
  ...props
}: CustomBottomSheetPropType) => {
  const { t: translate } = useTranslation();
  return (
    <Modal
      onRequestClose={() => {
        onDismiss();
      }}
      animationType="slide"
      transparent={true}
      visible={showModal}
      {...props}>
      <Pressable style={CustomBottomSheetStyle.container} onPress={onDismiss}>
        <Pressable style={[CustomBottomSheetStyle.card, cardStyle]}>
          {showHeader ? (
            <>
              <View style={CustomBottomSheetStyle.headerView}>
                <MagicText type="SEMI_BOLD" style={[CustomBottomSheetStyle.headerText, titleStyle]}>
                  {title}
                </MagicText>
                <TouchableOpacity style={{ marginRight: MetricsSizes.hs2 }} onPress={onDismiss}>
                  <MagicText>{translate('cancel')}</MagicText>
                </TouchableOpacity>
              </View>
              <View style={[CustomBottomSheetStyle.horizontalLine, hrLineStyle]} />
            </>
          ) : null}

          {props.children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomBottomSheet;
