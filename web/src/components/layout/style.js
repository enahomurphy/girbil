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
  padding: ${props => (props.loading === 'true' ? '0' : '56px 48px 20px 48px')};
  width: 456px;
  background: var(--gb-dark-grey);
  min-height: ${props => props.height};
  border-radius: 14px;
  height: ${props => props.height || 'initial'};
  position: relative;
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gb-dark-grey);
  z-index: 30;
`;
