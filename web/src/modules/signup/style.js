import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  width: 300px;
`;

Title.defaultProps = {
  size: '24px',
  margin: '0',
};

export const Text = styled.p`
  color: ${props => props.color || 'var(--gb-web-text)'};
  margin: ${props => props.margin};
  font-size: ${props => props.size};
  text-align: ${props => props.align};
  position: ${props => props.position};
  font-weight: ${props => props.weight};
`;

Text.defaultProps = {
  margin: '0',
  size: '14px',
  align: 'left',
  position: 'initial',
  weight: 'initial',
};

export const DividerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 56px;
  margin-bottom: 40px;


  &  > .divider {
    height: 1px;
    background-color: var(--gb-light-grey);
    width: calc(100% - 40px);
  }

  & > .or {
    border: 1px solid var(--gb-light-grey);
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Footer = styled.div`
  position: absolute;
  bottom: 0px;
  bottom: 24px;
`;

export const GoogleButton = styled.button`
  width: 360px;
  position: relative;
  border-radius: 6px;

  span {
    width: 40px;
    height: 38px;
    display: block;
    background: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 1px;
    bottom: 0px;
    border-radius: 6px;
  }

  & > div {
    position: absolute;
  }
`;

export const Input = styled.input`
  text-align: ${props => props.align || 'initial'};

  &::placeholder {
    text-align: ${props => props.align || 'initial'};
    text-transform: ${props => props.transform || 'uppercase'};
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

export const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: ${props => props.margin};
`;

Flex.defaultProps = {
  margin: '0',
};

export const Form = styled.div`
  input {
    margin-bottom: 24px;
  }
`;
