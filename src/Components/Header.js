import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${(props) => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;
const HeaderColumn = styled.div`
  width: 50%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
    padding-left: 15px;
    font-weight: 700;
    font-size: 20px;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
    padding-right: 15px;
  }
`;

const ME = gql`
  {
    me {
      name
    }
  }
`;

export default ({ isLoggedIn }) => {
  const { loading, data, error, refetch } = useQuery(ME);
  //   if (loading) {
  //     return null;
  //   }
  //   console.log(`Bearer ${localStorage.getItem('token')}`);

  useEffect(
    () => {
      console.log('LOGINED');
      if (isLoggedIn) {
        refetch();
      }
    },
    [isLoggedIn, refetch]
  );

  if (loading) return 'loading';

  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">아르핏</Link>
        </HeaderColumn>
        <HeaderColumn>
          {data && data.me ? `${data.me.name}님` : '환영합니다.'}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
};
