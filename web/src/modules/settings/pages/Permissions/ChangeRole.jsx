import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Flex, Text } from '@/components/styles';

const StyledInput = styled.input`
  width: initial;
`;

const roles = [
  {
    id: 1,
    value: 'owner',
    text: 'Organization Owner',
    selected: false,
  },
  {
    id: 2,
    value: 'admin',
    text: 'Organization Admin',
    selected: false,
  },
  {
    id: 3,
    value: 'user',
    text: 'Full Member',
    selected: false,
  },
];

const ChangeRole = ({ role, handleChange }) => (
  <div>
    <Text margin="16px 0 48px 0" size="14px">
      Choose what account type Alexis Jones will have in the Weave organization .
    </Text>
    {
      roles.map(({ value, id, text }) => (
        <Flex key={id}>
          <StyledInput
            checked={role === value}
            onChange={() => handleChange(value)}
            width="initial"
            type="radio"
            name="role"
            value={value}
          />
          <Text margin="0 0 0  16px" color="#ffffff" weight="700" size="18px">{text}</Text>
        </Flex>
      ))
    }
  </div>
);

ChangeRole.propTypes = {
  handleChange: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default ChangeRole;
