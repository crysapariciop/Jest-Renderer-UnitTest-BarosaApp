import { MagicText } from '@src/core-component/atoms';
import Colors, { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

interface itemType {
  _id?: string;
  images?: any;
  familyId?: any;
  year?: string;
}
interface ProductCardProps {
  item?: itemType;
  index?: number;
  onItemPress?: (id: any) => void;
}

const ProductCardRow = ({ item = {}, index, onItemPress = () => {} }: ProductCardProps) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress(item?._id);
      }}
      style={styles.columnViewParent}>
      <View style={styles.columnViewContentStyle}>
        <Image source={{ uri: item?.images[0]?.url }} style={styles.columnViewImage} />
        <View style={styles.container}>
          <View style={styles.brandNameAndYearRow}>
            <MagicText type="MEDIUM" style={styles.itemBrandName}>
              {item?.familyId?.brandId?.name}
            </MagicText>
            <MagicText type="REGULAR" style={styles.itemYear}>
              {item.year}
            </MagicText>
          </View>
          <MagicText type="SEMI_BOLD" style={styles.itemFamilyName}>
            {item?.familyId?.name}
          </MagicText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  columnViewImage: {
    height: MetricsSizes.ms45,
    width: MetricsSizes.ms45,
    borderRadius: MetricsSizes.ms45,
  },
  columnViewContentStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnViewParent: {
    flex: 1,
    borderBottomWidth: MetricsSizes.ms1,
    borderBottomColor: Colors.buttonGreyBg,
    marginBottom: MetricsSizes.vs8,
  },
  itemFamilyName: {
    marginLeft: MetricsSizes.hs8,
    marginTop: MetricsSizes.vs4,
    marginBottom: MetricsSizes.vs12,
    fontSize: MetricsSizes.ms12,
    lineHeight: MetricsSizes.ms16,
  },
  itemYear: {
    fontSize: MetricsSizes.ms10,
    lineHeight: MetricsSizes.ms12,
    color: Colors.greyText,
  },
  itemBrandName: {
    fontSize: MetricsSizes.ms10,
    lineHeight: MetricsSizes.ms12,
    color: Colors.greyText,
  },
  brandNameAndYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MetricsSizes.vs12,
    marginHorizontal: MetricsSizes.hs8,
  },
});

export default ProductCardRow;
