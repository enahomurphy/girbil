import React from 'react';
import { useQuery } from '@apollo/client';
import { useCopyToClipboard } from 'react-use';

import Layout from '@/components/layout';
import { Text, Flex } from '@/components/styles';
import { get } from '@shared/lib';
import { query } from '@shared/graphql/auth';
import { CopyForm } from './style';

const Share = () => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const { data } = useQuery(query.INVITE_URL);
  const url = get(data, 'inviteUrl', '');

  return (
    <Layout title="Share an invite link">
      <Text margin="16px 0 0 0">
        Anyone can use this link to join Weave on Girbil,
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
          Invite link for Weave
        </Text>
        <CopyForm margin="8px 0 0 0">
          <input
            onClick={() => copyToClipboard(url)}
            value={url}
            className="bordered"
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

      <button type="submit" className="primary">
        back
      </button>
      <button
        onClick={() => {}}
        style={{ marginTop: '15px' }}
        className="transparent"
        type="button"
      >
        CLOSE BROWSER TAB
      </button>
    </Layout>
  );
};

export default Share;
