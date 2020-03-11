import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'framework7-react';
import { Title, Text } from '@/components/Style';
import { Back, Lock } from '@/components/Icon';
import { BackIcon, StyledHeader } from './style';

const ThreadHeader = () => (
  <>
    <Title margin="0 0 5px 0" size="24px" weight="700">Thread</Title>
    <Text weight="400" color="#ffffff" size="14px" transform="lowercase">
      <Lock height="8" width="6" f7="lock_fill" />
      {`${'  DEV'}`}
    </Text>
  </>
);

const MessageHeader = () => (
  <>
    <Title margin="0 0 7px 0" size="24px" transform="lowercase">
      <Icon f7="lock_fill" />
      DEV
      <Icon f7="chevron_right" style={{ fontSize: '16px', marginLeft: '10px' }} />
    </Title>
    <Text color="var(--gb-medium-grey)">3 members</Text>
  </>
);

const Header = ({
  back, goBack, onClick, isThread,
}) => (
  <StyledHeader>
    <BackIcon back={back} onClick={goBack}>
      {
        back ? <Back /> : <Icon f7="multiply" />
      }
    </BackIcon>
    <div role="presentation" onClick={onClick}>
      { isThread ? <ThreadHeader /> : <MessageHeader /> }
    </div>
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
};

export default Header;
