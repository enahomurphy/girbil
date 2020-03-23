import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, Link, List } from 'framework7-react';

import { BlankLink } from '@/components/Icon';
import {
  Block, Image, Title, Text, Popover, Active,
} from '@/components/Style';
import { storage } from '@shared/lib';

import { StyledUser } from './style';

const UserInfo = ({ user }) => {
  const onClickSettings = () => {
    window.open(
      `http://${process.env.APP_URL}/settings?token=${storage.token}`,
    );
  };

  const onShareClick = () => {
    window.open(
      `http://${process.env.APP_URL}/invite?token=${storage.token}`,
    );
  };

  return (
    <>
      <Link popoverOpen=".user-popover">
        <StyledUser type="flex" margin="16px 0 0 0" align="center">
          <Active active width="16px" />
          <Text color="#EFEFEF" margin="0" align="left">{user.name}</Text>
        </StyledUser>
      </Link>
      <Popover width="330px" className="user-popover">
        <Block>
          <Block padding="16px 16px 8px 16px" type="flex">
            <Image src={user.avatar} width="32px" height="40px" />
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
              onClick={onClickSettings}
              popoverClose
              title="Organization settings"
            >
              <BlankLink />
            </ListItem>
            <ListItem
              onClick={onShareClick}
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
};
UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserInfo;
