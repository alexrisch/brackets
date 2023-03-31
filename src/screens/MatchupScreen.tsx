import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Appbar, Button, Text, List } from 'react-native-paper';
import { useQuery } from 'react-query';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { QueryKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

interface MatchupData {
  team1Name: string;
  team1Score: number;
  team1Seed: number;
  team1Id: string;

  team2Name: string;
  team2Score: number;
  team2Seed: number;
  team2Id: string;

  canFinalize: boolean;
  canVote: boolean;

  chat: {
    id: string;
    text: string;
    sender: string;
  }[];
}

const fetchMatchupData = async (bracketId: string, matchupId: string): Promise<MatchupData> => {

  return {
    team1Name: 'Team 1',
    team1Score: 0,
    team1Seed: 1,
    team1Id: 'team_1',
    team2Name: 'Team 2',
    team2Score: 1,
    team2Seed: 8,
    team2Id: 'team_2',
    canFinalize: true,
    canVote: true,
    chat: [{
      id: 'mess_1',
      text: 'Message 1',
      sender: 'A'
    }, {
      id: 'mess_2',
      text: 'Message 2',
      sender: 'A'
    }]
  };
};

export const MatchupScreen = () => {
  const { params } = useScreenRoute<ScreenNames.MatchupScreen>();
  const { goBack, navigate } = useAppNav();
  const { bracketId, matchupId } = params ?? {};
  const { data } = useQuery([QueryKeys.BracketMatchup, bracketId, matchupId], () => fetchMatchupData(bracketId, matchupId));
  const {
    team1Name,
    team1Score,
    team1Seed,
    team1Id,
    team2Name,
    team2Score,
    team2Seed,
    team2Id,
    canFinalize,
    canVote,
    chat
  } = data ?? {};

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={'Matchup'} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => navigate(ScreenNames.TeamViewScreen, { bracketId, teamId: team1Id! })}>
                {/* Image component for team 2 */}
                <Text style={styles.teamText}>{team1Seed} {team1Name}</Text>
                <Text style={styles.scoreText}>Score: {team1Score}</Text>
              </TouchableOpacity>
              {canVote && (
                <Button
                  style={styles.voteButton}
                  mode='contained'
                >
                  {translate('matchup_vote_button')}
                </Button>
              )}
            </View>
            <View style={styles.card}>
              <TouchableOpacity onPress={() => navigate(ScreenNames.TeamViewScreen, { bracketId, teamId: team2Id! })}>
                {/* Image component for team 2 */}
                <Text style={styles.teamText}>{team2Seed} {team2Name}</Text>
                <Text style={styles.scoreText}>Score: {team2Score}</Text>
              </TouchableOpacity>
              {canVote && (
                <Button
                  style={styles.voteButton}
                  mode='contained'
                >
                  {translate('matchup_vote_button')}
                </Button>
              )}
            </View>
          </View>
          <View style={styles.chatHeaderRow}>
            <Text style={styles.chatHeaderText}>{translate('matchup_chat_text')}</Text>
            <Button>{translate('matchup_all_button')}</Button>
          </View>
          <FlatList
            data={chat}
            renderItem={({ item }) => {
              return (
                <List.Item
                  key={item.id}
                  title={item.text}
                  left={() => <List.Icon icon={'account-circle'} />}
                />
              )
            }}
          />
        </View>
        {canFinalize && <Button mode='contained'>{translate('matchup_finalize_button')}</Button>}
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
  chatHeaderText: {
    fontSize: 28,
  },
  chatHeaderRow: {
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly'
  },
  card: {
    justifyContent: 'center'
  },
  teamText: {
    marginTop: 15,
  },
  scoreText: {
    marginBottom: 21,
  },
  voteButton: {

  }
});
