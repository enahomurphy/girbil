import styled from 'styled-components';
import { BlockTitle, Block as F7Block, Button as F7Button } from 'framework7-react';

export const Title = styled(BlockTitle)`
  text-align: center;
  font: bold 18px/24px PT Sans;
  margin-bottom: 10px;
`;

export const Text = styled(F7Block)`
  text-align: ${(props) => props.align};
  font: normal 14px/20px Lato;
  margin: 0px auto;
  margin-bottom: 20px;
  width: ${(props) => props.width};
  padding: 0;
`;

Text.defaultProps = {
  align: 'center',
  width: '180px',
};

export const Button = styled(F7Button)` 
  min-width: 250px;
  border-radius: 3px;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  min-width: ${(props) => props.width};
  border: ${(props) => (props.borderColor ? `1px solid ${props.borderColor}` : 'none')};
`;

Button.defaultProps = {
  width: '250px',
  borderColor: '#ffffff',
  margin: '32px 0',
};

export const Block = styled(F7Block)`
  display: ${(props) => props.type};
  justify-content: ${(props) => props.justify};
  flex-direction: ${(props) => props.align};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

Block.defaultProps = {
  type: 'initial',
  justify: 'initial',
  align: 'initial',
  padding: 0,
  width: 'initial',
  margin: '32px 0',
};
