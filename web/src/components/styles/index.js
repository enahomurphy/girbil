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

export const Input = styled.input`
  text-align: ${props => props.align || 'initial'};

  &::placeholder {
    text-align: ${props => props.align || 'initial'};
    text-transform: ${props => props.transform || 'capitalize'};
  }
`;


export const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
`;

export const Flex = styled.div`
  display: flex;
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  flex-direction: ${props => props.direction};
  margin: ${props => props.margin};
`;

Flex.defaultProps = {
  margin: '0',
  direction: 'initial',
  justify: 'flex-start',
  align: 'center',
};

export const Form = styled.div`
  input {
    margin-bottom: 24px;
  }
`;
