import React from 'react';
import {
  Navbar, Searchbar, Link, NavRight,
} from 'framework7-react';
import { Title, Block } from '@/pages/style';
import { NavbarWrapper } from './style';

function ConversationHeader() {
  return (
    <NavbarWrapper>
      <Navbar title={(
        <Block type="flex" align="center" margin="0">
          <Title margin="0 10px 0 0" size="24px">Girbil</Title>
          <Link iconIos="f7:chevron_down" iconAurora="f7:chevron_down" iconMd="material:chevron_down" />
        </Block>
        )}
      >
        <NavRight style={{
          width: '90px',
          display: 'flex',
          'justify-content': 'space-between',
        }}
        >
          <Link searchbarEnable=".searchbar-demo" iconIos="f7:search" iconAurora="f7:search" iconMd="material:search" />
          <Link iconIos="f7:plus" iconAurora="f7:plus" iconMd="material:plus" />
          <Link iconIos="f7:multiply" iconAurora="f7:multiply" iconMd="material:multiply" />
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
}

export default ConversationHeader;
