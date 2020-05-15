import { gql } from 'apollo-boost';
export const GET_QUEST_BY_CODE = gql`
  query getTodayQuestByCode($code: String!) {
    getTodayQuestByCode(code: $code) {
      id
      exercise {
        name
        caution
        tips
      }
      sets
      reps
      weight
    }
  }
`;

export const SUBMIT_QUEST = gql`
  mutation playQuest($id: Int!, $feel: Int!, $isDone: Boolean!) {
    playQuest(id: $id, feel: $feel, isDone: $isDone)
  }
`;
