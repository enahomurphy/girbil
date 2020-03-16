import React, { useState } from 'react';

import {
  Text, Title, Flex, Input, InputWithError,
} from '@/components/styles';

const EditName = () => {
  const [editName, setEditName] = useState(true);
  const handleChange = () => {};

  return (
    <Flex
      margin="27px 0 0 0"
      justify="space-between"
      direction="column"
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
        {!editName && (<Title>Weave</Title>)}
      </div>
      {
        !editName && (
          <Text
            weight="600"
            color="var(--gb-web-blue)"
            transform="uppercase"
            onClick={() => setEditName(!editName)}
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
                placeholder="email"
                value="email"
                onChange={handleChange()}
              />
            </InputWithError>
          </div>
        )
      }
    </Flex>
  );
};


export default EditName;
