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
          onClick={handleClose}
        >
          <Close />
        </span>
      </SearchHeader>
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
    </Popup>
  );
};

GlobalSearch.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GlobalSearch;
