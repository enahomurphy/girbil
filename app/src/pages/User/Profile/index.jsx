import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Page } from 'framework7-react';

import { Title, Block, Image } from '@/components/Style';
import Header from '@/components/Header';

import ProfileInfo from './ProfileInfo';
import ProfileUpdate from './ProfileUpdate';

const ProfileOrg = styled(Title)`
  background: #0A84FF;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 21px;
`;

const Profile = ({ isUser }) => {
  const [edit, setEdit] = useState(false);

  return (
    <Page name="profile">
      <Header title="Team Member Profile" />
      <Block>
        <Image src="https://i.picsum.photos/id/1/376/375.jpg" />
        {!edit && <ProfileOrg>Unbird member</ProfileOrg>}
      </Block>
      {
        !edit ? (
          <ProfileInfo onEditProfile={() => setEdit(true)} isUser={isUser} />
        ) : (

          <ProfileUpdate
            isUser={isUser}
            onCancelProfile={() => setEdit(false)}
          />
        )
      }
    </Page>
  );
};

Profile.defaultProps = {
  isUser: true,
};

Profile.propTypes = {
  isUser: PropTypes.bool,
};

export default Profile;
