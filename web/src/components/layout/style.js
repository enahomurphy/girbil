import styled from 'styled-components';

export const LayoutContainer = styled.div` 
  height: calc(100vh - 64px);
  width: 100%;
  background: var(--gb-web-background);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.main`
  box-sizing: border-box;
  padding: 56px 48px 20px 48px;
  width: 456px;
  background: var(--gb-dark-grey);
  min-height: 450px;
  border-radius: 14px;
  height: ${props => props.height || 'initial'};
  position: relative;
`;
