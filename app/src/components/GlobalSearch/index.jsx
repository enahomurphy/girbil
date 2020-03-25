import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popup, Icon, List } from 'framework7-react';

import { Search } from '@/components/Style';
import Close from '@/components/Icon/Close';
import ConversationListItem from '@/components/List/ListItem';
import DefaultSearchList from '@/components/List/DefaultSearchList';

const SearchBar = styled.div`
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;

  .global-input {
    min-width: 296px;
    margin-right: 16px;
  }
`;

const GlobalSearch = props => {
  const {handleSearch, searchResult, closeConversation, leaveChannel, opened, onClose } = props;
  const [isOpen, setOpened] = useState(opened);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText]);

  useEffect(() => {
    setOpened(opened);
  }, [opened]);

  const handleClose = () => {
    setOpened(false);
    onClose();
  };

  const createOptions = (id, type, is_member, conversation_id) => {
    let options = [];

    if(type === 'channel') {
      options.push({
        title: 'View Channel',
        getLink: () => `/channels/${id}`,
        onClick: handleClose
      });

      if(is_member) {
        options.push({
          title: 'Leave Channel',
          onClick: () => {
            handleClose()
            leaveChannel(id)
          },
        });
      } else {
        options.push({
          title: 'Join Channel',
          onClick: handleClose,
          getLink: () => `/conversations/${conversation_id}/`
        });
      }
    }

    if(type === 'user') {
      options.push({
        title: 'View Profile',
        getLink: () => `/users/${id}/profile`,
        onClick: handleClose
      });

      if(conversation_id) {
        options.push({
          title: 'Close Direct Message',
          onClick: () => {
            handleClose();
            closeConversation(conversation_id)
          },
        });
      }
    }

    return options;
  };

  return (
    <Popup className="global-search" style={{ background: '#222222' }} opened={isOpen}>
      <div style={{ borderBottom: '1px solid #ffffff' }}>
        <SearchBar>
          <div className="global-input">
            <Search>
              <Icon f7="search" />
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search channels and DMs..."
              />
            </Search>
          </div>
          <span
            role="presentation"
            onClick={handleClose}
          >
            <Close />
          </span>
        </SearchBar>
        {
          Boolean(searchText.length) &&
          (
            <div style={{ color: '#EFEFEF', margin: '0 0 16px 42px' }}>
              Conversations and channels matching search
            </div>
          )
        }
      </div>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          searchResult.map(({
            id, name, conversation_id, avatar, type, members, is_private, is_member
          }) => (type === 'user' ? (
              <ConversationListItem
                options={createOptions(id, type, is_member, conversation_id)}
                getLink={() => `/conversations/${conversation_id}/`}
                key={id}
                onClick={handleClose}
                id={conversation_id}
                isChannel={false}
                isActive={false}
                isPrivate={is_private}
                user={{
                  id: id,
                  name: name,
                  lastActive: 'Active 17h ago',
                  avatar: avatar,
                }}
              />
            ) : (
              <ConversationListItem
                options={createOptions(id, type, is_member, conversation_id)}
                getLink={() => `/conversations/${conversation_id}/`}
                key={id}
                onClick={handleClose}
                isActive={false}
                isChannel
                id={conversation_id}
                isPrivate={is_private}
                user={{
                  id: id,
                  name: name,
                  members: members,
                  avatar: avatar,
                  isPrivate: true,
                }}
              />
          )))
        }
      </List>
      {
        Boolean(!searchText.length) &&
        (
          <DefaultSearchList
            title='Suggested Searches'
            options={[
              {text: 'is:unreads', onClick: () => setSearchText('is:unreads ')},
              {text: 'is:channel', onClick: () => setSearchText('is:channel ')},
              {text: 'is:user', onClick: () => setSearchText('is:user ')}
            ]}/>
        )
      }
    </Popup>
  );
};

GlobalSearch.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GlobalSearch;
