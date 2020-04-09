import React from 'react';
import PropTypes from 'prop-types';
import { SimpleProfileImage } from '@/components/ProfileImage';
import { isImage } from '@/lib';
import { Video } from '@/components/Style';
import { StyledAvatar } from './style';

const Avatar = ({ avatar, name }) => (
  <StyledAvatar>
    {
      isImage(avatar) ? (
        <SimpleProfileImage name={name} url={avatar} width="64px" height="80px" />
      ) : (
        <Video width="64px" height="80px" src={avatar} autoPlay loop muted playsinline />
      )
    }
  </StyledAvatar>
);

Avatar.defaultProps = {
  avatar: '',
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

export default Avatar;
