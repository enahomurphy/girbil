
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Title } from '@/components/Style';
import styled from 'styled-components';
import { Block } from 'framework7-react';


const StyledBlock = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInitialsBlock = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ url }) => (url ? 'rgba(34, 34, 34, 0.66)' : '#ffffff')};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
`;

const Profile = ({
  url, edit, width, height,
}) => (
  <StyledBlock width={width} height={width}>
    {url && <Image src={url} width={width} height={height} />}
    {edit && (
      <StyledInitialsBlock url={url} width={width} height={width}>
        {
          Boolean(!url && edit) && (
            <Title
              color="var(--gb-dark-grey)"
              size="96px"
            >
              JW
            </Title>
          )
        }
        <Block>
          {
            Boolean(url && edit) && (
              <Title
                margin="120px 0 0 0"
                weight="bold"
                size="18px"
                align="center"
                color="var(--gb-accent)"
              >
                Set profile title
              </Title>
            )
          }
          {
            Boolean(url && edit) && (
              <Title
                margin="8px 0 0 0"
                weight="bold"
                size="14px"
                align="center"
                color="#ffffff"
              >
                Remove title
              </Title>
            )
          }
        </Block>
      </StyledInitialsBlock>
    )}
  </StyledBlock>
);

Profile.defaultProps = {
  url: '',
  edit: false,
};

Profile.propTypes = {
  url: PropTypes.string,
  edit: PropTypes.bool,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default Profile;
