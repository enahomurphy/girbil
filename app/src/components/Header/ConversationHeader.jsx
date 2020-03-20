import React from 'react';
import {
  Navbar, Link, NavRight, List, ListItem,
} from 'framework7-react';

import { Title, Block, Popover } from '@/components/Style';
import {
  Add, Settings, Chevron, Search,
} from '@/components/Icon';
import { NavbarWrapper } from './style';

const ConversationHeader = () => (
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
        <Link>
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
            <ListItem href="/preferences" title="System preference" />
            <ListItem href="/logout" title="Sign out of Girbil" />
            <ListItem onClick={() => console.info('logout')} title="Quit Girbil" />
          </List>
        </Popover>
      </NavRight>
    </Navbar>
  </NavbarWrapper>
);

export default ConversationHeader;
