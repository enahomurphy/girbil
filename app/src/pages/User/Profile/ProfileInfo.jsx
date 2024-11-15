import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Title, Block, Active, Button,
} from '@/components/Style';
import { BlankLink } from '@/components/Icon';
import { settingsOpener } from '@/lib/opener';

const ProfileInfo = ({
  isUser, onEditProfile, handleMessage, name, position,
}) => (
  <>
    <Block
      justify={isUser ? 'space-between' : 'flex-start'}
      type="flex"
      margin="24px"
    >
      {
        isUser ? (
          <>
            <Button onClick={onEditProfile}>Edit Profile</Button>
            <Button onClick={settingsOpener} withIcon>
              Edit Account
              <BlankLink />
            </Button>
          </>
        ) : (
          <Button onClick={handleMessage}>Message</Button>
        )
      }
    </Block>
    <Block
      margin="0 0 24px 24px"
      type="flex"
      justify="center"
      direction="column"
    >
      <Text margin="0 0 8px 0" align="left">Name</Text>
      <Block
        margin="0 0 8px 0"
        type="flex"
        justify="flex-start"
        align="center"
      >
        <Title
          width="initial"
          margin="0 14px 0 0"
          align="left"
          transform="capitalize"
        >
          {name}
        </Title>
        <Active active />
      </Block>
    </Block>
    {
        Boolean(position) && (
        <Block
          margin="0 0 0 24px"
          type="flex"
          justify="center"
          direction="column"
        >
          <Text align="left">Role</Text>
          <Title
            margin="8px 14px 0 0"
            align="left"
            transform="capitalize"
          >
            {position}
          </Title>
        </Block>
        )
      }
  </>
);

ProfileInfo.propTypes = {
  isUser: PropTypes.bool.isRequired,
  position: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onEditProfile: PropTypes.func.isRequired,
  handleMessage: PropTypes.func.isRequired,
};

export default ProfileInfo;
