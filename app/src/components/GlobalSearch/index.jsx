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
    if (isOpen) inputEl.current.focus();
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
            id, name, conversationId, avatar, type, members, isPrivate = false, isMember,
          }) => (type === 'user' ? (
            <ConversationListItem
              options={[
                {
                  title: 'View Profile',
                  getLink: () => `/users/${id}/profile`,
                  onClick: handleClose,
                }, {
                  title: 'Close Direct Message',
                  shouldHide: !conversationId,
                  onClick: () => {
                    handleClose();
                    closeConversation(conversationId);
                  },
                }
              ]}
              getLink={() => `/conversations/${conversationId}/`}
              key={id}
              onClick={handleClose}
              id={conversationId || id}
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
              options={[
                {
                  title: 'View Channel',
                  getLink: () => `/channels/${id}`,
                  onClick: handleClose,
                },
                {
                  title: 'Leave Channel',
                  shouldHide: !isMember,
                  onClick: () => {
                    handleClose();
                    leaveChannel(id);
                  },
                },
                {
                  title: 'Join Channel',
                  onClick: handleClose,
                  shouldHide: isMember,
                  getLink: () => `/conversations/${conversationId}/`,
                }
              ]}
              getLink={() => `/conversations/${conversationId}/`}
              key={id}
              onClick={handleClose}
              isActive={false}
              isChannel
              id={conversationId || id}
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
