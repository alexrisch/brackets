import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { translate } from '../translations';

export const LandingScreen = () => {
  const {navigate} = useAppNav();
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Button style={styles.button} mode='contained' onPress={() => navigate(ScreenNames.HomeScreen)}>
        { translate('landing_bracket')}
        </Button>
        <Button mode='outlined' onPress={() => navigate(ScreenNames.LoginScreen)}>
          {translate('landing_auth')}
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
    justifyContent: 'center',
  },
  button: {
    marginBottom: 50,
  }
});
