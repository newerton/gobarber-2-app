import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import type React from 'react';
import { StatusBar, View } from 'react-native';
import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#28262e" />
    <AppProvider>
      <View style={{ flex: 1, backgroundColor: '#312e38' }}>
        <Routes />
      </View>
    </AppProvider>
  </NavigationContainer>
);

export default App;
