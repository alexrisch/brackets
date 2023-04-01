import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { translate } from '../translations';
import { useMutation } from 'react-query';
import { MutationKeys } from '../queries/QueryKeys';

export const VerifySignUpSceeen = () => {
  const {goBack, reset} = useAppNav();
  const { params } = useScreenRoute<ScreenNames.VerifySignUpSceeen>();
  const { username } = params ?? {};
  const [resetCode, setResetCode] = React.useState('');

  const handleVerifyCodeSubmit = async () => {
    console.log('Submit reset code:', resetCode);
    return Auth.confirmSignUp(
      username,
      resetCode
    ).then(() => {
      reset({
        routes: [
          {
            name: ScreenNames.HomeScreen
          }
        ]
      });
    });
  };

  const handleResendCode = async () => {
    console.log('Resend reset code');
    return Auth.resendSignUp(username);
  };

  const {isLoading: submitLoading, mutate: submit} = useMutation(MutationKeys.VerifyCodeSubmit, handleVerifyCodeSubmit, {
    onSuccess: () => reset({
      routes: [
        {
          name: ScreenNames.HomeScreen
        }
      ]
    }),
    onError: (error) => console.log('Error while registering user: ', error),
  });

  const {isLoading: resendLoading, mutate: resend} = useMutation(MutationKeys.VerifyCodeResend, handleResendCode, {
    onError: (error) => console.log('Error while registering user: ', error),
  });

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('verify_sign_up_title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <TextInput
            label={translate('verify_sign_up_code')}
            value={resetCode}
            onChangeText={setResetCode}
          />
          <Text style={styles.instructions}>
            {translate('verify_sign_up_code_message')}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button style={styles.buttonStyle} mode="contained" onPress={() => submit()} loading={submitLoading}>
            {translate('verify_sign_up_submit_button')}
          </Button>
          <Button style={styles.buttonStyle} onPress={() => resend()} loading={resendLoading}>
            {translate('verify_sign_up_resend_button')}
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
