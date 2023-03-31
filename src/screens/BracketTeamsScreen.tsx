import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useQuery } from 'react-query';
import { Appbar, Button, FAB, List } from 'react-native-paper';
import { translate } from '../translations';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { QueryKeys } from '../queries/QueryKeys';

export const BracketTeamsScreen: React.FC = () => {
  const { navigate, goBack } = useAppNav();
  const {params} = useScreenRoute<ScreenNames.BracketTeamsScreen>();
  const {bracketId} = params ?? {};
  const { data: teams } = useQuery([QueryKeys.BracketView, bracketId], async () => {
    // const response = await fetch('https://api.example.com/teams');
    // return response.json();
    return [
      {
        id: '1',
        name: 'Name',
        description: 'description',
      }
    ];
  });

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={translate('create_bracket_teams')} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <List.Section>
            {teams?.map((team) => (
              <List.Item
                onPress={() => navigate(ScreenNames.EditTeamScreen, { bracketId, teamId: team.id })}
                title={team.name}
                description={team.description}
                titleNumberOfLines={1}
                titleEllipsizeMode={'tail'}
              />
            ))}
          </List.Section>
        </View>
        <Button
          style={styles.fab}
          mode={'contained'}
          onPress={() => navigate(ScreenNames.AddTeamScreen, { bracketId })}
        >
          {translate('create_bracket_add_team_button')}
        </Button>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  listContainer: {
    flex: 1,
  },
  fab: {
    marginBottom: 50,
  },
});
