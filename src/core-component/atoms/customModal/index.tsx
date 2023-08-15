import React, { ReactNode } from 'react';

import { Pressable, Modal, ModalProps, StyleProp, ViewStyle } from 'react-native';
import CustomModalStyle from './style';

type CustomModalPropType = {
  children?: ReactNode;
  title?: string | null;
  titleStyle?: object;
  showModal?: boolean;
  onDismiss?: () => void;
  onRequestClose?: () => void;
  cardStyle?: StyleProp<ViewStyle>;
  showHeader?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
} & ModalProps;

const CustomModal = ({
  showModal = false,
  onDismiss = () => {},
  onRequestClose = () => {},
  title,
  titleStyle,
  cardStyle,
  contentStyle,
  showHeader = true,
  ...props
}: CustomModalPropType) => {
  return (
    <Modal
      onRequestClose={() => {
        onRequestClose();
      }}
      animationType="slide"
      transparent={true}
      visible={showModal}
      {...props}>
      <Pressable
        onPress={() => {
          onRequestClose();
        }}
        style={CustomModalStyle.modalParent}>
        <Pressable style={[CustomModalStyle.modalContentContainer, contentStyle]}>
          {props.children}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomModal;
