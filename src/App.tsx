import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {Users} from './screens/Users';

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: 0, cacheTime: 0, retry: false}},
});

const App = () => {
  return (
    <SafeAreaView style={style.container}>
      <QueryClientProvider client={queryClient}>
        <Users />
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
