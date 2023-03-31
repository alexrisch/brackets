import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Appbar, Button, List, Text } from 'react-native-paper';
import { useQuery } from 'react-query';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { translate } from '../translations';
import { ScreenNames } from '../AppNavigator';
import { useAppNav, useScreenRoute } from '../navigation';
import { QueryKeys } from '../queries/QueryKeys';
import { Team } from '../models/Team';

const getTeam = async (teamId: string): Promise<Team> => {

  return {
    id: teamId,
    name: 'Team Name 1',
    seed: 1,
    description: 'Description',
    history: [{
      matchupId: 'MatchupId',
      team1Name: 'Team Name 1',
      team1Score: 1,
      team2Name: 'Team Name 2',
      team2Score: 0,
      displayScore: true
    }],
    canEdit: true,
  };
}


export const TeamViewScreen: React.FC = () => {
  const { params } = useScreenRoute<ScreenNames.TeamViewScreen>();
  const { teamId, bracketId } = params ?? {};
  const { navigate, goBack } = useAppNav();
  const { data } = useQuery([QueryKeys.BracketTeam, bracketId, teamId], () => getTeam(teamId));

  const { name, seed, description, history, canEdit } = data ?? {};

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={name} />
      </Appbar.Header>
      <View style={styles.container}>
        {/* Team Image */}
        <Text style={styles.seedText}>{translate('team_seed') + seed}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
        <View style={styles.historyHeaderRow}>
          <Text style={styles.historyText}>{translate('team_history')}</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.historyContainer}
          data={history}
          renderItem={({ item }) => {
            return (
              <List.Item title={item.team1Name + ' vs ' + item.team2Name} />
            );
          }}
        />
        {canEdit && <Button onPress={() => navigate(ScreenNames.EditTeamScreen, { teamId, bracketId })}>
          {translate('team_edit')}
        </Button>}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 75,
    paddingHorizontal: 30,
    marginBottom: 50,
  },
  seedText: {
    paddingTop: 27,
    paddingBottom: 13,
    alignSelf: 'center'
  },
  descriptionText: {
    paddingBottom: 40,
    alignSelf: 'center'
  },
  historyContainer: {
    flex: 1,
  },
  historyText: {
    fontSize: 28,
  },
  historyHeaderRow: {
    flexDirection: 'row',
    marginBottom: 13,
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
