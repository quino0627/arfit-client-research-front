import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Button from '../../Components/Button';
import Slider from '@material-ui/core/Slider';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { feelTitle, feelSub } from '../../feel';
import { ToastType, toast } from 'react-toastify';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 40px;
`;

const Title = styled.span`
  width: 100%;
  max-width: 350px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 8px;
`;

const SemiTitle = styled.span`
  width: 100%;
  max-width: 350px;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox};
  width: 100%;
  max-width: 350px;
  padding: 40px 10px 20px 10px;
`;

const Board = styled(Box)`
  margin-bottom: 16px;
  padding: 20px 20px;
  line-height: 20px;
`;

const WordBox = styled.div``;

const GET_QUEST_BY_CODE = gql`
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

const SUBMIT_QUEST = gql`
  mutation playQuest($id: Int!, $feel: Int!, $isDone: Boolean!) {
    playQuest(id: $id, feel: $feel, isDone: $isDone)
  }
`;

// code 파라미터는 colorfull
// 서버로 colorfull을 보냄
// colorfull은 해당하는 일자의 "운동 id" 와 매치됨
// code와 유저 정보를 받아서 데이트도 겹치는 퀘스트 하나를 리턴함
const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = withStyles({
  root: {
    color: '#3880ff',
    height: 2,
    padding: '15px 0',
  },
  thumb: {
    height: 28,
    width: 28,
    backgroundColor: '#fff',
    boxShadow: iOSBoxShadow,
    marginTop: -14,
    marginLeft: -14,
    '&:focus, &:hover, &$active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 11px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 2,
  },
  rail: {
    height: 2,
    opacity: 0.5,
    backgroundColor: '#bfbfbf',
  },
  mark: {
    backgroundColor: '#bfbfbf',
    height: 8,
    width: 1,
    marginTop: -3,
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'currentColor',
  },
})(Slider);

export default withRouter(({ history, location }) => {
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

  if (loading) return 'loading';
  if (error) return <Wrapper>해당 기구의 퀘스트를 모두 완료했습니다.</Wrapper>;
  if (!done)
    return (
      <Wrapper>
        <Title>
          {getTodayQuestByCode.getTodayQuestByCode.exercise[0].name}
        </Title>
        <Board>
          <SemiTitle>✅운동법</SemiTitle>
          <br />
          <WordBox>
            {getTodayQuestByCode.getTodayQuestByCode.exercise[0].tips
              .split('\n')
              .map((line) => {
                return (
                  <span>
                    ▶️{line}
                    <br />
                  </span>
                );
              })}
          </WordBox>

          <br />
          <SemiTitle>✅주의사항</SemiTitle>
          <br />
          <WordBox>
            {getTodayQuestByCode.getTodayQuestByCode.exercise[0].caution
              .split('\n')
              .map((line) => {
                return (
                  <span>
                    ▶️{line}
                    <br />
                  </span>
                );
              })}
          </WordBox>
        </Board>
        <Board>
          <Title>
            1️⃣{getTodayQuestByCode.getTodayQuestByCode.weight}kg으로
            <br />
          </Title>
          <Title>
            2️⃣{getTodayQuestByCode.getTodayQuestByCode.reps}회씩
            <br />
          </Title>
          <Title>
            3️⃣{getTodayQuestByCode.getTodayQuestByCode.sets}세트 반복하세요!
            <br />
          </Title>
          <br />
          <Button text="운동 시작하기!" thick onClick={doneQuest} />
        </Board>
      </Wrapper>
    );

  if (done)
    return (
      <Wrapper>
        <Title>운동은 어떠셨나요?</Title>
        <Box>
          <Title>{feelTitle[feel]}</Title>
          <br />
          <SemiTitle>{feelSub[feel]}</SemiTitle>
        </Box>
        <Box>
          <IOSSlider
            defaultValue={feel}
            step={1}
            marks
            min={1}
            max={10}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="on"
            onChange={handleChange}
            value={feel}
          />
          <Button
            text="운동 끝!"
            thick
            color="blue"
            mb
            onClick={submitQuestSuccess}
          />
          <br />
          <Button
            text="운동하다가 중간에 실패했어요.."
            thick
            color="red"
            onClick={submitQuestFail}
          />
        </Box>
      </Wrapper>
    );
});
