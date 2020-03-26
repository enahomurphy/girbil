import React, { useState } from 'react';
import {
  Navbar, Link, NavRight, List, ListItem, f7,
} from 'framework7-react';
import PropTypes from 'prop-types';

import { Title, Block, Popover } from '@/components/Style';
import {
  Add, Settings, Chevron, Search,
} from '@/components/Icon';
import { storage } from '@shared/lib';
import emitter from '@/lib/emitter';
import GlobalSearch from '@/components/GlobalSearch';
import { NavbarWrapper } from './style';

const ConversationHeader = (props) => {
  const [isOpen, setOpenSearch] = useState(false);
  const {
    searchResult, handleSearch, closeConversation, leaveChannel,
  } = props;

  return (
    <NavbarWrapper>
      <Navbar>
        <Block type="flex" align="center" margin="0">
          <Title width="initial" margin="0 10px 0 0" size="24px">
            {storage.payload.organization.name}
          </Title>
          <Link>
            <Chevron />
          </Link>
        </Block>
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
              <ListItem popoverClose href="/preferences" title="System preference" />
              <ListItem
                popoverClose
                onClick={() => {
                  emitter.emitEvent('logout');
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
  searchResult: PropTypes.object.isRequired,
  handleSearch: PropTypes.func.isRequired,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
};

export default ConversationHeader;
