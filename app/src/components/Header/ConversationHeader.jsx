import React from 'react';
import {
  Navbar, Searchbar, Link, NavRight,
} from 'framework7-react';

import { Title, Block } from '@/components/Style';
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
        <Link searchbarEnable=".searchbar-demo">
          <Search />
        </Link>
        <Link href="/channels" searchbarEnable=".searchb  ar-demo">
          <Add />
        </Link>
        <Link href="/preferences" searchbarEnable=".searchbar-demo">
          <Settings />
        </Link>
      </NavRight>
      <Searchbar
        className="searchbar-demo"
        expandable
        searchContainer=".search-list"
        searchIn=".item-title"
        disableButton
      />
    </Navbar>
  </NavbarWrapper>
);

export default ConversationHeader;
