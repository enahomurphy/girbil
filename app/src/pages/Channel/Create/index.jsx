import React, { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Page, f7 } from 'framework7-react';
import PropTypes from 'prop-types';

import { mutation, query } from '@shared/graphql/channels';
import Header from '@/components/Header';
import { get, storage } from '@shared/lib';
import Create from './Create';

const CreateChannel = ({ $f7router, title, channelId }) => {
  const onError = () => f7.dialog.close();
  const onCompleted = ({ createChannel: channel }) => {
    f7.dialog.close();
    $f7router.navigate(
      `/channels/${channelId || channel.id}`,
    );
  };

  const [createChannel] = useMutation(
    mutation.CREATE_CHANNEL,
    { onError, onCompleted },
  );
  const [updateChannel] = useMutation(
    mutation.UPDATE_CHANNEL,
    { onError, onCompleted },
  );
  const [getChannel, { data, loading }] = useLazyQuery(query.CHANNEL);

  const {
    name = '',
    about = '',
    isPrivate = false,
    avatar = null,
    userId,
  } = get(data, 'channel', {});

  useEffect(() => {
    if (channelId) {
      getChannel({
        variables: { channelId },
      });
    }
  }, [getChannel, channelId]);


  const handleCreateOrUpdate = (formData) => {
    if (channelId) {
      updateChannel({ variables: { ...formData, channelId } });
    } else {
      createChannel({ variables: formData });
    }

    f7.dialog.preloader('Creating channel');
  };

  return (
    <Page>
      <Header title={title} />
      {
        !loading && (
          <Create
            name={name}
            isPrivate={isPrivate}
            avatar={avatar}
            about={about}
            createChannel={handleCreateOrUpdate}
            isEdit={Boolean(channelId)}
            isOwner={userId === storage.payload.id}
          />
        )
      }
    </Page>
  );
};

CreateChannel.defaultProps = {
  channelId: undefined,
};

CreateChannel.propTypes = {
  $f7router: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  channelId: PropTypes.oneOfType([PropTypes.string, () => undefined]),
};

export default CreateChannel;
