import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';

export const ResetPasswordScreen = () => {
  const { goBack, navigate } = useAppNav();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handleResetPasswordSubmit = () => {
    // TODO:
    console.log('Submit new password:', newPassword);
    navigate(ScreenNames.LoginScreen);
  };

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('reset_password_title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text>{translate('reset_password_new_password')}</Text>
          <TextInput
            style={styles.topItem}
            label={translate('login_password')}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.topItem}
            label={translate('reset_password_confirm_new_password')}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            right={<TextInput.Icon icon="eye" />}
          />
        </View>
        <Button style={styles.button} mode="contained" onPress={handleResetPasswordSubmit}>
          {translate('reset_password_button')}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 25
  },
  topContainer: {
    flex: 1,
  },
  topItem: {
    marginTop: 30,
  },
  button: {
    marginBottom: 50,
  },
});

export default ResetPasswordScreen;
