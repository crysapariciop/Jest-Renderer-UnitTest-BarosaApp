import { MagicText } from '@src/core-component/atoms';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyFriendsScreen = () => {
  return (
    <View style={styles.container}>
      <MagicText>My Friends Screen</MagicText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
  },
});

export default MyFriendsScreen;
