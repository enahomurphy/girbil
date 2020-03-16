import styled from 'styled-components';

export const Title = styled.h1`
  font-size: ${props => props.size};
  margin: ${props => props.margin};
  width: ${props => props.width};
  text-transform: ${props => props.transform};
`;

Title.defaultProps = {
  size: '24px',
  margin: '0',
  width: 'initial',
  transform: 'initial',
};

export const Text = styled.p`
  color: ${props => props.color || 'var(--gb-web-text)'};
  margin: ${props => props.margin};
  font-size: ${props => props.size};
  text-align: ${props => props.align};
  position: ${props => props.position};
  cursor: ${props => (props.cursor ? 'pointer' : 'initial')};
  font-weight: ${props => props.weight};
`;

Text.defaultProps = {
  margin: '0',
  size: '14px',
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
  padding: ${props => props.padding};
  width: ${props => props.width};
  min-width: ${props => props.width};
  cursor: ${props => (props.cursor ? 'pointer' : 'initial')};
  border-bottom: ${props => (props.bordered ? '1px solid #ffffff' : 'none')};
`;

Flex.defaultProps = {
  margin: '0',
  padding: '0',
  direction: 'initial',
  justify: 'flex-start',
  align: 'center',
  width: 'initial',
};

export const Form = styled.div`
  input {
    margin-bottom: 24px;
  }
`;

export const Button = styled.button`
  margin: ${props => props.margin};
  width: ${props => props.width};
  font-weight: ${props => props.weight};
`;

Button.defaultProps = {
  weight: 'bold',
  width: '100',
  marign: '0',
};

export const InputWithError = styled.div`
  margin-bottom: 24px;

  & input {
    margin: 0 0 5px 0;
  }
  span {
    color: var(--gb-red);
  }
`;

export const Image = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
  border-radius: ${({ radius }) => (radius || '2px')};
`;

Image.defaultProps = {
  width: '32px',
  height: '40px',
};
