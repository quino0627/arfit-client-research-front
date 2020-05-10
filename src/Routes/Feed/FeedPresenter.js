import React from 'react';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';
import QuestCard from '../../Components/QuestCard';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 40px;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox};

  width: 100%;
  max-width: 350px;
`;

const Title = styled.span`
  width: 100%;
  max-width: 350px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 8px;
`;
const Board = styled(Box)`
  margin-bottom: 16px;
  padding: 20px 20px;
`;

export default ({ myQuests }) => {
  return (
    <Wrapper>
      <Title>좋은 하루입니다! 오늘도 화이팅.</Title>
      <Board>
        안녕하세요.
        <br />
        수행한 퀘스트 개수: {myQuests.myQuests.length}
      </Board>
      <Title>기록</Title>
      <Board>
        {myQuests.myQuests.map((quest) => (
          <QuestCard quest={quest} />
        ))}
      </Board>
    </Wrapper>
  );
};
