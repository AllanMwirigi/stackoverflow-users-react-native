import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {UserItem} from '../components/UserItem';
import {useGetUsersQuery} from '../hooks/users-query';
import {StackOverflowUser} from '../models/StackOverflowUser';

export function Users() {
  const {data, isError, isLoading} = useGetUsersQuery();

  const renderItem = ({item}: {item: StackOverflowUser}) => (
    <UserItem user={item} />
  );

  const renderData = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="green" />;
    }
    if (isError) {
      return (
        <Text style={styles.errorText}>
          There was an error loading the data
        </Text>
      );
    }
    if (data) {
      return (
        <FlatList
          style={styles.list}
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.user_id.toString()}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>StackOverflow Users</Text>
      {renderData()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  list: {
    marginBottom: 20,
  },
});
