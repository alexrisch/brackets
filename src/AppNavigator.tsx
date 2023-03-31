import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  HomeScreen,
  ProfileScreen,
  CreateBracketScreen,
  BracketTeamsScreen,
  AddTeamScreen,
  EditTeamScreen,
  MatchupScreen,
  TeamViewScreen,
  ChatScreen,
  BracketViewScreen,
  LandingScreen,
} from './screens';

export enum ScreenNames {
  LandingScreen = "Landing",
  AuthLoadingScreen = "AuthLoading",
  LoginScreen = "Login",
  RegisterScreen = "Register",
  ForgotPasswordScreen = "ForgotPassword",
  ResetPasswordScreen = "ResetPassword",
  HomeScreen = "Home",
  ProfileScreen = "Profile",
  CreateBracketScreen = "CreateBracket",
  BracketTeamsScreen = "BracketTeams",
  AddTeamScreen = "AddTeam",
  EditTeamScreen = "EditTeam",
  TeamViewScreen = "Team",
  MatchupScreen = "Matchup",
  ChatScreen = "Chat",
  BracketViewScreen = "Bracket",
}

export type RootStackParamList = {
  [ScreenNames.LandingScreen]: undefined;
  [ScreenNames.LoginScreen]: undefined;
  [ScreenNames.RegisterScreen]: undefined;
  [ScreenNames.ForgotPasswordScreen]: undefined;
  [ScreenNames.ResetPasswordScreen]: undefined;
  [ScreenNames.HomeScreen]: undefined;
  [ScreenNames.ProfileScreen]: undefined;
  [ScreenNames.CreateBracketScreen]: {bracketId: string};
  [ScreenNames.BracketTeamsScreen]: {bracketId: string};
  [ScreenNames.AddTeamScreen]: {bracketId: string};
  [ScreenNames.EditTeamScreen]: {bracketId: string; teamId: string};
  [ScreenNames.MatchupScreen]: {bracketId: string; matchupId: string};
  [ScreenNames.TeamViewScreen]: {bracketId: string; teamId: string};
  [ScreenNames.ChatScreen]: {bracketId: string;};
  [ScreenNames.BracketViewScreen]: {bracketId: string;};
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.LandingScreen} screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenNames.LandingScreen} component={LandingScreen} />
        <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={ScreenNames.RegisterScreen} component={RegisterScreen} />
        <Stack.Screen name={ScreenNames.ForgotPasswordScreen} component={ForgotPasswordScreen} />
        <Stack.Screen name={ScreenNames.ResetPasswordScreen} component={ResetPasswordScreen} />
        <Stack.Screen name={ScreenNames.HomeScreen} component={HomeScreen} />
        <Stack.Screen name={ScreenNames.ProfileScreen} component={ProfileScreen} />
        <Stack.Screen name={ScreenNames.CreateBracketScreen} component={CreateBracketScreen} />
        <Stack.Screen name={ScreenNames.BracketTeamsScreen} component={BracketTeamsScreen} />
        <Stack.Screen name={ScreenNames.AddTeamScreen} component={AddTeamScreen} />
        <Stack.Screen name={ScreenNames.EditTeamScreen} component={EditTeamScreen} />
        <Stack.Screen name={ScreenNames.MatchupScreen} component={MatchupScreen} />
        <Stack.Screen name={ScreenNames.TeamViewScreen} component={TeamViewScreen} />
        <Stack.Screen name={ScreenNames.ChatScreen} component={ChatScreen} />
        <Stack.Screen name={ScreenNames.BracketViewScreen} component={BracketViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
