import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from '../Styles/GlobalStyles';
import Themes from '../Styles/Themes';
import Routes from './Routes';
import Footer from './Footer';
import Header from './Header';
import '../Styles/App.css';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Themes}>
      <>
        <GlobalStyles />
        <Router>
          <Header isLoggedIn={isLoggedIn} />
          <Wrapper>
            <Routes isLoggedIn={isLoggedIn} />
            <Footer />
          </Wrapper>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
