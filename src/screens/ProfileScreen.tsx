import React from 'react';
import { FlatList, Linking, StyleSheet, View } from 'react-native';
import { Text, TextInput, Button, Appbar, List, Switch } from 'react-native-paper';
import { useMutation, useQuery } from 'react-query';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { NotificationPreferences, ProfileData } from '../models/Profile';
import { useAppNav } from '../navigation';
import { queryClient } from '../queries/QueryClient';
import { MutationKeys, QueryKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

const fetchProfileScreenData = async (): Promise<ProfileData> => {
  // TODO:
  // your code to fetch the user display name
  return {
    displayName: 'BigOlAl',
    notificationPreferences: [{
      text: 'Notification',
      channel: 'NOTIFICATION_CHANNEL_EXAMPLE',
      on: true,
      type: 'PUSH',
    }],
    links: [{
      link: 'https://google.com',
      display: translate('profile_privacy_policy'), 
    }, {
      link: 'https://placekitten.com',
      display: translate('profile_terms_of_use'), 
    }],
  };
};

const updateDisplayName = async (newName: string) => {
  console.log('TODO: updateDisplayName');
};

const handleNotificationPreferenceChange = async (item: NotificationPreferences, newValue: boolean) => {
  console.log('TODO: handleNotificationPreferenceChange');
};

export const ProfileScreen = () => {
  const { data, refetch } = useQuery(QueryKeys.Profile, () => fetchProfileScreenData());
  const {mutateAsync: mutateName} = useMutation(MutationKeys.ProfileDisplayName, updateDisplayName, {
    onMutate: (newName) => {
      const previousProfile = queryClient.getQueryData<ProfileData>(QueryKeys.Profile);

      // Optimistically update to the new value
      if (previousProfile) {
        queryClient.setQueryData<ProfileData>(QueryKeys.Profile, {
          ...previousProfile,
          displayName: newName,
        });
      }

      return { previousProfile }
    },
  });
  const {mutateAsync: mutateNotificationPref} = useMutation(MutationKeys.ProfileDisplayName, ({
    item,
    newValue,
  } : {
    item: NotificationPreferences,
    newValue: boolean,
  }) => handleNotificationPreferenceChange(item, newValue), {
    onMutate: ({item: updatedPref, newValue}) => {
      const previousProfile = queryClient.getQueryData<ProfileData>(QueryKeys.Profile);

      // Optimistically update to the new value
      if (previousProfile) {
        queryClient.setQueryData<ProfileData>(QueryKeys.Profile, {
          ...previousProfile,
          notificationPreferences: previousProfile.notificationPreferences.map(it => {
            if (it.channel === updatedPref.channel && it.type === updatedPref.type) {
              return {
                ...updatedPref,
                on: newValue,
              };
            }
            return it;
          }),
        });
      }
      return { previousProfile }
    },
    onSettled: () => {
      refetch();
    }
  });
  const {displayName, notificationPreferences, links} = data ?? {};
  const { goBack, navigate } = useAppNav();


  const handleLogout = async () => {
    // TODO:
    // your code to fetch the user display name
    navigate(ScreenNames.LoginScreen);
  };

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={translate('profile_title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput
          label={translate('profile_display_name')}
          value={displayName}
          onChangeText={mutateName}
          style={styles.displayName}
        />
        <Text style={styles.sectionTitle}>{translate('profile_notification_preferences')}</Text>
        <FlatList
          data={notificationPreferences}
          renderItem={({item}) => (
            <List.Item
              title={item.text}
              right={() => <Switch value={item.on} onChange={(e) => mutateNotificationPref({item, newValue: e.nativeEvent.value})} />}
            />
          )}
          keyExtractor={item => item.channel + item.type}
        />
        <View style={styles.footerContainer}>
          {links?.map(it => <Button key={it.link} style={styles.link} onPress={() => Linking.openURL(it.link)}>{it.display}</Button>)}
          <Button mode='outlined' style={styles.logoutButton} onPress={handleLogout}>{translate('profile_logout')}</Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  displayName: {
    marginBottom: 50,
  },
  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  logoutButton: {
    marginBottom: 50,
    marginTop: 30,
  },
  link: {
  }
});

export default ProfileScreen;
