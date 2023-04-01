import * as React from "react";
import { Amplify } from 'aws-amplify';
// import { enableScreens } from "react-native-screens";
import 'react-native-get-random-values';
import { AppNavigator } from "./src/AppNavigator";
import { Provider, MD3DarkTheme, DefaultTheme, MD3LightTheme } from 'react-native-paper';
import { QueryClientProvider } from "react-query";
import {Appearance} from 'react-native';
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { queryClient } from "./src/queries/QueryClient";
import config from './src/aws-exports';
Amplify.configure(config);


function App() {
  const scheme = Appearance.getColorScheme();
  const theme: ThemeProp = React.useMemo(() => {
    return {
      ...DefaultTheme,
      ...(scheme === 'light' ? MD3LightTheme : MD3DarkTheme),
      dark: scheme !== 'light',
    }  
  }, [scheme]); 

  return (
    // <GestureHandlerRootView>
      <Provider theme={theme}>
        {/* Provide our theme state and setter function to the rest of our app using the ThemeContext */}
        {/* Use the Stack.Navigator component to define our app's navigation structure */}
        <QueryClientProvider client={queryClient}>
          <AppNavigator />
        </QueryClientProvider>
      </Provider>
    // </GestureHandlerRootView>
  );
}

export default App;
