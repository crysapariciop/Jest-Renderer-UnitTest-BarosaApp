import Avatar from '@src/core-component/molecules/user-avtar';
import Colors from '@src/theme/colors';
import { MetricsSizes } from '@src/theme/metrics';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const TopBrands = () => {
  const testNames = [
    'Rolex',
    'Audemars Piguet',
    'Patek Philippe',
    'Vacheron Constantin',
    'Omega',
    'Grand Seiko',
    'Rolex',
    'Audemars Piguet',
    'Patek Philippe',
    'Vacheron Constantin',
    'Omega',
    'Grand Seiko',
    'Rolex',
    'Audemars Piguet',
    'Patek Philippe',
    'Vacheron Constantin',
    'Omega',
    'Grand Seiko',
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top brands</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {testNames.map((brand) => (
          <Brand name={brand} />
        ))}
      </ScrollView>
    </View>
  );
};

interface IBrand {
  name: string;
}
const Brand = ({ name }: IBrand) => {
  return (
    <View style={styles.brandContainer}>
      <Avatar imageURL={null} />
      <Text style={styles.brandName} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    marginHorizontal: 10,
    color: Colors.placeHolderTextGrey,
    fontSize: 10,
    textTransform: 'uppercase',
  },
  container: {
    flexDirection: 'column',
    width: '100%',
  },

  brandContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: MetricsSizes.hs25,
  },
  brandName: {
    textAlign: 'center',
    flexGrow: 1,
    width: 50,
    fontSize: 10,
  },
});

export default TopBrands;
