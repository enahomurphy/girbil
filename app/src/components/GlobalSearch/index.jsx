import React, { useEffect, useState, useRef } from 'react';
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

const GlobalSearch = (props) => {
  const {
    handleSearch, searchResult, closeConversation, leaveChannel, opened, onClose,
  } = props;
  const [isOpen, setOpened] = useState(opened);
  const [searchText, setSearchText] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    handleSearch(searchText);
  }, [searchText, handleSearch]);

  useEffect(() => {
    setOpened(opened);
  }, [opened]);

  useEffect(() => {
    if(isOpen) inputEl.current.focus();
  }, [isOpen]);

  const handleClose = () => {
    setSearchText('');
    setOpened(false);
    onClose();
  };

  const setSearchHelpers = (helper) => {
    inputEl.current.focus();
    setSearchText(helper);
  };

  const createOptions = (id, type, isMember, conversationId) => {
    const options = [];

    if (type === 'channel') {
      options.push({
        title: 'View Channel',
        getLink: () => `/channels/${id}`,
        onClick: handleClose,
      });

      if (isMember) {
        options.push({
          title: 'Leave Channel',
          onClick: () => {
            handleClose();
            leaveChannel(id);
          },
        });
      } else {
        options.push({
          title: 'Join Channel',
          onClick: handleClose,
          getLink: () => `/conversations/${conversationId}/`,
        });
      }
    }

    if (type === 'user') {
      options.push({
        title: 'View Profile',
        getLink: () => `/users/${id}/profile`,
        onClick: handleClose,
      });

      if (conversationId) {
        options.push({
          title: 'Close Direct Message',
          onClick: () => {
            handleClose();
            closeConversation(conversationId);
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
                ref={inputEl}
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
          Boolean(searchText.length)
          && (
            <div style={{ color: '#EFEFEF', margin: '0 0 16px 42px' }}>
              Conversations and channels matching search
            </div>
          )
        }
      </div>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          searchResult.map(({
            id, name, conversationId, avatar, type, members, isPrivate, isMember,
          }) => (type === 'user' ? (
            <ConversationListItem
              options={createOptions(id, type, isMember, conversationId)}
              getLink={() => `/conversations/${conversationId}/`}
              key={id}
              onClick={handleClose}
              id={conversationId}
              isChannel={false}
              isActive={false}
              isPrivate={isPrivate}
              user={{
                id,
                name,
                lastActive: 'Active 17h ago',
                avatar,
              }}
            />
          ) : (
            <ConversationListItem
              options={createOptions(id, type, isMember, conversationId)}
              getLink={() => `/conversations/${conversationId}/`}
              key={id}
              onClick={handleClose}
              isActive={false}
              isChannel
              id={conversationId}
              isPrivate={isPrivate}
              user={{
                id,
                name,
                members,
                avatar,
                isPrivate: true,
              }}
            />
          )))
        }
      </List>
      {
        Boolean(!searchText.length)
        && (
          <DefaultSearchList
            title="Suggested Searches"
            options={[
              { text: 'is:unreads', onClick: () => setSearchHelpers('is:unreads ') },
              { text: 'is:channel', onClick: () => setSearchHelpers('is:channel ') },
              { text: 'is:user', onClick: () => setSearchHelpers('is:user ') },
            ]}
          />
        )
      }
    </Popup>
  );
};

GlobalSearch.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  searchResult: PropTypes.array.isRequired,
  closeConversation: PropTypes.func.isRequired,
  leaveChannel: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GlobalSearch;
