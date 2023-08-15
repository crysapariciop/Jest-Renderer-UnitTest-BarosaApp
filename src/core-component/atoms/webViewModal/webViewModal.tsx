import React from 'react';
import { View, Text, SafeAreaView, Pressable } from 'react-native';
import WebView from 'react-native-webview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { MetricsSizes } from '@src/theme/metrics';
import { Left } from '@src/assets/icons';
import { SharedStyles } from '@src/theme/sharedStyle';
import { styles } from './styles';
import { RootStackParamList } from '@src/core-navigation/interface';

const WebViewModal = () => {
  // for navigation
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'WebViewModal'>>();

  return (
    <SafeAreaView style={[SharedStyles.safeAreaStyle]}>
      <View style={[SharedStyles.direction, styles.headerView]}>
        <Pressable hitSlop={15} onPress={() => navigation.goBack()}>
          <Left height={MetricsSizes.vs20} width={MetricsSizes.hs20} />
        </Pressable>
        <Text numberOfLines={1} style={styles.webContainer}>
          {route?.params?.title || ''}
        </Text>
      </View>
      <View style={styles.webViewStyle}>
        <WebView
          source={{ uri: route?.params?.url || '' }}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          javaScriptCanOpenWindowsAutomatically={true}
        />
      </View>
    </SafeAreaView>
  );
};

export default WebViewModal;
