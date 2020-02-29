import React from 'react';
import {
  Navbar, Searchbar, Link, NavRight, Icon,
} from 'framework7-react';
import { Title, Block } from '@/pages/style';

function ConversationHeader() {
  return (
    <Navbar title={(
      <Block type="flex" align="center" margin="0">
        <Title margin="0 10px 0 0" size="24px">Girbil</Title>
        <div>
          <Icon f7="chevron_down" style={{ fontSize: '16px', display: 'block' }} />
        </div>
      </Block>
    )}
    >
      <NavRight style={{ paddingRight: '10px' }}>
        <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
        <Icon f7="plus" />
      </NavRight>
      <Searchbar
        className="searchbar-demo"
        expandable
        searchContainer=".search-list"
        searchIn=".item-title"
        disableButton
      />
    </Navbar>
  );
}

export default ConversationHeader;
