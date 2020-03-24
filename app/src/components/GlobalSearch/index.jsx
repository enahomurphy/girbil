import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popup, Icon, List } from 'framework7-react';

import { Search } from '@/components/Style';
import Close from '@/components/Icon/Close';
import ConversationListItem from '@/components/List/ListItem';

const SearchHeader = styled.div`
  height: 88px;
  border-bottom: 1px solid #ffffff;
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

  useEffect(() => {
    setOpened(opened);
  }, [opened]);

  return (
    <Popup className="global-search" style={{ background: '#222222' }} opened={isOpen}>
      <SearchHeader>
        <div className="global-input">
          <Search>
            <Icon f7="search" />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search channels and DMs..."
            />
          </Search>
        </div>
        <span
          role="presentation"
          onClick={() => {
            setOpened(false);
            onClose();
          }}
        >
          <Close />
        </span>
      </SearchHeader>
      <List style={{ margin: '32px 0 0 0' }}>
        {
          searchResult.map(({
            id, name, conversationid, avatar, type, members,
          }) => (type === 'user' ? (
            <ConversationListItem
              options={[
                {
                  title: 'View Profile',
                  getLink: () => `/users/${id}/profile`,
                  clickable: false,
                },
                {
                  title: 'Close Direct Message',
                  clickable: false,
                  onClick: () => {
                    setOpened(false);
                    closeConversation(conversationid)
                  },
                },
              ]}
              getLink={() => `/conversations/${conversationid}/`}
              key={id}
              id={conversationid}
              isChannel={false}
              isActive={false}
              isPrivate={false}
              user={{
                id: id,
                name: name,
                lastActive: 'Active 17h ago',
                avatar: avatar,
              }}
            />
          ) : (
            <ConversationListItem
              options={[
                {
                  title: 'View Channel',
                  getLink: () => `/channels/${id}`,
                  clickable: false,
                },
                {
                  title: 'Leave Channel',
                  clickable: true,
                  onClick: () => {
                    setOpened(false);
                    leaveChannel(id)
                  },
                },
              ]}
              getLink={() => `/conversations/${conversationid}/`}
              key={id}
              isActive={false}
              isChannel
              id={conversationid}
              isPrivate={false}
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
    </Popup>
  );
};

GlobalSearch.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GlobalSearch;
