import React from 'react';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ContextProvider } from './app/context';
import { DarkThemeProvider, NotificationHandler } from './app/components';
import { RootNavigator } from './app/navigation';

const App = () => {
  const [fontsLoaded] = useFonts({
    ['TitilliumWeb-Bold']: require('./assets/fonts/TitilliumWeb-Bold.ttf'),
    ['TitilliumWeb-Light']: require('./assets/fonts/TitilliumWeb-Light.ttf'),
    ['TitilliumWeb-Regular']: require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    ['TitilliumWeb-SemiBold']: require('./assets/fonts/TitilliumWeb-SemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ContextProvider>
      <DarkThemeProvider>
        <SafeAreaProvider>
          <RootNavigator />
          <NotificationHandler />
        </SafeAreaProvider>
      </DarkThemeProvider>
    </ContextProvider>
  );
};

export default App;
