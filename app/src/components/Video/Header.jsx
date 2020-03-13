import React from 'react';
import PropTypes from 'prop-types';
import {
  Icon, ListItem, List, Link,
} from 'framework7-react';
import {
  Title, Text, Popover, Block,
} from '@/components/Style';
import { Back, Lock } from '@/components/Icon';
import { BackIcon, StyledHeader } from './style';

const ThreadHeader = ({ isPrivate, name }) => (
  <>
    <Title
      margin="0 0 5px 0"
      size="24px"
      weight="700"
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

const MessageHeader = ({ isPrivate, name }) => (
  <Block>
    <Link popoverOpen=".message-header-popover-menu">
      <Title
        margin="0 0 7px 0"
        width="100%"
        size="24px"
        transform="lowercase"
        align="center"
      >
        {isPrivate && (
        <span style={{ marginRight: '5px' }}>
          <Lock width="12px" height="16px" />
        </span>
        ) }
        {name}
        <Icon f7="chevron_right" style={{ fontSize: '16px', marginLeft: '10px' }} />
      </Title>
    </Link>
    <Text align="center" color="var(--gb-medium-grey)">3 members</Text>
  </Block>
);

MessageHeader.propTypes = {
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

const Header = ({
  back, goBack, onClick, isThread, isPrivate, name,
}) => (
  <StyledHeader>
    <Popover className="message-header-popover-menu">
      <List>
        <ListItem link="/organization/invite" popoverClose title="Invite people to channel" />
        <ListItem link="/channels/:channelId" popoverClose title="View channel details" />
        <ListItem link="/channels/:channelId/edit" popoverClose title="Edit channel settings" />
      </List>
    </Popover>
    <BackIcon back={back} onClick={goBack}>
      { back ? <Back /> : <Icon f7="multiply" /> }
    </BackIcon>
    <Block role="presentation" onClick={onClick}>
      {
        isThread
          ? (<ThreadHeader isPrivate={isPrivate} name={name} />)
          : (<MessageHeader isPrivate={isPrivate} name={name} />)
      }
    </Block>
  </StyledHeader>
);

Header.defaultProps = {
  back: false,
  isThread: false,
};

Header.propTypes = {
  back: PropTypes.bool,
  isThread: PropTypes.oneOfType([() => undefined, PropTypes.object]),
  onClick: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
};

export default Header;
