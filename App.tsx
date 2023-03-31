import * as React from "react";
// import { Amplify } from 'aws-amplify';
// import { enableScreens } from "react-native-screens";
import 'react-native-get-random-values';
import { AppNavigator } from "./src/AppNavigator";
import { Provider, MD3DarkTheme, MD2LightTheme, DefaultTheme, MD3LightTheme } from 'react-native-paper';
import { QueryClientProvider } from "react-query";
import {Appearance} from 'react-native';
import { ThemeProp } from "react-native-paper/lib/typescript/types";
import { queryClient } from "./src/queries/QueryClient";
// import { GestureHandlerRootView } from "react-native-gesture-handler";

// Amplify.configure({
//   Auth: {
//     // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
//     identityPoolId: 'us-east-1:cbd121cd-8153-43f4-b9ba-39d7e1f8f0c1',
//     // REQUIRED - Amazon Cognito Region
//     region: 'us-east-1',
//     // OPTIONAL - Amazon Cognito User Pool ID
//     // userPoolId: 'bracketsc6a5b45c_userpool_c6a5b45c-dev',
//     userPoolId: 'us-east-1_j3AE0IMvG',

//     // OPTIONAL - Amazon Cognito Federated Identity Pool Region 
//     // Required only if it's different from Amazon Cognito Region
//     // identityPoolRegion: 'XX-XXXX-X',

//     // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//     userPoolWebClientId: '63drj12l9gpvd2tv1uvkc250l',

//     // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
//     mandatorySignIn: false,

//     // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
//     // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
//     signUpVerificationMethod: 'code', // 'code' | 'link' 

//     // OPTIONAL - Configuration for cookie storage
//     // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
//     // cookieStorage: {
//     //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
//     //   domain: '.yourdomain.com',
//     //   // OPTIONAL - Cookie path
//     //   path: '/',
//     //   // OPTIONAL - Cookie expiration in days
//     //   expires: 365,
//     //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
//     //   sameSite: "strict" | "lax",
//     //   // OPTIONAL - Cookie secure flag
//     //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
//     //   secure: true
//     // },

//     // // OPTIONAL - customized storage object
//     // storage: MyStorage,

//     // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
//     // authenticationFlowType: 'USER_PASSWORD_AUTH',

//     // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
//     // clientMetadata: { myCustomKey: 'myCustomValue' },

//     // // OPTIONAL - Hosted UI configuration
//     // oauth: {
//     //   domain: 'your_cognito_domain',
//     //   scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
//     //   redirectSignIn: 'http://localhost:3000/',
//     //   redirectSignOut: 'http://localhost:3000/',
//     //   responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
//     // }
//   },
// });
// Enable native-screens for better performance on iOS and Android
// enableScreens();


function App() {
  const scheme = Appearance.getColorScheme();
  const theme: ThemeProp = {
    ...DefaultTheme,
    ...(scheme === 'light' ? MD3LightTheme : MD3DarkTheme),
    dark: scheme !== 'light',
    
  }

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
