import React from 'react';
import styled from 'styled-components';
import { Page, Button } from 'framework7-react';

import {
  Text, Title, Block, Image, Active,
} from '@/components/Style';
import Header from '@/components/Header';

const StyleButton = styled(Button)`
  border: 2px solid #FFFFFF;
  box-sizing: border-box;
  border-radius: 6px;
  width: 152px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
`;

const ProfileOrg = styled(Title)`
  background: #0A84FF;
  width: 100%;
  text-align: left;
  padding: 8px 0 8px 21px;
`;

const Profile = () => (
  <Page name="profile">
    <Header title="Team Member Profile" />
    <Block>
      <Image src="https://i.picsum.photos/id/1/376/375.jpg" />
      <ProfileOrg>Unbird member</ProfileOrg>
    </Block>
    <Block type="flex" margin="24px">
      <StyleButton>Message</StyleButton>
    </Block>
    <Block
      margin="0 0 24px 24px"
      type="flex"
      justify="center"
      direction="column"
    >
      <Text align="left">Name</Text>
      <Block
        margin="0"
        type="flex"
        justify="flex-start"
        align="center"
      >
        <Title
          width="initial"
          margin="8px 14px 0 0"
          align="left"
        >
          Head of Marketing
        </Title>
        <Active active />
      </Block>
    </Block>
    <Block
      margin="0 0 0 24px"
      type="flex"
      justify="center"
      direction="column"
    >
      <Text align="left">Role</Text>
      <Title
        margin="8px 14px 0 0"
        align="left"
      >
        Head of Marketing
      </Title>
    </Block>
  </Page>
);

export default Profile;
