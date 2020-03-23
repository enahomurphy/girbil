import React, { useState } from 'react';
import {
  Navbar, Link, NavRight, List, ListItem, f7,
} from 'framework7-react';

import { Title, Block, Popover } from '@/components/Style';
import {
  Add, Settings, Chevron, Search,
} from '@/components/Icon';
import { storage } from '@shared/lib';
import emitter from '@/lib/emitter';
import { NavbarWrapper } from './style';
import GlobalSearch from '../GlobalSearch';

const ConversationHeader = () => {
  const [isOpen, setOpenSearch] = useState(false);

  return (
    <NavbarWrapper>
      <Navbar>
        <Block type="flex" align="center" margin="0">
          <Title width="initial" margin="0 10px 0 0" size="24px">Girbil</Title>
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
              <ListItem popoverClose href="/logout" title="Sign out of Girbil" />
              <ListItem
                popoverClose
                onClick={() => {
                  storage.clear();
                  emitter.emitEvent('logout');
                  f7.popover.close('.popover-settings');
                }}
                title="Quit Girbil"
              />
            </List>
          </Popover>
        </NavRight>
      </Navbar>
      <GlobalSearch onClose={() => setOpenSearch(false)} opened={isOpen} />
    </NavbarWrapper>
  );
};
export default ConversationHeader;
