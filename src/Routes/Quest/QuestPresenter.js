import React from 'react';
import styled from 'styled-components';
import { Card, Button as AntButton, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import { feelSub, feelTitle } from '../../feel';
import {
  OneEmj,
  TwoEmj,
  ThreeEmj,
  Money,
  Salad,
  Coffee as Shake,
  Check,
  Caution,
} from '../../Emojies';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 80px;
  margin-bottom: 40px;
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
    marginBottom: '30px',
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

export default ({
  getTodayQuestByCode,
  feel,
  doneQuest,
  done,
  submitQuestSuccess,
  submitQuestFail,
  handleChange,
  loading,
  error,
}) => {
  if (loading)
    return (
      <Wrapper className="spinnerWrapper">
        <Spin tip="로딩중..." />
      </Wrapper>
    );
  if (error) return <Wrapper>해당 기구의 퀘스트를 모두 완료했습니다.</Wrapper>;
  if (!done)
    return (
      <div className="marginSide underHeader">
        <Card
          title={getTodayQuestByCode.getTodayQuestByCode.exercise[0].name}
          className="marginBottom"
        >
          <ul>
            {getTodayQuestByCode.getTodayQuestByCode.exercise[0].tips
              .split('\n')
              .map((line) => {
                return (
                  <li>
                    <Check />
                    {line}
                  </li>
                );
              })}
          </ul>

          <br />

          <Title level={4}>
            <Caution />
            조심하세요
            <Caution />
          </Title>
          <ul>
            {getTodayQuestByCode.getTodayQuestByCode.exercise[0].caution
              .split('\n')
              .map((line) => {
                return <li>{line}</li>;
              })}
          </ul>
        </Card>
        <Card className="marginBottom">
          <Title level={4}>수행 내용</Title>
          <ul>
            <li>
              <OneEmj />
              {getTodayQuestByCode.getTodayQuestByCode.reps}회씩
            </li>
            <li>
              <TwoEmj />
              {getTodayQuestByCode.getTodayQuestByCode.sets}세트
            </li>
            <li>
              <ThreeEmj />
              {getTodayQuestByCode.getTodayQuestByCode.weight}kg으로 반복하기
            </li>
          </ul>
          <br />
          <Title level={4}>
            보상
            <Money />
          </Title>
          3일 이상 수행 완료 시, <br />
          닭가슴살 샐러드
          <Salad /> 와 프로틴 쉐이크!
          <Shake />
        </Card>

        <br />
        <AntButton
          block
          type="primary"
          size="large"
          onClick={doneQuest}
          className=" marginBottomBig"
        >
          운동 시작하기!
        </AntButton>
      </div>
    );

  if (done)
    return (
      <div className="marginSide underHeader">
        <Card title="운동은 어떠셨나요?" className="textCenter">
          <Title level={2}>{feelTitle[feel - 1]}</Title>
          <Title level={4}>{feelSub[feel - 1]}</Title>
        </Card>
        <Card>
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
          <AntButton
            onClick={submitQuestFail}
            block
            type="primary"
            size="large"
            className="marginBottomBig"
          >
            끝까지 다 했어요!
          </AntButton>
          <AntButton
            onClick={submitQuestFail}
            block
            type="primary"
            danger
            size="large"
            className="marginTopBig"
          >
            힘들어서 중간에 멈췄어요.
          </AntButton>
        </Card>
      </div>
    );
};
