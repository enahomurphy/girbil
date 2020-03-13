import React from 'react';
import PropTypes from 'prop-types';
import { Page, Toggle } from 'framework7-react';

import Header from '@/components/Header';
import {
  Text, Title, Button, Block, BorderedInput,
} from '@/components/Style';
import { StyledButton, StyledAvatar } from './style';

const Create = ({ title }) => (
  <Page>
    <Header title={title} />
    <Block padding="24px 24px">
      <Block>
        <Text margin="0 0 24px 0">
          Channels are spaces for open team communications.
          We recommend organizing them around a topic; e.g., design, marketing, development.
        </Text>
        <BorderedInput>
          <Title>Name</Title>
          <input placeholder="e.g., introductions" />
        </BorderedInput>
        <BorderedInput>
          <Title>Description (optional)</Title>
          <input placeholder="Share what this channel is about" />
        </BorderedInput>
        <Block>
          <Title>Channel title</Title>
          <Text
            size="18px"
            line="23px"
            color="var(--gb-accent)"
            margin="8px 0 0 0"
          >
            Set channel title
          </Text>
          <StyledAvatar>
            <span aria-label="cat" role="img">🐭</span>
          </StyledAvatar>
        </Block>
      </Block>
      <Block margin="32px 0 0 0">
        <Title margin="0 0 10px 0">
          Make private
        </Title>
        <Block type="flex" align="center" justify="space-between">
          <Text margin="0" width="70%">
            When a channel is set to private,
            it can only be viewed or joined by invitation.
          </Text>
          <Toggle defaultChecked />
        </Block>
      </Block>
    </Block>
    <StyledButton>
      <Button
        size="18px"
        width="152px"
        height="40px"
        inverse
      >
        Create
      </Button>
    </StyledButton>
  </Page>
);


Create.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Create;
