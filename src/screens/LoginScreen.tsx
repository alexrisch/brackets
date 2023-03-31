import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';

export const LoginScreen = () => {
  const {navigate} = useAppNav();
  const [showPass, setShowPass] = useState(false);
  const handleLogin = () => {
    // TODO:
    // your code to login
    navigate(ScreenNames.HomeScreen);
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TextInput
          label={translate('login_email')}
          // placeholder="Enter your email"
          autoCapitalize="none"
          keyboardType="email-address"
          
        />
        <TextInput
          label={translate('login_password')}
          // placeholder="Enter your password"
          secureTextEntry={!showPass}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPass(prev => !prev)} />}
        />
        <Button mode="contained" onPress={handleLogin}>
          {translate('login_button')}
        </Button>
        <Button mode='outlined' onPress={() => navigate(ScreenNames.RegisterScreen)}>
        {translate('register_button')}
        </Button>
        <Button onPress={() => navigate(ScreenNames.ForgotPasswordScreen)}>
        {translate('login_forgot_password')}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    paddingBottom: 200,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
  },
});
