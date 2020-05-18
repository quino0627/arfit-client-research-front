import React from 'react';
import FeedPresenter from './FeedPresenter';
import { useQuery } from '@apollo/react-hooks';
import { GET_MY_QUESTS } from './FeedQueries';

export default () => {
  const { loading, error, data: myQuests } = useQuery(GET_MY_QUESTS, {
    variables: {
      fulfill: 'FULFILLED',
    },
  });

  if (loading) return null;
  if (error) {
    localStorage.removeItem('token');
    window.location.reload();
  }
  return <FeedPresenter loading={loading} myQuests={myQuests} error={error} />;
};
