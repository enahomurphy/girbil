import React, { useState, useRef, Fragment } from 'react';
import PropTypes from 'prop-types';

import {
  Image, Text, Title, Active, Flex,
} from '@/components/styles';
import { storage } from '@shared/lib';
import More from '@/components/icons/More';
import { useClickAway } from 'react-use';
import { useRoles } from '../../hooks';
import { Options } from './style';


const UserList = ({
  avatar, email, name, role, onChangeAccount, onDeleteAccount,
}) => {
  const [show, setShow] = useState(false);
  const ref = useRef();
  const roles = useRoles();

  useClickAway(ref, () => setShow(false));

  const canChangeRole = (
    roles[role] !== roles.owner
    && storage.payload.id !== 'id'
  );

  return (
    <Flex margin="0 0 18px 0" justify="space-between" align="center">
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
        <Text margin="0 15px 0 0 ">{`Organization ${role}`}</Text>
        <span
          role="presentation"
          onClick={() => setShow(!show)}
          style={{
            position: 'relative', cursor: 'pointer', display: 'flex',
          }}
        >
          {
            canChangeRole && (
              <Fragment>
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
              </Fragment>
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
  role: PropTypes.string.isRequired,
  onChangeAccount: PropTypes.func.isRequired,
  onDeleteAccount: PropTypes.func.isRequired,
};

export default UserList;
