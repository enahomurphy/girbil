import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Text } from '@/components/styles';
import PageButton from '../../PageButton';

const StyledListWrapper = styled.div`
  width: initial;
  padding-left: 5px;

  p {
    padding: 4px 0px;
  }
`;

const RemoveUser = ({ close }) => (
  <div>
    <Text margin="16px 0 0 0">What happens when an account is removed? </Text>
    <StyledListWrapper>
      <Text>• The user will no longer be able to sign in to this organization.</Text>
      <Text>• The user’s Girbils will still be visible in thie organiztion.</Text>
      <Text>
        • The user’s account will still exist,
        and they can be re-invited or join a different Girbil organization
      </Text>
    </StyledListWrapper>
    <PageButton
      close={close}
      closeText="CANCEL"
      action={() => {}}
      actionText="Remove"
      danger
    />
  </div>
);

RemoveUser.propTypes = {
  close: PropTypes.func.isRequired,
};

export default RemoveUser;
