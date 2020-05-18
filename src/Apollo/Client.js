import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './LocalState';

export default new ApolloClient({
  uri: 'https://arfit-server.herokuapp.com/',
  clientState: {
    defaults,
    resolvers,
  },
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors[0]);
    if (
      graphQLErrors[0].message === 'You need to l0g in to perform this action'
    ) {
      console.log('CAHTAHA');
      localStorage.removeItem('token');
      window.location.reload();
    }

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
