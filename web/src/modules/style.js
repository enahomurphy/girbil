import styled from 'styled-components';

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
