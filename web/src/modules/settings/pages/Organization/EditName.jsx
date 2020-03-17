import React from 'react';
import PropTypes from 'prop-types';

import {
  Text, Title, Flex, Input, InputWithError,
} from '@/components/styles';

const EditName = ({
  name, handleNameChange, editName, onEditClicked,
}) => (
  <Flex
    margin="27px 0 24px 0"
    justify="space-between"
    direction={editName ? 'column' : 'initial'}
    align={editName ? 'flex-start' : 'flex-end'}
  >
    <div>
      <Text
        weight="bold"
        transform="capitalize"
        margin="0 0 8px 0"
        color="var(--gb-web-grey-medium)"
      >
        name
      </Text>
      {!editName && (<Title>{name}</Title>)}
    </div>
    {
        !editName && (
          <Text
            weight="600"
            color="var(--gb-web-blue)"
            transform="uppercase"
            onClick={onEditClicked}
            cursor="pointer"
          >
            Edit
          </Text>
        )
      }
    {
    editName && (
      <div>
        <InputWithError>
          <Input
            className="bordered"
            align="left"
            transform="capitalize"
            placeholder="Organization name"
            value={name}
            onChange={({ target }) => handleNameChange(target.value)}
          />
        </InputWithError>
      </div>
    )
    }
  </Flex>
);
EditName.propTypes = {
  handleNameChange: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  editName: PropTypes.bool.isRequired,
};

export default EditName;
