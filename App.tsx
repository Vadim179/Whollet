import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ContextProvider } from './app/context';
import { DarkThemeProvider, NotificationHandler } from './app/components';
import { RootNavigator } from './app/navigation';

const App = () => {
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
