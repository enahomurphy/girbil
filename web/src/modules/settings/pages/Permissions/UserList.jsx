import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  Image, Text, Title, Active, Flex,
} from '@/components/styles';
import More from '@/components/icons/More';
import { useClickAway } from 'react-use';


const Options = styled(Flex)`
  padding-bottom: 8px;
  width: 176px;
  position: absolute;
  left: -180px;
  top: 3px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 5px;
  background: #333333;
  padding: 0px;
  box-shadow: 0px 2px 20px var(--gb-dark-grey);
  cursor: pointer;

  .option {
    width: 100%;
    padding: 8px;
    border-radius: 5px;

    &:hover {
      background: var(--gb-accent);
    }

    p {
      font: normal 12px/14px Source Sans Pro;
      text-transform: capitalize;
      cursor: pointer;
      &:hover {
        color: #ffffff;
      }
    }
  }

  .danger {
    p {
      color: var(--gb-red);
    }

    &:hover {
      p {
        color: #ffffff;
      }

      background: var(--gb-red);
    }
  }
`;

const UserList = ({
  avatar, email, name, onChangeAccount, onDeleteAccount,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef();

  useClickAway(ref, () => setShow(false));

  return (
    <Flex justify="space-between" align="center">
      <Flex>
        <Image src={avatar} width="32px" height="40px" />
        <Flex
          margin="0 0 0 16px"
          align="flex-start"
          direction="column"
        >
          <Flex align="center">
            <Title
              margin="0 8px 0 0"
              weight="normal"
              size="18px"
              transform="capitalize"
            >
              {name}
            </Title>
            <Active width="8px" active />
          </Flex>
          <Text>{email}</Text>
        </Flex>
      </Flex>
      <Flex align="center" justify="space-between">
        <Text margin="0 15px 0 0 ">Organization Admin</Text>
        <span
          role="presentation"
          onClick={() => setShow(!show)}
          style={{
            position: 'relative', cursor: 'pointer', display: 'flex',
          }}
        >
          <More />
          {
            show && (
              <Options ref={ref}>
                <div
                  role="presentation"
                  onClick={onChangeAccount}
                  className="option"
                >
                  <Text>Change account type</Text>
                </div>
                <div
                  role="presentation"
                  onClick={onDeleteAccount}
                  className="option danger"
                >
                  <Text>Remove member</Text>
                </div>
              </Options>
            )
          }
        </span>
      </Flex>
    </Flex>
  );
};

UserList.propTypes = {
  avatar: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChangeAccount: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
};

export default UserList;
