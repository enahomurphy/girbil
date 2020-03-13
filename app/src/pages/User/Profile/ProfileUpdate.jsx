import React from 'react';
import PropTypes from 'prop-types';

import {
  Title, Block, Button, BorderedInput,
} from '@/components/Style';

const ProfileInfo = ({ onCancelProfile }) => (
  <>
    <Block
      justify="space-between"
      type="flex"
      margin="24px"
    >
      <Button onClick={onCancelProfile}>Cancel</Button>
      <Button inverse> Save Changes </Button>
    </Block>
    <Block
      margin="0 24px"
      type="flex"
      justify="center"
      direction="column"
    >
      <BorderedInput>
        <Title>Name</Title>
        <input placeholder="e.g., introductions" />
      </BorderedInput>
      <BorderedInput>
        <Title>Role</Title>
        <input placeholder="e.g., introductions" />
      </BorderedInput>
    </Block>
  </>
);

ProfileInfo.propTypes = {
  onCancelProfile: PropTypes.func.isRequired,
};

export default ProfileInfo;
