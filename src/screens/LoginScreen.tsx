import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';
import { useMutation } from 'react-query';
import { MutationKeys } from '../queries/QueryKeys';

export const LoginScreen = () => {
  const {navigate, reset} = useAppNav();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const handleLogin = async () => {
    return Auth.signIn(email, password);
  };

  const {mutate: login, isLoading} = useMutation(MutationKeys.SubmitLogin, handleLogin, {
    onSuccess: () => {
      reset({
        routes: [
          {
            name: ScreenNames.HomeScreen
          }
        ]
      });
    },
    onError: () => {
      // TODO: Errors
      console.log('Failed to log in');
    },
  });

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <TextInput
          label={translate('login_email')}
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <TextInput
          label={translate('login_password')}
          secureTextEntry={!showPass}
          onChangeText={setPassword}
          right={<TextInput.Icon icon="eye" onPress={() => setShowPass(prev => !prev)} />}
        />
        <Button mode="contained" onPress={() => login()} loading={isLoading}>
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
