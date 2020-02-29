import styled from 'styled-components';
import {
  Block as F7Block, Button as F7Button,
  Page as f7Page, Icon as f7Icon, Link as f7Link,
} from 'framework7-react';

export const Text = styled(F7Block)`
  text-align: ${(props) => props.align};
  font: normal ${(props) => props.size}/20px Source Sans Pro;
  margin: 0px;
  margin-bottom: ${(props) => props.marginBottom};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
`;

Text.defaultProps = {
  align: 'center',
  width: '180px',
  margin: '0 0  20px 0',
  color: '#B5BBC1',
  size: '14px',
  padding: 0,
};

export const Title = styled(Text)`
  text-align: ${(props) => props.align};
  font: ${(props) => props.weight} ${(props) => props.size}/24px Source Sans Pro;
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  text-transform: ${(props) => (props.lower ? 'lowercase' : 'initial')};
`;

Title.defaultProps = {
  margin: '0 0 10px  0',
  color: '#ffffff',
  size: '18px',
  weight: 'bold',
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
  align-items: ${(props) => props.align};
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
  direction: 'initial',
  width: 'initial',
  margin: '32px 0',
};

export const Page = styled(f7Page)`
  .page-content  {
    overflow: ${({ overflow }) => overflow};
  }
`;

Page.defaultProps = {
  overflow: 'auto',
};


export const Icon = styled(f7Icon)`
  &.icon[class*="color-"] {
    color: ${(({ color }) => color)};
  }
`;

Icon.defaultProps = {
  color: '#ffffff',
};

export const Link = styled(f7Link)`
  color: $(({ color } => color));
`;

Link.defaultProps = {
  color: '#ffffff',
};