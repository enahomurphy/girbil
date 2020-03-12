import styled from 'styled-components';
import {
  Block as F7Block, Button as F7Button,
  Page as f7Page, Icon as f7Icon, Link as f7Link, Popover as f7Popover,
} from 'framework7-react';

export const Text = styled(F7Block)`
  text-align: ${(props) => props.align};
  font: normal ${(props) => props.size}/20px Source Sans Pro;
  margin: 0px;
  margin-bottom: ${(props) => props.marginBottom};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  text-transform: ${(props) => (props.transform)};
`;

Text.defaultProps = {
  align: 'center',
  width: '180px',
  margin: '0 0  20px 0',
  color: '#B5BBC1',
  size: '14px',
  padding: 0,
  transform: 'initial',
};

export const Title = styled(Text)`
  text-align: ${(props) => props.align};
  font: ${(props) => props.weight} ${(props) => props.size}/24px Source Sans Pro;
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  text-transform: ${(props) => (props.transform)};
`;

Title.defaultProps = {
  margin: '0 0 10px  0',
  color: '#ffffff',
  size: '18px',
  weight: 'bold',
  transform: 'initial',
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
  flex-direction: ${(props) => props.direction};
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

export const Image = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
`;

Image.defaultProps = {
  width: '100%',
  height: '375px',
};

export const Active = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 100px;
  background-color: ${(props) => (props.active ? 'var(--gb-green)' : 'transparent')};
  border: 2px solid ${(props) => (props.active ? 'var(--gb-green);' : '#999999')};
  margin-right: 10px;
`;

Active.defaultProps = {
  width: '16px',
  height: '16px',
};

export const Popover = styled(f7Popover)`
  .item-content {
    padding: 0;
  }

  .item-link.active-state {
    background: none;
  }


  &.list .item-inner {
    padding: 0px;

    .item-title {
      font-size: 12px;
    }
  }

  & ul li {
    padding: 5px 16px;
    cursor: pointer;

    &:hover {
      background: var(--gb-accent);
    }
  }
`;
