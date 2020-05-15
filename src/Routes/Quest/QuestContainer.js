import React, { useState } from 'react';
import queryString from 'query-string';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import { withRouter } from 'react-router-dom';
import QuestPresenter from './QuestPresenter';
import { GET_QUEST_BY_CODE, SUBMIT_QUEST } from './QuestQueries';

export default withRouter(({ location, history }) => {
  const [done, setDone] = useState(false);
  const [feel, setFeel] = useState(5);
  const { code } = queryString.parse(location.search);
  const { loading, error, data: getTodayQuestByCode } = useQuery(
    GET_QUEST_BY_CODE,
    {
      variables: {
        code,
      },
    }
  );

  const [submitQuestMutation] = useMutation(SUBMIT_QUEST);

  const handleChange = (_, value) => {
    setFeel(value);
  };

  const doneQuest = () => {
    setDone(!done);
  };

  const submitQuestSuccess = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { playQuest: result },
      } = await submitQuestMutation({
        variables: {
          id: getTodayQuestByCode.getTodayQuestByCode.id,
          feel,
          isDone: true,
        },
      });
      if (result) {
        toast.success('퀘스트 수행 완료!', { autoClose: 3000 });
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      toast.error('완료할 수 없습니다. 잠시 후 다시 시도하세요.');
    }
  };
  const submitQuestFail = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { playQuest: result },
      } = await submitQuestMutation({
        variables: {
          id: getTodayQuestByCode.getTodayQuestByCode.id,
          feel,
          isDone: false,
        },
      });
      if (result) {
        toast.success('퀘스트 수행 완료!', { autoClose: 3000 });
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      toast.error('완료할 수 없습니다. 잠시 후 다시 시도하세요.');
    }
  };

  return (
    <QuestPresenter
      getTodayQuestByCode={getTodayQuestByCode}
      feel={feel}
      done={done}
      loading={loading}
      error={error}
      doneQuest={doneQuest}
      submitQuestSuccess={submitQuestSuccess}
      submitQuestFail={submitQuestFail}
      handleChange={handleChange}
    />
  );
});
