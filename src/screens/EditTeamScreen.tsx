import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button, TextInput } from 'react-native-paper';
import { translate } from '../translations';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useMutation, useQuery } from 'react-query';
import { MutationKeys, QueryKeys } from '../queries/QueryKeys';
import { useScreenRoute } from '../navigation';
import { ScreenNames } from '../AppNavigator';
import { Bracket, BracketTeam } from '../models/Bracket';
import { queryClient } from '../queries/QueryClient';

const editTeam = (edittedTeam: BracketTeam) => {
  console.log('TODO: Edit Team', edittedTeam)
};

export const EditTeamScreen = () => {
  const { goBack } = useNavigation();
  const {params} = useScreenRoute<ScreenNames.EditTeamScreen>();
  const {bracketId, teamId} = params ?? {};
  const {data} = useQuery([QueryKeys.BracketTeam, bracketId], async () => {
    const memBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]) ?? {};
    return memBracket;
  },
  {
    select: (memBracket: Partial<Bracket>) => {
      const foundTeam = memBracket?.teams?.find(it => it.id === teamId);
      return foundTeam;
    },
  });
  const { mutateAsync } = useMutation(
    MutationKeys.BracketTeamEdit,
    async (newTeam: BracketTeam) => editTeam(newTeam),
    {
      onMutate: (newTeam) => {
        const previousBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]);
        // Optimistically update to the new value
        if (previousBracket) {
          queryClient.setQueryData<Bracket>([QueryKeys.BracketView, bracketId], {
            ...previousBracket,
            teams: (previousBracket.teams ?? []).map(it => {
                if (it.id === teamId) {
                  return newTeam;
                }
                return it;
              })
          });
        }
        return { previousBracket }
      },
      onSuccess: () => {
        goBack();
      },
    }
  );
  const [name, setName] = useState<string>(data?.name ?? '');
  const [seed, setSeed] = useState<string>(data?.seed ?? '');
  const [description, setDescription] = useState<string>(data?.description ?? '');

  const onSave = () => {
    // TODO:
    mutateAsync({
      id: teamId,
      name,
      seed,
      description,
    });
  };

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('edit_team_title')} />
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
          <Button mode='contained' onPress={onSave}>{translate('edit_team_save')}</Button>
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
