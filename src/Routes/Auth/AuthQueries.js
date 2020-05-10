import { gql } from 'apollo-boost';

export const LOG_IN = gql`
  mutation confirmSecret($secret: String!) {
    confirmSecret(secret: $secret)
  }
`;

export const LOCAL_LOG_IN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
