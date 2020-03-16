import styled from 'styled-components';

export const LayoutContainer = styled.div` 
  height: calc(100vh - 64px);
  width: 100%;
  background: var(--gb-web-background);
  display: flex;
  justify-content: center;
  padding-top: 40px;
`;

export const MainContainer = styled.main`
  box-sizing: border-box;
  padding: ${props => (props.loading === 'true' ? '0' : props.padding)};
  width: 456px;
  background: var(--gb-dark-grey);
  min-height: ${props => props.height};
  border-radius: 14px;
  height: ${props => props.height || 'initial'};
  position: relative;
  overflow: hidden;
  scrollbar-width: thin;
  &:hover {
    overflow-y: scroll;
    overflow: overlay;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
  }


  .layout-button {
    border-radius: 2px;
    background-color: var(--gb-green);
    font-size: 14px;
  }


  .layout-back-icon {
    position: absolute;
    left: 20px;
    top: 64px;
    cursor: pointer;
  }
`;


MainContainer.defaultProps = {
  padding: '56px 48px 20px 48px',
};

export const LoadingOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--gb-dark-grey);
  z-index: 30;
`;
