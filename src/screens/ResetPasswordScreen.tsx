import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useMutation } from 'react-query';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { MutationKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

export const ResetPasswordScreen = () => {
  const {navigate, goBack} = useAppNav();
  const {params} = useScreenRoute<ScreenNames.ResetPasswordScreen>();
  const {username} = params ?? {};
  const [resetCode, setResetCode] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState('');


  const {mutate: submit} = useMutation(MutationKeys.ForgotPasswordSubmit, () => {
    return Auth.forgotPasswordSubmit(username, resetCode, newPassword);
  }, {
    onSettled: () => {
      navigate(ScreenNames.LoginScreen);
    },
    onError: () => {
      // TODO: Errors
    },
  });

  const {mutate: resendCode, isLoading: resetCodeLoading} = useMutation(MutationKeys.ForgotPasswordSubmit, () => {
    return Auth.forgotPassword(username);
  }, {
    onSettled: () => {
    },
    onError: () => {
      // TODO: Errors
    },
  });
  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('forgot_password_title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextInput
            label={translate('forgot_password_code')}
            value={resetCode}
            onChangeText={setResetCode}
          />
          <Text style={styles.instructions}>
            {translate('forgot_password_code_message')}
          </Text>
          <TextInput
            style={styles.topItem}
            label={translate('login_password')}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
            right={<TextInput.Icon icon="eye" onPress={() => setShowNewPassword(prev => !prev)} />}
          />
          <TextInput
            style={styles.topItem}
            label={translate('reset_password_confirm_new_password')}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            right={<TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword(prev => !prev)} />}
          />
        </View>
        <View style={styles.footer}>
          <Button
            style={styles.buttonStyle}
            mode="contained"
            onPress={() => submit()}
          >
            {translate('forgot_password_submit_button')}
          </Button>
          <Button style={styles.buttonStyle} onPress={() => resendCode} loading={resetCodeLoading}>
            {translate('forgot_password_resend_button')}
          </Button>
        </View>
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
  instructions: {
    marginTop: 30,
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
  buttonStyle: {
    marginVertical: 10,
  },
  footer: {
    paddingBottom: 30,
    // alignSelf: 'flex-end'
  },
});

export default ResetPasswordScreen;
