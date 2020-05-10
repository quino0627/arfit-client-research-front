import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
  uri: 'https://arfit-server.herokuapp.com/',
  clientState: {
    defaults,
    resolvers,
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  },
  // headers: {
  //   Authorization: `Bearer ${token}`,
  // },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    });
  },
});
