import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Button, Text, List, Appbar, } from 'react-native-paper';
import { translate } from '../translations';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { ScreenNames } from '../AppNavigator';
import { useQuery } from 'react-query';
import { QueryKeys } from '../queries/QueryKeys';
import { Bracket } from '../models/Bracket';
import { queryClient } from '../queries/QueryClient';

export const CreateBracketScreen: React.FC = () => {
  const { navigate, goBack } = useAppNav();
  const {params} = useScreenRoute();
  const {bracketId = ''} = params ?? {};
  const {data} = useQuery<Partial<Bracket>>([QueryKeys.BracketView, bracketId], async () => {
    return queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]) ?? {};
  });

  const {teams, name, description, imageSource, category} = data ?? {};

  const onEditName = (edittedName: string) => {
    const previousBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]);
    // Optimistically update to the new value
    if (previousBracket) {
      queryClient.setQueryData<Bracket>([QueryKeys.BracketView, bracketId], {
        ...previousBracket,
        name: edittedName,
      });
    }
  };

  const onEditDescription = (edditedDescription: string) => {
    const previousBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]);
    // Optimistically update to the new value
    if (previousBracket) {
      queryClient.setQueryData<Bracket>([QueryKeys.BracketView, bracketId], {
        ...previousBracket,
        description: edditedDescription,
      });
    }
  };

  const onEditCategory = (newCategory: string) => {
    const previousBracket = queryClient.getQueryData<Bracket>([QueryKeys.BracketView, bracketId]);
    // Optimistically update to the new value
    if (previousBracket) {
      queryClient.setQueryData<Bracket>([QueryKeys.BracketView, bracketId], {
        ...previousBracket,
        category: newCategory,
      });
    }
  };

  const onAddTeam = () => {
    navigate(ScreenNames.AddTeamScreen, {bracketId })
  };

  const onSaveDraft = () => {
    // TODO://
    goBack();
  };

  const onSubmit = () => {
    // TODO://
    goBack();
    navigate(ScreenNames.BracketViewScreen, {bracketId});
  };

  const memTeams = useMemo(() => {
    return teams?.slice(0, 3);
  }, [teams]);

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={translate('create_bracket_title')} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput style={styles.inputs} label={translate('create_bracket_name')} value={name} onChangeText={onEditName} />
          <TextInput style={styles.descriptionInput} label={translate('create_bracket_description')} value={description} onChangeText={onEditDescription} />
          <TextInput style={styles.inputs} label={translate('create_bracket_category')} value={category} onChangeText={onEditCategory} />
          <View style={styles.teamHeaderRow}>
            <Text variant='headlineSmall'>{translate('create_bracket_teams')}</Text>
            {(teams?.length ?? 0) >= 2 && <Button onPress={() => navigate(ScreenNames.BracketTeamsScreen, {bracketId})}>
              {translate('create_bracket_all_button')}
            </Button>}
          </View>
          <View
            style={{flexShrink: 1}}
          >
            <FlatList
              data={memTeams}
              renderItem={({ item: team }) => (
                <List.Item
                  onPress={() => navigate(ScreenNames.EditTeamScreen, { bracketId, teamId: team.id })}
                  title={team.name}
                  description={team.description}
                  titleNumberOfLines={1}
                  titleEllipsizeMode={'tail'}
                />
              )}
            />
            <Button style={styles.addButton} icon="plus" mode="contained" onPress={onAddTeam}>
              {translate('create_bracket_add_team_button')}
            </Button>
          </View>
        </View>
        <View style={styles.buttons}>
          <Button onPress={onSaveDraft}>
            {translate('create_bracket_save_draft_button')}
          </Button>
          <Button mode="contained" onPress={onSubmit}>
            {translate('create_bracket_submit_button')}
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  addButton: {
    width: 100,
    alignSelf: 'center'
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  content: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 50,
  },
  inputs: {
    marginBottom: 30,
  },
  descriptionInput: {
    marginBottom: 30,
    paddingBottom: 50,
  },
  teamHeaderRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
});
