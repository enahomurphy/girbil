import React from 'react';
import PropTypes from 'prop-types';
import {
  Text, Title, Block, Active, Button,
} from '@/components/Style';
import { BlankLink } from '@/components/Icon';

const ProfileInfo = ({ isUser, onEditProfile }) => (
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
            <Button withIcon>
              Edit Account
              <BlankLink />
            </Button>
          </>
        ) : (
          <Button>Message</Button>
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
        >
          Jeff  Whitlock
        </Title>
        <Active active />
      </Block>
    </Block>
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
      >
        Head of Marketing
      </Title>
    </Block>
  </>
);

ProfileInfo.propTypes = {
  isUser: PropTypes.bool.isRequired,
  onEditProfile: PropTypes.func.isRequired,
};

export default ProfileInfo;
