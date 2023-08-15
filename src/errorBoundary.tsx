/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, { ErrorInfo } from 'react';
import { Appearance, SafeAreaView, Text, View } from 'react-native';
import { dark, light } from './theme/themeConfig';

const defaultTheme = {
  ...light.theme,
  themeMode: 'default',
};
const darkTheme = {
  ...dark.theme,
  themeMode: 'dark',
};

interface IErrorBoundryProps {
  children: JSX.Element;
}

interface IErrorBoundryState {
  hasError: boolean;
  error: Error | string;
  errorInfo: ErrorInfo | string;
}

export default class ErrorBoundary extends React.Component<IErrorBoundryProps, IErrorBoundryState> {
  constructor(props: IErrorBoundryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: '',
      errorInfo: '',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const colorScheme = Appearance.getColorScheme();
    const theme = colorScheme === 'dark' ? darkTheme : defaultTheme;
    let error: string = this?.state?.error?.toString() || '';
    if (this.state.hasError) {
      return (
        <SafeAreaView>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: theme.text }}>Oops!!! Something went wrong..</Text>
            <Text style={{ color: theme.text }}>Error: {error}</Text>
          </View>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}
