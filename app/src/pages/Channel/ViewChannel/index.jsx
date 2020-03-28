import React from 'react';
import { Page, f7 } from 'framework7-react';
import { useQuery } from '@apollo/client';
import PropTypes from 'prop-types';

import Header from '@/components/Header';
import { get } from '@shared/lib';
import { Text, Block } from '@/components/Style';
import { query } from '@shared/graphql/channels';
import Details from './Details';
import Members from './Members';

const View = ({ channelId }) => {
  const { data } = useQuery(
    query.GET_CHANNEL_MEMBERS, {
      variables: { channelId },
      fetchPolicy: 'network-only',
    },

  );

  const members = get(data, 'channelMembers.members', []);
  const count = get(data, 'channelMembers.count', 0);
  const channel = get(data, 'channel', {});

  let backURL = '';
  const { history } = f7.views.main.router;
  const previousRoute = history[history.length - 2];

  if (['/channels/create', `/channels/${channelId}/edit`].includes(previousRoute)) {
    backURL = '/conversations';
  }

  return (
    <Page>
      <Header backURL={backURL} title="Channel details" />
      <Block padding="24px 24px">
        <Text margin="0 0 24px 0">
          Channels are spaces for open team communications.
          We recommend organizing them around a topic; e.g., design, marketing, development.
        </Text>
        <Details channel={channel} />
        {(members && members.length) && (
          <Members channel={channel} count={count} members={members} />
        )}
      </Block>
    </Page>
  );
};

View.propTypes = {
  channelId: PropTypes.string.isRequired,
};

export default View;
