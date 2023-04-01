import React, { useCallback, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useQuery } from 'react-query';
import { Appbar, Text, useTheme } from 'react-native-paper';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav, useScreenRoute } from '../navigation';
import { QueryKeys } from '../queries/QueryKeys';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Bracket, BracketMatchup, BracketTeam } from '../models/Bracket';
import { ScreenNames } from '../AppNavigator';

const teamCount = 8;

const getMatchups = (index: number): BracketMatchup[] => {
  const matchups: BracketMatchup[] = [];
  for (let i = 0; i < Math.floor(teamCount / (2 * (index + 1))); i++) {
    matchups.push({
      id: String(i),
      team1Id: String(i + 1),
      team2Id: String(teamCount - i),
      completed: false,
    })
  }

  return matchups;
};

const getTeams = (): Bracket['teams'] => {
  const teams: Bracket['teams'] = [];
  for (let i = 0; i < teamCount; i++) {
    const index = i + 1;
    teams.push({
      id: String(index),
      name: `Team ${String(index)}`,
      seed: String(index),
      description: 'Placeholder',
      eliminated: false,
    });
  }

  return teams;
};

const getBracketInfo = (): Bracket => {
  let columns = 1;
  let val = teamCount;

  while (val !== 1) {
    columns++;
    val = val / 2;
  }

  const columnInfo: Bracket['columns'] = [];
  for (let i = 0; i < columns; i++) {
    columnInfo.push({
      title: String(i),
      matchups: getMatchups(i),
    });
  }

  return {
    id: 'TEST_ID',
    name: 'Placeholder Name',
    description: "Placeholder Description",
    columns: columnInfo,
    creator: '1233457',
    canEdit: false,
    teams: getTeams(),
  };
};

const HEIGHT = 48;
const WIDTH = 88;

export const BracketViewScreen: React.FC = () => {
  const { colors } = useTheme();
  const { primary } = colors;
  const { params } = useScreenRoute<ScreenNames.BracketViewScreen>();
  const { bracketId } = params ?? {};
  const { goBack, navigate } = useAppNav();
  const { data: bracketInfo, isLoading } = useQuery<Bracket>(
    [QueryKeys.BracketChat, bracketId],
    async () => {
      // Implement logic to fetch bracket messages using bracketId
      return getBracketInfo();
    }
  );

  const bracketTeamCount = useMemo(() => {
    return bracketInfo?.teams?.length ?? 0;
  }, [bracketInfo?.teams?.length]);

  const columnsCount = useMemo(() => {
    return bracketInfo?.columns?.length ?? 1;
  }, [bracketInfo?.columns?.length]);

  const teamsMapping = useMemo(() => {
    const mapping: Record<string, BracketTeam> = {};
    
    for (const team of bracketInfo?.teams ?? []) {
      mapping[team.id] = team;
    }

    return mapping;
  }, [bracketInfo?.teams]);

  const scrollRef = useRef<FlatList<Bracket['columns'][number]>>(null);
  const headerScrollRef = useRef<FlatList<Bracket['columns'][number]>>(null);
  const [scrollViewOffset, setScrollViewOffset] = useState(0);

  const onCategoryHeaderTop = (index: number) => {
    scrollRef.current?.scrollToOffset({
      animated: true,
      offset: index * WIDTH - 1,
    })
  };

  const onScrollCallback = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    if (headerScrollRef) {
      headerScrollRef.current?.scrollToOffset({
        animated: false,
        offset: x,
      })
    }
    setScrollViewOffset(x);
  }, [headerScrollRef, setScrollViewOffset]);

  const onMatchupPress = useCallback((matchupId: string) => {
    if (bracketId) {
      navigate(ScreenNames.MatchupScreen, {
        bracketId,
        matchupId,
      })
    }
  }, [navigate, bracketId]);

  const onTeamPress = useCallback((teamId: string) => {
    if (bracketId) {
      navigate(ScreenNames.TeamViewScreen, {
        bracketId,
        teamId,
      })
    }
  }, [navigate, bracketId]);

  const totalHeight = (bracketTeamCount * 2 - 1) * HEIGHT;
  const totalWidth = columnsCount * WIDTH + 300;

  const snapToOffsets = useMemo(() => {
    const offsets: number[] = [];

    for (let i = 0; i < columnsCount; i++) {
      offsets[i] = i * WIDTH;
    }
    return offsets;
  }, [WIDTH, columnsCount]);

  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => goBack()} />
        <Appbar.Content title={bracketInfo?.name} />
        <Appbar.Action icon="dots-vertical" onPress={() => { }} />
      </Appbar.Header>
      <FlatList
        data={bracketInfo?.columns ?? []}
        decelerationRate={'fast'}
        scrollEnabled={false}
        // snapToInterval={WIDTH}
        style={styles.titleRow}
        showsHorizontalScrollIndicator={false}
        ref={headerScrollRef}
        horizontal
        contentContainerStyle={styles.titleContainer}
        renderItem={({ item: it, index: idx }) => {
          return (
            <TouchableOpacity onPress={() => onCategoryHeaderTop(idx)}>
              <View style={styles.titleItemWrapper}>
                <Text style={styles.titleItemText}>{it.title}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <View style={{ width: totalWidth - 300, marginLeft: 20 }}>
        <View style={[{
          backgroundColor: primary,
          left: Math.max(Math.min(scrollViewOffset - WIDTH, columnsCount * WIDTH / 2), 0),
        }, styles.horizontalLine]} />
      </View>
      <ScrollView style={{ height: totalHeight }}>
        <>
          <FlatList
            ref={scrollRef}
            horizontal
            scrollEnabled={false}
            snapToOffsets={snapToOffsets}
            decelerationRate={'fast'}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.titleContainer}
            style={styles.columnList}
            onScroll={onScrollCallback}
            data={bracketInfo?.columns}
            renderItem={({ item: it, index: idx }) => {
              const spaces = Math.pow(2, idx) - 1;
              const spaceArr = new Array(spaces).fill(1);
              const isLast = idx === columnsCount - 1;
              return (
                <View key={it.title} style={styles.columnWrapper}>
                  <View>
                    {it.matchups.map(matchup => (
                      <View key={matchup.id}>
                        <View>
                          {spaceArr.map((_, idx) => (
                            <View key={idx} style={styles.space} />
                          ))}
                        </View>
                        <TouchableOpacity onPress={() => onTeamPress(matchup.team1Id)}>
                          <View style={[styles.matchupTeam1Wrapper, { borderBottomColor: primary }]}>
                            <Text style={styles.teamText}>{teamsMapping[matchup.team1Id].name}</Text>
                          </View>
                        </TouchableOpacity>
                        {!isLast && (<>
                          <TouchableOpacity onPress={() => onMatchupPress(matchup.id)}>
                            {spaceArr.map((_, idx) => {
                              return (
                                <View key={idx} style={[{
                                  borderRightColor: primary,
                                }, styles.verticalBracketLine]} />
                              );
                            })}
                            <View style={[styles.filledSpace, {
                              borderRightColor: primary,
                            }]} />
                            {spaceArr.map((_, idx) => {
                              return (
                                <View key={idx} style={[{
                                  borderRightColor: primary,
                                }, styles.verticalBracketLine]} />
                              );
                            })}
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() => onTeamPress(matchup.team2Id)}>
                            <View style={[styles.matchupTeam2Wrapper, {
                              borderBottomColor: primary,
                              borderRightColor: primary,
                            }]}>
                              <Text style={styles.teamText}>{teamsMapping[matchup.team2Id]?.name}</Text>
                            </View>
                          </TouchableOpacity>
                          {spaceArr.map((_, idx) => (
                            <View key={idx} style={styles.space} />
                          ))}
                          <View style={styles.space} />
                        </>)
                        }
                      </View>
                    ))}
                  </View>
                </View>
              );
            }}
          />
        </>
      </ScrollView>
    </ScreenWrapper >
  );
};

const styles = StyleSheet.create({
  titleRow: {
    paddingLeft: 20
  },
  titleContainer: {
    // flexDirection: 'row',
    // width: totalWidth 
  },
  titleItemWrapper: {
    borderBottomWidth: 1,
    paddingBottom: 12,
    width: WIDTH
  },
  titleItemText: {
    textAlign: 'center',
  },
  columnList: {
    paddingLeft: 20,
    paddingRight: 300
  },
  columnWrapper: {
    width: WIDTH
  },
  horizontalLine: {
    width: WIDTH,
    height: 1
  },
  verticalBracketLine: {
    height: HEIGHT,
    borderRightWidth: 1,
  },
  space: {
    height: HEIGHT,
  },
  filledSpace: {
    height: HEIGHT,
    borderRightWidth: 1,
  },
  matchupTeam1Wrapper: {
    height: HEIGHT,
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  matchupTeam2Wrapper: {
    height: HEIGHT,
    borderBottomWidth: 1,
    justifyContent: 'center',
    borderRightWidth: 1,
  },
  teamText: {
    textAlignVertical: 'center',
    textAlign: 'center'
  }
});
