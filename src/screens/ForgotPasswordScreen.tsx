import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';

export const ForgotPasswordScreen = () => {
  const {navigate, goBack} = useAppNav();
  const [resetCode, setResetCode] = React.useState('');

  const handleResetCodeSubmit = () => {
    console.log('Submit reset code:', resetCode);
    navigate(ScreenNames.ResetPasswordScreen);
  };

  const handleResendCode = () => {
    console.log('Resend reset code');
  };

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('create_bracket_add_team_button')} />
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
        </View>
        <View style={styles.footer}>
          <Button style={styles.buttonStyle} mode="contained" onPress={handleResetCodeSubmit}>
            {translate('forgot_password_submit_button')}
          </Button>
          <Button style={styles.buttonStyle} onPress={handleResendCode}>
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
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  instructions: {
    marginTop: 30,
  },
  topContainer: {
    flex: 1,
  },
  footer: {
    paddingBottom: 30,
    // alignSelf: 'flex-end'
  },
  buttonStyle: {
    marginVertical: 10,
  },
});
