import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { Auth } from 'aws-amplify';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';

export const LandingScreen = () => {
  const {reset} = useAppNav();

  useEffect(() => {
    Auth.currentUserInfo()
    .then(user => {
      console.log('here1119', user)
      if (user) {
        reset({
          routes: [
            {
              name: ScreenNames.HomeScreen
            }
          ]
        });
      } else {
        reset({
          routes: [
            {
              name: ScreenNames.LoginScreen
            }
          ]
        });
      }
    })
    .catch(err => {
      reset({
        routes: [
          {
            name: ScreenNames.LoginScreen
          }
        ]
      });
    });
  }, []);

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} />
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
    justifyContent: 'center',
  },
  button: {
    marginBottom: 50,
  }
});
