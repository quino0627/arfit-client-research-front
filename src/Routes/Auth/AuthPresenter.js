import React from 'react';
import styled from 'styled-components';
import Input from '../../Components/Input';
import Button from '../../Components/Button';

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      background-color: ${(props) => props.theme.bgColor};
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

const Register = styled.a`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;

export default ({ setAction, action, secret, onLogin }) => {
  return (
    <Wrapper>
      <Form>
        {action === 'logIn' ? (
          <form onSubmit={onLogin}>
            <Input placeholder="받은 키 값을 입력하세요" {...secret} />
            <Button text="로그인" />
          </form>
        ) : (
          <form>
            <Button text="테스트 신청하기" />
          </form>
        )}
      </Form>

      <StateChanger>
        {action === 'logIn' ? (
          <>
            처음이신가요?{' '}
            <Register
              target="_blank"
              href="https://blog.naver.com/swaida/221957216868"
            >
              등록하기
            </Register>
          </>
        ) : (
          <>
            계정이 있으세요?{' '}
            <Link onClick={() => setAction('logIn')}>시작하기</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
