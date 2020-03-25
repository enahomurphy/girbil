import React, { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import { useCopyToClipboard } from 'react-use';
import { useHistory } from 'react-router-dom';

import Layout from '@/components/layout';
import { Text, Flex } from '@/components/styles';
import { get, storage } from '@shared/lib';
import { query } from '@shared/graphql/auth';
import { CopyForm } from './style';

const Share = () => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const { data } = useQuery(query.INVITE_URL);
  const url = get(data, 'inviteUrl', '');
  const { goBack, push } = useHistory();
  const user = storage.payload;

  const closeWindow = () => {
    push('/share');
    window.close();
  };

  return (
    <Layout title="Share an invite link">
      <Fragment>
        <Text margin="16px 0 0 0">
          Anyone can use this link to join
          <span style={{ textTransform: 'capitalize' }}>{` ${user.organization.name} `}</span>
          on Girbil,
          so please only share with people you trust.
        </Text>
        {state.error && (
        <p>
          Unable to copy value:
          {state.error.message}
        </p>
        )}
        <Flex margin="32px 0 244px 0" direction="column" align="flex-start">
          <Text color="#EFEFEF" weight="bold">
            Invite link for
            <span style={{ textTransform: 'capitalize' }}>{` ${user.organization.name} `}</span>
          </Text>
          <CopyForm margin="8px 0 0 0">
            <input
              onClick={() => copyToClipboard(url)}
              value={url}
              className="bordered"
              onChange={() => {}}
            />
            <button
              onClick={() => copyToClipboard(url)}
              type="button"
              className="green"
            >
              {state.value ? 'copied' : 'copy'}
            </button>
          </CopyForm>
        </Flex>
        <button
          onClick={goBack}
          type="submit"
          className="primary"
        >
          back
        </button>
        <button
          onClick={closeWindow}
          style={{ marginTop: '15px' }}
          className="transparent"
          type="button"
        >
          CLOSE BROWSER TAB
        </button>
      </Fragment>
    </Layout>
  );
};

export default Share;
