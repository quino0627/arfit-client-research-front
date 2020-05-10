import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Box = styled.div`
  ${(props) => props.theme.whiteBox};
  background-color: ${(props) =>
    props.isDone ? props.theme.lightBlueColor : props.theme.lightRedColor};
  font-size: 14px;
  color: white;
  width: 100%;
  max-width: 310px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid
    ${(props) => (props.isDone ? props.theme.blueColor : props.theme.redColor)};
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const Row = styled.div`
  padding: 8px;
  margin: auto auto auto 0;
  &:first-child {
    font-size: 12px;
  }
  &:last-child {
    padding-top: 12px;
    margin: auto 0 auto auto;
  }
  &:not(:last-child) {
    padding-bottom: 4px;
  }
`;

const ExerciseTitle = styled.span`
  font-weight: 700;
  font-size: 16px;
`;

const QuestCard = ({ quest }) => {
  return (
    <Box isDone={quest.isDone}>
      <Row>
        <ExerciseTitle>{quest.exercise[0].name}</ExerciseTitle>
      </Row>
      <Row>{moment(1 * quest.when).format('YYYY-MM-DD')}</Row>
      <Row>
        {quest.sets} 세트 | {quest.reps} 회 씩 | {quest.weight} kg, 체감 강도:
        {quest.feel}
      </Row>
    </Box>
  );
};

export default QuestCard;
