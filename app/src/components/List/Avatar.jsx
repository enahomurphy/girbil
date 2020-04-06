import React from 'react';
import PropTypes from 'prop-types';
import { SimpleProfileImage } from '@/components/ProfileImage';
import { Video } from '@/components/Style';
import { StyledAvatar } from './style';

const Avatar = ({ avatar, name }) => {
  const parts = avatar.split('.');
  const ext = parts[parts.length - 1];
  return (
    <StyledAvatar>
      {
       RegExp(ext).test('.webm') ? (
         <Video src={avatar} autoPlay loop muted playsinline />
       ) : (
         <SimpleProfileImage name={name} url={avatar} width="64px" height="80px" />
       )
     }
    </StyledAvatar>
  );
};

Avatar.defaultProps = {
  avatar: '',
};

Avatar.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

export default Avatar;
