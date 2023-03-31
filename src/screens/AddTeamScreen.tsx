import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { translate } from '../translations';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useMutation } from 'react-query';
import { MutationKeys, QueryKeys } from '../queries/QueryKeys';
import { Bracket, BracketTeam } from '../models/Bracket';
import { queryClient } from '../queries/QueryClient';
import { useScreenRoute } from '../navigation';
import { ScreenNames } from '../AppNavigator';
import { v4 } from 'uuid';

const addTeam = (newTeam: BracketTeam) => {
  console.log('TODO: Add Team', newTeam)
};

export const AddTeamScreen = () => {
  const { goBack } = useNavigation();
  const { params } = useScreenRoute<ScreenNames.AddTeamScreen>();
  const { bracketId } = params ?? {};
  const { mutateAsync } = useMutation(
    MutationKeys.BracketTeamAdd,
    async (newTeam: BracketTeam) => addTeam(newTeam),
    {
      onMutate: (newTeam) => {
        const previousBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]);

        // Optimistically update to the new value
        if (previousBracket) {
          queryClient.setQueryData<Bracket>([QueryKeys.BracketView, bracketId], {
            ...previousBracket,
            teams: [
              ...(previousBracket.teams ?? []),
              newTeam,
            ]
          });
        }
        return { previousBracket }
      },
      onSuccess: () => {
        goBack();
      },
    }
  );

  const [name, setName] = useState('');
  const [seed, setSeed] = useState('');
  const [description, setDescription] = useState('');


  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('bracket_teams_add_button')} />
      </Appbar.Header>
      <View style={styles.container}>
        {/* TODO: Image upload component */}
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} label={translate('team_name')} value={name} onChangeText={setName} />
          <TextInput style={styles.input} label={translate('team_seed')} value={seed} onChangeText={setSeed} />
          <TextInput style={styles.descriptionInput} label={translate('team_description')} value={description} onChangeText={setDescription} />
        </View>
        <View style={styles.buttonRow}>
          <Button mode='outlined' onPress={goBack}>{translate('add_team_cancel')}</Button>
          <Button mode='contained' onPress={() => mutateAsync({
            id: v4(),
            name,
            description,
            seed,
          })}>{translate('add_team_add')}</Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 30,
    marginBottom: 50,
    marginTop: 30,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 30,
  },
  descriptionInput: {
    paddingBottom: 50,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
  }
});
