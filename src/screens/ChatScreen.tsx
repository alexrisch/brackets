import React from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { useQuery } from 'react-query';
import { QueryKeys } from '../queries/QueryKeys';
import { translate } from '../translations';

interface Message {
  id: string;
  author: string;
  text: string;
}

export const ChatScreen: React.FC = () => {
  const bracketId = 'TODO:';
  const { data: messages, isLoading } = useQuery<Message[]>(
    [QueryKeys.BracketChat, bracketId],
    async () => {
      return []
      // Implement logic to fetch bracket messages using bracketId
    }
  );

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.author}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>{isLoading ? translate('chat_loading') : translate('chat_no_messages')}</Text>}
      />
      <TextInput placeholder={translate('chat_write_message')} />
    </View>
  );
};
