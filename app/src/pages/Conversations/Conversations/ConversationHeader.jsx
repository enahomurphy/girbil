import React, { useState } from 'react';
import {
  Navbar, Link, NavRight, List, ListItem, f7,
} from 'framework7-react';
import PropTypes from 'prop-types';

import GlobalSearch from '@/components/GlobalSearch';
import { Title, Popover } from '@/components/Style';
import {
  Add, Settings, Chevron, Search,
} from '@/components/Icon';
import { storage, get } from '@shared/lib';
import { NavbarWrapper } from '@/components/Header/style';
import UserInfo from './UserInfo';
import { Logo, UserOrgDetails } from './style';

const ConversationHeader = (props) => {
  const [isOpen, setOpenSearch] = useState(false);
  const {
    searchResult, handleSearch, closeConversation, leaveChannel, userData,
  } = props;

  return (
    <NavbarWrapper>
      <Navbar>
        <UserOrgDetails
          onClick={() => f7.popover.open('.user-popover', '.user-org-details')}
          className="user-org-details"
        >
          <Logo
            type="flex"
            align="center"
            padding="0px"
            inverse
            background="transparent"
            margin="0"
          >
            <Title width="initial" margin="0 10px 0 0" size="24px">
              {get(storage, 'payload.organization.name')}
            </Title>
            <Chevron />
          </Logo>
          <UserInfo user={userData} />
        </UserOrgDetails>
        <NavRight style={{
          width: '90px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
        >
          <Link onClick={() => setOpenSearch(true)}>
            <Search />
          </Link>
          <Link href="/channels">
            <Add />
          </Link>
          <Link popoverOpen=".popover-settings">
            <Settings />
          </Link>
          <Popover margin="0 30px 0 0" className="popover-settings">
            <List>
              <ListItem popoverClose href="/preferences" title="System Preferences" />
              <ListItem
                popoverClose
                onClick={() => {
                  window.close();
                  f7.popover.close('.popover-settings');
                }}
                title="Quit Girbil"
              />
              <ListItem popoverClose onClick={() => window.close()} title="Sign out of Girbil" />
            </List>
          </Popover>
        </NavRight>
      </Navbar>
      <GlobalSearch
        searchResult={searchResult}
        closeConversation={closeConversation}
        leaveChannel={leaveChannel}
        handleSearch={handleSearch}
        onClose={() => setOpenSearch(false)}
        opened={isOpen}
      />
    </NavbarWrapper>
  );
};

ConversationHeader.propTypes = {
  searchResult: PropTypes.array.isRequired,
  handleSearch: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
};

export default ConversationHeader;
