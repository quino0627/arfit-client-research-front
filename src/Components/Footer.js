import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 12px;
`;
const List = styled.ul`
  display: flex;
  padding-left: 15px;
`;
const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;
const Link = styled.a``;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGrayColor};
  padding-right: 15px;
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">About us</Link>
      </ListItem>
      <ListItem>
        <Link href="#">About us</Link>
      </ListItem>
    </List>
    <Copyright>올뉴핏 2020.5 &copy; </Copyright>
  </Footer>
);
