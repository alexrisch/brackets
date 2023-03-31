import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, FAB, Appbar, List, Portal, Dialog, Button } from 'react-native-paper';
import { useQuery } from 'react-query';
import { v4 } from 'uuid';
import { ScreenNames } from '../AppNavigator';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { useAppNav } from '../navigation';
import { QueryKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

interface HomeScreenBracketDisplay {
  id: string;
  name: string;
  description: string;
  imageSource?: string;
  creator: string;
}

interface DraftBracket {
  id: string;
  name: string;
  description: string;
  imageSource?: string;
}

const mockBrackets: HomeScreenBracketDisplay[] = [{
  id: 'testId',
  name: 'Name',
  description: 'Description',
  imageSource: undefined,
  creator: 'Alex',
}, {
  id: 'testId1',
  name: 'Name',
  description: 'Description',
  imageSource: undefined,
  creator: 'Alex',
}];

export const HomeScreen = () => {
  const { data: hotBrackets } = useQuery(QueryKeys.HotBrackets, () => fetchHotBrackets());
  const { data: activeBrackets } = useQuery(QueryKeys.ActiveBrackets, () => fetchActiveBrackets());
  const { data: recentBrackets } = useQuery(QueryKeys.RecentBrackets, () => fetchRecentBrackets());
  const { data: draftBrackets } = useQuery(QueryKeys.DraftBrackets, () => fetchDraftBrackets());
  const [showNewBracket, setShowNewBracket] = useState(false);
  const { navigate } = useAppNav();

  const fetchHotBrackets = async (): Promise<HomeScreenBracketDisplay[]> => {
    // your code to fetch hot brackets
    return mockBrackets;
  };

  const fetchActiveBrackets = async (): Promise<HomeScreenBracketDisplay[]> => {
    // your code to fetch active brackets
    return mockBrackets;
  };

  const fetchRecentBrackets = async (): Promise<HomeScreenBracketDisplay[]> => {
    // your code to fetch recent brackets
    return mockBrackets;
  };

  const fetchDraftBrackets = async (): Promise<DraftBracket[]> => {
    // your code to fetch recent brackets
    return mockBrackets;
  };


  return (
    <ScreenWrapper>
      <Appbar.Header>
        <Appbar.Content title={translate('home_title')} />
        <Appbar.Action icon="account" onPress={() => navigate(ScreenNames.ProfileScreen)} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant='headlineLarge'>{translate('home_hot_brackets')}</Text>
        {/* Your list component for hot brackets */}
        <FlatList
          scrollEnabled={false}
          data={hotBrackets ?? []}
          renderItem={({ item: bracket }) => (
            <List.Item
              onPress={() => navigate(ScreenNames.BracketViewScreen, { bracketId: bracket.id })}
              title={bracket.name}
              description={bracket.description}
              titleNumberOfLines={1}
              titleEllipsizeMode={'tail'}
            />
          )}
        />
        <Text variant='headlineLarge'>{translate('home_active_brackets')}</Text>
        <FlatList
          scrollEnabled={false}
          data={activeBrackets ?? []}
          renderItem={({ item: bracket }) => (
            <List.Item
              onPress={() => navigate(ScreenNames.BracketViewScreen, { bracketId: bracket.id })}
              title={bracket.name}
              description={bracket.description}
              titleNumberOfLines={1}
              titleEllipsizeMode={'tail'}
            />
          )} />
        <Text variant='headlineLarge'>{translate('home_recent_brackets')}</Text>
        <FlatList
          scrollEnabled={false}
          data={recentBrackets ?? []}
          renderItem={({ item: bracket }) => (
            <List.Item
              onPress={() => navigate(ScreenNames.BracketViewScreen, { bracketId: bracket.id })}
              title={bracket.name}
              description={bracket.description}
              titleNumberOfLines={1}
              titleEllipsizeMode={'tail'}
            />
          )} />
        <Portal>
          <Dialog visible={showNewBracket} onDismiss={() => setShowNewBracket(false)}>
            <Dialog.Title>{translate('home_new_bracket')}</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">{translate('home_select_from_draft')}</Text>
              <FlatList
                scrollEnabled={false}
                data={draftBrackets ?? []}
                renderItem={({ item: bracket }) => <List.Item onPress={() => {
                  setShowNewBracket(false)
                  navigate(ScreenNames.BracketViewScreen, { bracketId: bracket.id })
                }}
                  title={bracket.name}
                  description={bracket.description}
                  titleNumberOfLines={1}
                  titleEllipsizeMode={'tail'}
                />}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                setShowNewBracket(false)
                navigate(ScreenNames.CreateBracketScreen, {bracketId: v4()})
              }
              }>
                {translate('home_new')}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setShowNewBracket(true)}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 25,
    bottom: 50,
  },
});
