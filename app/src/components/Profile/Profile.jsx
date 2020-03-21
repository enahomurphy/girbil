import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text } from '@/components/Style';

const Profile = ({ url, width, height }) => (
  <div>
    {url && <Image src={url} width={width} height={height} />}
    {!url && (
      <div>
        <Text>JW</Text>
      </div>
    )}
  </div>
);

Profile.defaultProps = {
  url: '',
};

Profile.propTypes = {
  url: PropTypes.string,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default Profile;
