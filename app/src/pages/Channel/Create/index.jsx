import React, { useEffect, useState } from 'react';
import {
  useMutation, useLazyQuery, useQuery, useApolloClient,
} from '@apollo/client';
import { Page, f7 } from 'framework7-react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Header from '@/components/Header';
import GifRecorder from '@/components/Recorder/GifRecorder';
import { mutation, query } from '@shared/graphql/channels';
import { query as conversationQuery } from '@shared/graphql/conversations';
import { query as uploadQuery } from '@shared/graphql/upload';
import { get, storage, pick } from '@shared/lib';
import { blobToFile } from '@/lib/media';
import Create from './Create';

const CreateChannel = ({ $f7router, title, channelId }) => {
  const onError = () => f7.dialog.close();
  const [openRecorder, setOpenRecord] = useState(false);
  const [createChannel] = useMutation(
    mutation.CREATE_CHANNEL,
    { onError },
  );
  const [updateChannel] = useMutation(
    mutation.UPDATE_CHANNEL,
    { onError },
  );
  const [getChannel, { data, loading }] = useLazyQuery(query.CHANNEL);
  const { refetch: refetchURL } = useQuery(uploadQuery.CHANNEL_UPLOAD_URL, {
    fetchPolicy: 'network-only',
    skip: true,
  });

  const client = useApolloClient();
  const [channelAvatar, setChannelAvatar] = useState({ blob: '', url: '' });
  const {
    name = '',
    about = '',
    isPrivate = false,
    avatar = channelAvatar.url,
    userId,
  } = get(data, 'channel', {});

  useEffect(() => {
    if (channelId) {
      getChannel({ variables: { channelId } });
    }
  }, [getChannel, channelId]);


  const handleAvatarChange = async (blob, uploadId) => {
    try {
      const result = await refetchURL({ channelId: uploadId });
      const { postURL, getURL } = get(result, 'data.getChannelUploadURL', {});
      const file = blobToFile([blob], uploadId);

      await axios({
        method: 'put',
        url: postURL,
        data: file,
        headers: { 'content-type': file.type },
      });

      await updateChannel({
        variables: {
          avatar: getURL,
          channelId: uploadId,
        },
      });

      client.cache.modify(
        client.cache.identify({ __typename: 'Channel', id: uploadId }),
        {
          avatar() {
            return getURL;
          },
        },
      );
    } catch (error) {
      // @TODO
      // send this to bug snag
    } finally {
      f7.dialog.close();
    }
  };

  const update = async (_, {
    data: {
      createChannel: createdChannel,
      updateChannel: updatedChannel,
    },
  }) => {
    const channel = (createdChannel || updatedChannel);
    if (channelAvatar.blob) {
      handleAvatarChange(channelAvatar.blob, channel.id);
      $f7router.navigate(`/conversations/${channel.conversation.id}`);
    } else {
      f7.dialog.close();
      $f7router.navigate(`/conversations/${channel.conversation.id}`);
    }
  };

  const handleCreateOrUpdate = async (formData) => {
    f7.dialog.preloader('Creating channel');
    const variables = pick(formData, ['name', 'about', 'isPrivate']);
    const refetchQueries = [{ query: conversationQuery.USER_CONVERSATIONS }];

    if (channelId) {
      await updateChannel({
        variables: { ...variables, channelId },
        update,
        refetchQueries,
      });
    } else {
      await createChannel({
        variables,
        update,
        refetchQueries,
      });
    }

    f7.dialog.close();
  };

  const handleChannelImage = (blob, url) => {
    setChannelAvatar({ blob, url });
    setOpenRecord(false);
  };

  return (
    <Page>
      <Header title={title} />
      {
        !loading && (
          <Create
            name={name}
            isPrivate={isPrivate}
            about={about}
            createChannel={handleCreateOrUpdate}
            isEdit={Boolean(channelId)}
            isOwner={userId === storage.payload.id}
            onImageClick={() => setOpenRecord(true)}
            avatar={channelAvatar.url || avatar}
          />
        )
      }
      <GifRecorder
        onClose={() => { setOpenRecord(false); }}
        onFile={handleChannelImage}
        opened={openRecorder}
      />
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
