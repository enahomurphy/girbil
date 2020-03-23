import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Recorder from '@/components/Recorder/Recorder';
import {
  Title, Block, Button, BorderedInput,
} from '@/components/Style';

const ProfileInfo = ({
  onCancelProfile, onSaveProfile, name, position, loading,
}) => {
  const [form, setForm] = useState({
    name,
    position,
  });

  return (
    <>
      <Block
        justify="space-between"
        type="flex"
        margin="24px"
      >
        <Button onClick={onCancelProfile}>Cancel</Button>
        <Button
          onClick={() => onSaveProfile(form)}
          inverse
          disabled={loading}
        >
          Save Changes
        </Button>
      </Block>
      <Block
        margin="0 24px"
        type="flex"
        justify="center"
        direction="column"
      >
        <BorderedInput>
          <Title>Name</Title>
          <input
            name="name"
            placeholder="e.g., introductions"
            value={form.name}
            onChange={({ target }) => setForm({ ...form, name: target.value })}
          />
        </BorderedInput>
        <BorderedInput>
          <Title>Role</Title>
          <input
            placeholder="e.g., introductions"
            name="name"
            value={form.position}
            onChange={({ target }) => setForm({ ...form, position: target.value })}
          />
        </BorderedInput>
        <Recorder name="profile-image" />
      </Block>
    </>
  );
};

ProfileInfo.propTypes = {
  onCancelProfile: PropTypes.func.isRequired,
  onSaveProfile: PropTypes.func.isRequired,
  position: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ProfileInfo;
