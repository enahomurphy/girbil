
import React from 'react';
import PropTypes from 'prop-types';
import { Image, Title, Button } from '@/components/Style';
import styled from 'styled-components';


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
  url, edit, width, height, changeProfile, removeProfile,
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
        <div>
          {
            Boolean(url && edit) && (
              <Button
                onClick={changeProfile}
                margin="120px 0 0 0"
                weight="bold"
                size="18px"
                align="center"
                color="var(--gb-accent)"
              >
                Set profile title
              </Button>
            )
          }
          {
            Boolean(url && edit) && (
              <Title
                onClick={removeProfile}
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
        </div>
      </StyledInitialsBlock>
    )}
  </StyledBlock>
);

Profile.defaultProps = {
  url: '',
  edit: false,
  changeProfile: () => {},
  removeProfile: () => {},
};

Profile.propTypes = {
  url: PropTypes.string,
  edit: PropTypes.bool,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  changeProfile: PropTypes.func,
  removeProfile: PropTypes.func,
};

export default Profile;
