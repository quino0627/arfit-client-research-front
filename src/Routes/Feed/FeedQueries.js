import { gql } from 'apollo-boost';

const ALL = 'ALL';
const FULFILLED = 'FULFILLED';
const UNFULFILLED = 'UNFUFILLED';

export const GET_MY_QUESTS = gql`
  query myQuests($fulfill: FULFILLTYPES) {
    myQuests(fulfill: $fulfill) {
      exercise {
        name
      }
      isDone
      sets
      reps
      weight
      feel
      when
    }
  }
`;
