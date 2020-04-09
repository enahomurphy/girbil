import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List } from 'framework7-react';

import { BlankLink } from '@/components/Icon';
import {
  Block, Image, Title, Text, Popover, Active, Video,
} from '@/components/Style';
import { settingsOpener, invitePeopleOpener, isImage } from '@/lib';

import { StyledUser } from './style';

const UserInfo = ({ user }) => (
  <>
    <StyledUser type="flex" margin="5px 0 0 0" align="center">
      <Active active width="16px" />
      <Text color="#EFEFEF" margin="0" align="left">{user.name}</Text>
    </StyledUser>
    <Popover width="330px" className="user-popover">
      <Block>
        <Block borderRadius="20px" padding="16px 16px 8px 16px" type="flex">
          {
          isImage(user.avatar) ? (
            <Image src={user.avatar} width="32px" height="40px" />
          ) : (
            <Video
              width="32px"
              height="40px"
              borderRadius="2px"
              src={user.avatar}
              autoPlay
              loop
              muted
              playsinline
            />
          )
          }
          <Block margin="0 0 0 12px">
            <Title
              size="14px"
            >
              {user.name}
            </Title>
            <Text
              color="var(--gb-medium-grey)"
              transform="uppercase"
              margin="4px 0 0 0"
            >
              CEO
            </Text>
          </Block>
        </Block>
        <List>
          <ListItem link="#" popoverClose title="Set yourself to away" />
          <ListItem link={`/users/${user.id}/profile`} popoverClose title="Profile & personal account" />
          <ListItem
            onClick={settingsOpener}
            popoverClose
            title="Organization settings"
          >
            <BlankLink />
          </ListItem>
          <ListItem
            onClick={invitePeopleOpener}
            popoverClose
            title="Invite people"
          >
            <BlankLink />
          </ListItem>
        </List>
      </Block>
    </Popover>
  </>
);
UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
