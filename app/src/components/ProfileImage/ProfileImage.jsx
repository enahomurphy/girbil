import React from 'react';
import PropTypes from 'prop-types';
import { Image, Title, Button } from '@/components/Style';
import styled from 'styled-components';

const nameToInitials = (name) => {
  const [first, second = ''] = name.split(' ');
  return `${first.charAt(0)} ${second.charAt(0) || ''}`.trim();
};

const StyledBlock = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: #636366;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
`;

const StyledInitialsBlock = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
`;

export const SimpleProfileImage = ({
  name, url, width, height,
}) => (
  <StyledBlock width={width} height={height}>
    {url && <Image radius="6px" src={url} width={width} height={height} />}
    {!url && (
    <StyledInitialsBlock url={url} width={width} height={width}>
      <Title
        color="#FFFFFF"
        size="18px"
        transform="capitalize"
      >
        {nameToInitials(name)}
      </Title>
    </StyledInitialsBlock>
    )}
  </StyledBlock>
);

SimpleProfileImage.defaultProps = {
  url: '',
  name: '',
};

SimpleProfileImage.propTypes = {
  url: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  name: PropTypes.string,
};


const Profile = ({
  url, edit, width, height, changeProfile, removeProfile, name,
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
              {nameToInitials(name)}
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
            Boolean(false && edit) && (
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
  name: '',
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
  name: PropTypes.string,
};

export default Profile;
