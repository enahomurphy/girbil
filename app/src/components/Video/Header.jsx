import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List, Link } from 'framework7-react';
import {
  Title, Text, Popover, Block, ShortTitle,
} from '@/components/Style';
import { Back, Lock, Chevron } from '@/components/Icon';
import { BackIcon, StyledHeader } from './style';
import Close from '../Icon/Close';

const ThreadHeader = ({ isPrivate, name }) => (
  <>
    <Title
      margin="0 0 5px 0"
      size="24px"
      weight="700"
      align="center"
    >
      Thread
    </Title>
    <Text
      weight="400"
      color="#ffffff"
      size="14px"
      transform="lowercase"
    >
      {isPrivate && <Lock height="8" width="6" /> }
      {`  ${name}`}
    </Text>
  </>
);

ThreadHeader.propTypes = {
  name: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
};

const MessageHeader = ({
  isPrivate, name, members, isChannel,
}) => (
  <Block>
    <Link popoverOpen=".message-header-popover-menu">
      <ShortTitle
        margin="0"
        width="100%"
        size="24px"
        transform="lowercase"
        align="center"
      >
        {
          isPrivate && (
            <span style={{ marginRight: '5px' }}>
              <Lock width="12px" height="16px" />
            </span>
          )
        }
        { name && (name) }
      </ShortTitle>
      <span style={{ transform: 'rotate(270deg)' }}>
        <Chevron />
      </span>
    </Link>
    {
      isChannel && <Text align="center" color="var(--gb-medium-grey)">{`${members} members`}</Text>
    }
  </Block>
);

MessageHeader.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.number.isRequired,
  isChannel: PropTypes.bool.isRequired,
};

const Header = ({
  back, goBack, onClick, isThread, isPrivate, name, members, isChannel, typeId, showBack,
}) => (
  <StyledHeader>
    <Popover className="message-header-popover-menu">
      {
        isChannel ? (
          <List>
            <ListItem link={`/channels/${typeId}/add-people`} popoverClose title="Add users to channel" />
            <ListItem link={`/channels/${typeId}`} popoverClose title="View channel details" />
            <ListItem link={`/channels/${typeId}/edit`} popoverClose title="Edit channel settings" />
          </List>
        ) : (
          <List>
            <ListItem link={`/users/${typeId}/profile`} popoverClose title="View user profile" />
          </List>
        )
       }
    </Popover>
    {
      showBack && (
      <BackIcon back={back} onClick={goBack}>
        { back ? <Back /> : <Close /> }
      </BackIcon>
      )
    }
    <Block role="presentation" onClick={onClick}>
      {
        isThread
          ? (<ThreadHeader isPrivate={isPrivate} name={name} />)
          : (
            <MessageHeader
              isChannel={isChannel}
              members={members}
              isPrivate={isPrivate}
              name={name}
            />
          )
      }
    </Block>
  </StyledHeader>
);

Header.defaultProps = {
  back: false,
  isThread: false,
  goBack: () => {},
  showBack: true,
};

Header.propTypes = {
  back: PropTypes.bool,
  showBack: PropTypes.bool,
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]),
  onClick: PropTypes.func.isRequired,
  goBack: PropTypes.func,
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  members: PropTypes.number.isRequired,
  isChannel: PropTypes.bool.isRequired,
  typeId: PropTypes.string.isRequired,
};

export default Header;
