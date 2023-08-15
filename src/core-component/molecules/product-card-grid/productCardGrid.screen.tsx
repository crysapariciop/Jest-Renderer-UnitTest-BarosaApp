import { MagicText } from '@src/core-component/atoms';
import { defaultImages } from '@src/core-constant/constants';
import Colors, { COLOR } from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import RemixIcon from 'react-native-remix-icon';

interface itemType {
  _id?: string;
  images?: any;
  familyId?: any;
  year?: string;
}

interface ProductCardGridType {
  item?: itemType;
  index?: any;
  onItemPress?: (id: any) => void;
  onSharePress?: () => void;
}

const ProductCardGrid = ({
  item = {},
  index,
  onItemPress = () => {},
  onSharePress = () => {},
}: ProductCardGridType) => {
  return (
    <TouchableOpacity
      onPress={() => {
        onItemPress(item?._id);
      }}
      style={[
        styles.gridViewParent,
        index % 2 == 0 ? { marginRight: MetricsSizes.hs4 } : { marginLeft: MetricsSizes.hs4 },
      ]}
    >
      <Image
        source={{
          uri: item?.images[0]?.url || defaultImages.noImage,
        }}
        style={styles.gridViewImage}
      />

      <Menu style={styles.menuHeader}>
        <MenuTrigger
          style={{}}
          children={
            <View style={styles.moreOptionContainer}>
              <RemixIcon name={'ri-more-2-fill'} size={MetricsSizes.ms20} color={COLOR.WHITE} />
            </View>
          }
        />
        <MenuOptions customStyles={index % 2 == 0 ? optionsStyles : optionsStyles2}>
          <MenuOption
            onSelect={onSharePress}
            children={
              <View style={styles.sharePlaneIcon}>
                <RemixIcon
                  name={'ri-send-plane-fill'}
                  size={MetricsSizes.ms20}
                  color={COLOR.BLACK_TEXT}
                />
                <MagicText style={styles.shareText}>Share</MagicText>
              </View>
            }
          />
        </MenuOptions>
      </Menu>

      <View style={styles.brandNameAndYearRow}>
        <MagicText type="MEDIUM" style={styles.itemBrandName}>
          {item?.familyId?.brandId?.name}
        </MagicText>
        <MagicText type="REGULAR" style={styles.itemYear}>
          {item?.year}
        </MagicText>
      </View>
      <MagicText type="SEMI_BOLD" style={styles.itemFamilyName}>
        {item?.familyId?.name}
      </MagicText>
    </TouchableOpacity>
  );
};

const optionsStyles = {
  optionsContainer: {
    width: MetricsSizes.hs80,
    marginTop: MetricsSizes.vs24, // Adjust this value to position the popup below the header
    marginLeft: MetricsSizes.hs_60,
  },
  optionText: {
    color: COLOR.BLACK_TEXT,
  },
};
const optionsStyles2 = {
  optionsContainer: {
    width: MetricsSizes.hs80,
    marginTop: MetricsSizes.vs24, // Adjust this value to position the popup below the header
    marginLeft: MetricsSizes.hs0,
  },
  optionText: {
    color: COLOR.BLACK_TEXT,
  },
};

const styles = StyleSheet.create({
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

  gridViewImage: { height: MetricsSizes.ms175, width: '100%' },
  gridViewParent: {
    flex: 1,
    backgroundColor: Colors.buttonGreyBg,
    marginBottom: MetricsSizes.vs8,
    maxWidth: '50%',
  },
  moreOptionContainer: {
    height: MetricsSizes.ms28,
    width: MetricsSizes.ms28,
    borderRadius: MetricsSizes.ms14,
    backgroundColor: 'transperent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandNameAndYearRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: MetricsSizes.vs12,
    marginHorizontal: MetricsSizes.hs8,
  },
  sharePlaneIcon: {
    flexDirection: 'row',
    marginTop: MetricsSizes.vs4,
    marginLeft: MetricsSizes.hs4,
    alignItems: 'center',
    borderRadius: MetricsSizes.ms8,
  },
  menuHeader: { position: 'absolute', right: MetricsSizes.hs0 },
  shareText: { marginHorizontal: MetricsSizes.hs4 },
});

export default ProductCardGrid;
