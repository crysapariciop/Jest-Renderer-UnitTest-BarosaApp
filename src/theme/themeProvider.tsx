import React, { useContext, ReactNode } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { dark, light } from './themeConfig';

interface Theme {
  [key: string]: any;
  themeMode: 'default' | 'dark';
}

interface ThemeContextType {
  theme: Theme;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: Theme = {
  ...light.theme,
  themeMode: 'default',
};

const darkTheme: Theme = {
  ...dark.theme,
  themeMode: 'dark',
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const colorScheme: ColorSchemeName = Appearance.getColorScheme();
  const theme: Theme = colorScheme === 'dark' ? darkTheme : defaultTheme;

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return themeContext;
};

export default ThemeProvider;
