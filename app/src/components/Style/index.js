import styled from 'styled-components';
import {
  Block as F7Block, Button as F7Button,
  Page as f7Page, Icon as f7Icon, Link as f7Link, Popover as f7Popover,
} from 'framework7-react';

export const Text = styled.p`
  text-align: ${(props) => props.align};
  font: normal ${(props) => props.size}/20px Source Sans Pro;
  margin: ${(props) => props.margin};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
  color: ${(props) => props.color};
  text-transform: ${(props) => (props.transform)};
  line-height: ${(props) => props.line};
`;

Text.defaultProps = {
  align: 'left',
  width: 'initial',
  margin: '0',
  color: 'var(--gb-light-grey)',
  size: '14px',
  padding: 0,
  transform: 'initial',
  line: 'initial',
};

export const Title = styled.h1`
  text-align: ${(props) => props.align};
  font: ${(props) => props.weight} ${(props) => props.size}/24px Source Sans Pro;
  margin: ${(props) => props.margin};
  color: ${(props) => props.color};
  text-transform: ${(props) => (props.transform)};
  line-height: ${(props) => props.line};
`;

Title.defaultProps = {
  margin: '0',
  color: '#ffffff',
  size: '18px',
  weight: '600',
  transform: 'initial',
  line: 'initial',
};

export const ShortTitle = styled(Title)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: initial;
  max-width: 140px;
`;

export const Button = styled(F7Button)`
  min-width: 250px;
  border-radius: 3px;
  margin: ${(props) => props.margin};
  background: ${({ background, inverse }) => (inverse ? 'var(--gb-green)' : background)};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-width: ${(props) => props.width};
  border: ${({ borderColor, inverse }) => (inverse ? 'none' : `2px solid ${borderColor}`)};
  line-height: 0;
  display: flex;
  border-radius: 6px;

  justify-content: ${({ withIcon }) => (withIcon ? 'space-between' : 'center')};
  align-items: center;
  padding: 0 20px;

  &.button {
    color: ${(props) => props.color};
    font-weight: ${(props) => props.weight};
    font-size: ${(props) => props.size};
    line-height: ${(props) => props.line};
    font-family: Source Sans Pro;
  }
`;

Button.defaultProps = {
  width: '152px',
  height: '40px',
  borderColor: '#ffffff',
  background: 'initial',
  color: '#ffffff',
  margin: '0',
  size: '14px',
  weight: 'bold',
  inverse: false,
};

export const Block = styled(F7Block)`
  display: ${(props) => props.type};
  justify-content: ${(props) => props.justify};
  align-items: ${(props) => props.align};
  flex-direction: ${(props) => props.direction};
  padding: ${(props) => props.padding};
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};

  .icon-checkbox, .checkbox i {
    border-radius: 10px;
  }
`;

Block.defaultProps = {
  type: 'block',
  justify: 'initial',
  align: 'initial',
  padding: 0,
  direction: 'initial',
  width: 'initial',
  margin: '0',
};

export const ListBlock = styled(Block)`
  &:hover {
    background: rgba(153, 153, 153, 0.25);
    border-radius: 4px;
  }
`;

export const Page = styled(f7Page).attrs({
  styles: { overflow: 'none' },
})`
  .page-content {
    scrollbar-width: thin;
    overflow: ${({ overflow }) => overflow};
    overflow-y: ${({ overlayX }) => overlayX};
    overflow-y: ${({ overlayX }) => overlayX};
    scrollbar-color: red;

    &::-webkit-scrollbar {
      width: 4px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
    }

    &:scrollbar[orient="horizontal"] {
      color:green;
    }
  }

  .pointer {
    cursor: pointer
  }
`;

Page.defaultProps = {
  overflowX: 'auto',
  overflowY: 'overlay',
  overflow: 'hidden',
};

export const PageWithScroll = styled(Page)`
  .page-content {
    scrollbar-width: thin;

    &::-webkit-scrollbar-thumb {
      border-radius: 100px;
      max-height: 129px;
      background: #636366;
    }

    &::-webkit-scrollbar {
      width: 6px;
      padding: 0px 2px;
      background-color: transparent;
    }
  }
`;

export const ScrollableList = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  height: ${({ height }) => height};
`;

ScrollableList.defaultProps = {
  height: '100%',
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
  border-radius: ${({ radius }) => (radius || '2px')};
`;

Image.defaultProps = {
  width: '100%',
  height: '375px',
};

export const Active = styled.div`
  box-sizing: border-box;
  width: ${(props) => props.width};
  height: ${(props) => props.width};
  border-radius: 100px;
  background-color: ${(props) => (props.active ? 'var(--gb-green)' : 'transparent')};
  border: 2px solid ${(props) => (props.active ? 'var(--gb-green);' : '#999999')};
  margin-right: 10px;
`;

Active.defaultProps = {
  width: '16px',
};

export const Popover = styled(f7Popover)`
  box-sizing: border-box;
  width: ${({ width }) => width};
  right: ${({ right }) => right};

  .item-content {
    padding: 0;

    .item-inner {
      padding: 0px;
    }
  }

  .item-link.active-state {
    background: none;
  }

  & .list ul {
    &::before {
      display: none;
    }
  }

  & .list li a .item-content .item-inner .item-title,
  & .list .item-title {
    font-size: 12px;
    font-family: Source Sans Pro;
    color: var(--gb-light-grey);
  }

  & .list li a .item-content .item-inner {
    padding: 0px;

    &::after {
      background: none;
    }

    &::before {
      display: none;
    }
  }

  & ul li {
    padding: 0px 16px;
    cursor: pointer;

    &:hover {
      background: var(--gb-accent);
    }
  }
`;

Popover.defaultProps = {
  width: '179px',
  right: 'initial',
};

export const Search = styled.div`
  position: relative;
  input {
    box-sizing: border-box;
    height: 32px;
    width: 100%;
    border-radius: 40px;
    border: none;
    padding-left: 48px;

    &::placeholder {
      font: normal 14px/14px Source Sans Pro;
    }
  }

  i {
    position: absolute;
    z-index: 22222;
    color: var(--gb-black);
    top: 9px;
    left: 15px;
  }
`;

export const BorderedInput = styled(Block)`
  margin-bottom: ${({ last }) => (last ? '0px' : '32px')};

  & > div {
    font: bold 14px/18px Source Sans Pro;
    margin-bottom: 10px;
    text-transform: capitalize;
  }

  input {
    width: 100%;
    height: 40px;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 6px;
    background: transparent;
    color: #EFEFEF;
    font-size: 18px;
    padding-left: 10px;

    &::placeholder {
      font: normal 18px/23px Source Sans Pro;
      color: var(--gb-medium-grey);
    }
  }
`;

export const Video = styled.video`
  object-fit: cover;
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  max-width: ${({ width }) => width};
  max-height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
`;

Video.defaultProps = {
  height: '136px',
  width: '126px',
  borderRadius: '0px',
};

export const ErrorText = styled.span`
  display: flex;
  align-items: center;
  margin-top: 8px;
  color: rgb(255, 79, 68);
`;

export const SearchBar = styled.div`
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;

  .global-input {
    min-width: 296px;
    margin-right: 16px;
  }
`;
