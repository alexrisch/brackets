import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useMutation } from 'react-query';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';

const registerUser = async (userData: { email: string; displayName: string; password: string }) => {
  // Placeholder function to simulate registering user
  // await new Promise(resolve => setTimeout(resolve, 1000));
  // console.log('User registered successfully with data: ', userData);
};

export const RegisterScreen = () => {
  const {navigate} = useAppNav();
  const [email, setEmail] = React.useState('');
  const [displayName, setDisplayName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const registerMutation = useMutation(registerUser, {
    onSuccess: () => console.log('User registered successfully!'),
    onError: (error) => console.log('Error while registering user: ', error),
  });

  const handleRegister = () => {
    registerMutation.mutate({ email, displayName, password });
  };

  return (
    <ScreenWrapper>

      <View style={styles.container}>
        <TextInput
          label={translate('register_email')}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          label={translate('profile_display_name')}
          value={displayName}
          onChangeText={setDisplayName}
        />
        <TextInput
          label={translate('register_password')}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          label={translate('register_confirm_password')}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button mode="contained" onPress={handleRegister} loading={registerMutation.isLoading}>
          {translate('register_button')}
        </Button>
        <Button onPress={() => navigate(ScreenNames.LoginScreen)}>
          {translate('login_button')}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 75,
    paddingBottom: 200,
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
  },
});

export default RegisterScreen;
