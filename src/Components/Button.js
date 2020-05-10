import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.button`
  width: 100%;
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  color: white;
  font-weight: 700;
  background-color: ${(props) => {
    if (props.color === 'blue') return props.theme.blueColor;
    if (props.color === 'red') return props.theme.redColor;
    return props.theme.blueColor;
  }};
  text-align: center;

  padding: 7px 0px;
  margin: ${(props) => {
    if (props.mb) return '16px 0px';
    return '0';
  }};

  font-size: 14px;
  height: ${(props) => {
    if (props.thick) return '80px';
  }};
`;

const Button = ({ text, onClick, color, thick, mb }) => (
  <Container mb={mb} thick={thick} color={color} onClick={onClick}>
    {text}
  </Container>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
