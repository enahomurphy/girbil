import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Page } from 'framework7-react';

import ProfileImage from '@/components/ProfileImage';
import Header from '@/components/Header';
import Recorder from '@/components/Recorder/GifRecorder';
import { Title, Block } from '@/components/Style';
import { query as conversationQuery } from '@shared/graphql/conversations';
import { query as userQuery, mutation as userMutation } from '@shared/graphql/user';

import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { get, storage } from '@shared/lib';
import ProfileInfo from './ProfileInfo';
import ProfileUpdate from './ProfileUpdate';

const ProfileOrg = styled(Title)`
  background: #0A84FF;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 21px;
`;

const Profile = ({ userId, $f7router }) => {
  const [edit, setEdit] = useState(false);
  const [editImage, setProfileImage] = useState(false);
  const { data, refetch } = useQuery(userQuery.USER, { variables: { userId } });
  const [getConversation] = useLazyQuery(
    conversationQuery.GET_USER_CONVERSATION_OR_CREATE, {
      onCompleted: ({ getUserConversationOrCreate: { id } }) => {
        $f7router.navigate(`/conversations/${id}/`);
      },
      fetchPolicy: 'network-only',
    },
  );
  const [updateUser, { loading: updatingUser }] = useMutation(userMutation.UPDATE_USER);

  const user = get(data, 'user', {
    id: '',
    organization: {
      name: '',
      position: '',
    },
  });

  const isUser = storage.payload.id === user.id;

  const handleMessage = async () => getConversation({ variables: { userId } });

  const onSaveProfile = (formData) => {
    updateUser({
      variables: { ...formData, userId: user.id },
      update: () => {
        refetch();
        setEdit(false);
      },
    });
  };

  return (
    <Page name="profile">
      <Header title="Team Member Profile" />
      <Block>
        <ProfileImage
          edit
          changeProfile={() => setProfileImage(true)}
          width="100%"
          height="376px"
          url={user.avatar}
        />
        {!edit && <ProfileOrg>{ user.organization.name }</ProfileOrg>}
      </Block>
      {
        !edit ? (
          <ProfileInfo
            onEditProfile={() => setEdit(true)}
            isUser={isUser}
            name={user.name || ''}
            position={user.organization.position || ''}
            handleMessage={handleMessage}
          />
        ) : (
          <>
            <ProfileUpdate
              isUser={isUser}
              onCancelProfile={() => setEdit(false)}
              onSaveProfile={onSaveProfile}
              loading={updatingUser}
              name={user.name || ''}
              position={user.organization.position || ''}
            />
          </>
        )
      }
      <Recorder opened={editImage} />
    </Page>
  );
};

Profile.propTypes = {
  userId: PropTypes.string.isRequired,
  $f7router: PropTypes.object.isRequired,
};

export default Profile;
