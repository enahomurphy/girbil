import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex, Text } from '@/components/styles';
import PageButton from '../../PageButton';

const StyledInput = styled.input`
  width: initial;
`;

const roles = [
  {
    id: 1,
    value: '',
    text: 'Organization Owner',
  },
  {
    id: 1,
    value: '',
    text: 'Organization Admin',
  },
  {
    id: 1,
    value: '',
    text: 'Full Member',
  },
];

const ChangeRole = ({ close }) => (
  <div>
    <Text margin="16px 0 48px 0" size="14px">
      Choose what account type Alexis Jones will have in the Weave organization .
    </Text>
    {
      roles.map(({ value, id, text }) => (
        <Flex key={id}>
          <StyledInput width="initial" type="radio" name="role" value={value} />
          <Text margin="0 0 0  16px" color="#ffffff" weight="700" size="18px">{text}</Text>
        </Flex>
      ))
    }
    <PageButton
      close={close}
      closeText="CANCEL"
      action={() => {}}
      actionText="Update"
    />
  </div>
);

ChangeRole.propTypes = {
  close: PropTypes.func.isRequired,
};

export default ChangeRole;
