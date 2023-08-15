import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessagingStackParamList } from '../interface';
import PersonalChat from '@src/modules/messaging-module/personal-chat-module/personalChatScreen';
import WebViewModal from '@src/core-component/atoms/webViewModal/webViewModal';

/**
 *
 * @deprecated Using groups at MainStackNavigator instead.
 */
const MessagingStack = () => {
  const Stack = createNativeStackNavigator<MessagingStackParamList>();

  const screens: any = [
    {
      name: 'PersonalChat',
      component: PersonalChat,
    },
    {
      name: 'WebViewModal',
      component: WebViewModal,
    },
  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map((screen: any) => (
        <Stack.Screen
          options={{ headerShown: false }}
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default MessagingStack;
