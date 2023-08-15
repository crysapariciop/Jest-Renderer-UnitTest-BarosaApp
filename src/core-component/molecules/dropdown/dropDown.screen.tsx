import { FONTS } from '@src/assets/fonts';
import { MagicText } from '@src/core-component/atoms';
import Button from '@src/core-component/atoms/button';
import CustomModal from '@src/core-component/atoms/customModal';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { useState } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RemixIcon from 'react-native-remix-icon';

interface DropDownProps {
  data?: any[];
  dropDownHeaderLabel?: string | null;
  isRequired?: boolean;
  selectedValue?: string | undefined | null;
  onSelect?: (item: any) => void;
  isValid?: boolean;
  errorMessage?: string | undefined | null;
  errorStyle?: StyleProp<TextStyle>;
}

const DropDown = ({
  data = [],
  selectedValue,
  dropDownHeaderLabel,
  isRequired,
  isValid,
  errorMessage,
  errorStyle,
  onSelect = () => {},
}: DropDownProps) => {
  const [showDropDownModal, setShowDropDownModal] = useState<boolean>(false);
  return (
    <View>
      {dropDownHeaderLabel ? (
        <MagicText isRequired={isRequired}>{dropDownHeaderLabel}</MagicText>
      ) : null}
      <Button
        onPress={() => {
          setShowDropDownModal(true);
        }}
        style={styles.buttonContainer}
        contentStyle={styles.buttonContent}
        type="PRIMARY"
        labelStyle={{ color: Colors.profileBioGrey }}
        label={selectedValue}
        rightIcon={
          <RemixIcon name={'arrow-down-s-line'} size={MetricsSizes.ms20} color={Colors.greyText} />
        }
      />
      {!isValid && errorMessage ? (
        <MagicText style={[styles.errStyle, errorStyle]}>{errorMessage}</MagicText>
      ) : null}
      <CustomModal
        visible={showDropDownModal}
        showModal={showDropDownModal}
        title="Select option"
        onRequestClose={() => setShowDropDownModal(false)}>
        <View>
          <ScrollView>
            {data?.map((item) => {
              return (
                <TouchableOpacity
                  key={item?.id}
                  style={{ marginBottom: 16 }}
                  onPress={() => {
                    onSelect(item?.name);
                    setShowDropDownModal(!showDropDownModal);
                  }}>
                  <MagicText type="MEDIUM" style={{ fontSize: 14 }}>
                    {item?.name}
                  </MagicText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errStyle: {
    fontSize: MetricsSizes.ms12,
    fontFamily: FONTS.BAROSA.REGULAR,
    color: Colors.red,
  },
  buttonContainer: {
    backgroundColor: Colors.buttonGreyBg,
    flexDirection: 'row',
    borderRadius: MetricsSizes.ms12,
    paddingVertical: MetricsSizes.vs0,
    marginBottom: MetricsSizes.vs6,
  },
  buttonContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: MetricsSizes.ms12,
  },
});

export default DropDown;
