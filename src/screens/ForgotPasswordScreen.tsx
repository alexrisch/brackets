import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Appbar } from 'react-native-paper';
import { useMutation } from 'react-query';
import {Auth} from 'aws-amplify'
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { MutationKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

export const ForgotPasswordScreen = () => {
  const {navigate, goBack} = useAppNav();
  const [email, setEmail] = React.useState('');


  const {mutate: submit} = useMutation(MutationKeys.ForgotPasswordSubmit, () => {
    return Auth.forgotPassword(email);
  }, {
    onSettled: () => {
      navigate(ScreenNames.ResetPasswordScreen, {username: email});
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
            label={translate('forgot_password_email')}
            value={email}
            onChangeText={setEmail}
          />
          <Text style={styles.instructions}>
            {translate('forgot_password_enter_to_continue')}
          </Text>
        </View>
        <View style={styles.footer}>
          <Button style={styles.buttonStyle} mode="contained" onPress={() => submit()}>
            {translate('forgot_password_submit_button')}
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
  topItem: {
    marginTop: 30,
  },
});
