import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'framework7-react';
import { useLazyQuery } from '@apollo/client';
import { useDebounce } from 'react-use';
import { get } from '@shared/lib';
import Error from '@/components/Icon/Error';
import {
  Text, Title, Button, Block, BorderedInput, Video, ErrorText,
} from '@/components/Style';
import { query } from '@shared/graphql/channels';
import { StyledButton, StyledAvatar } from '../style';

const Create = ({
  createChannel, name, about, isPrivate, avatar, isOwner, isEdit, onImageClick,
}) => {
  const [form, setForm] = useState({
    name,
    about,
    isPrivate,
  });

  const [channelExists, setChannelExists] = useState(false);

  const [search, { data }] = useLazyQuery(query.CHANNEL_BY_NAME);

  useEffect(() => {
    setForm({
      name, about, isPrivate,
    });
  }, [name, about, isPrivate]);

  useEffect(() => {
    const channelData = get(data, 'channelByName');
    setChannelExists(Boolean(channelData && channelData.id));
  }, [data]);


  useDebounce(() => {
    if (form.name) search({ variables: { name: form.name } });
  },

  500,
  [form.name]);

  return (
    <>
      <Block padding="24px 24px">
        <Block>
          <Text margin="0 0 24px 0">
            Channels are spaces for open team communications.
            We recommend organizing them around a topic; e.g., design, marketing, development.
          </Text>
          <BorderedInput>
            <Title>Name</Title>
            <input
              name="name"
              style={{ borderColor: channelExists ? '#FF4F44' : '#FFFFFF' }}
              value={form.name}
              onChange={({ target }) => setForm({ ...form, name: target.value })}
              placeholder="e.g., introductions"
            />
            {
              channelExists && (
                <ErrorText>
                  <Error />
                  {' '}
                  That channel name already exists. Try another.
                </ErrorText>
              )
            }
          </BorderedInput>
          <BorderedInput>
            <Title>Description (optional)</Title>
            <input
              placeholder="Share what this channel is about"
              name="about"
              value={form.about}
              onChange={({ target }) => setForm({ ...form, about: target.value })}
            />
          </BorderedInput>
          <Block>
            <Title>Channel tile</Title>
            <Text
              onClick={onImageClick}
              size="18px"
              line="23px"
              color="var(--gb-accent)"
              margin="8px 0 0 0"
            >
              Set channel tile
            </Text>
            <StyledAvatar onClick={onImageClick}>
              {
                avatar ? (
                  <Video src={avatar} autoPlay loop muted playsinline />
                ) : (
                  <span aria-label="cat" role="img">🐭</span>
                )
              }
            </StyledAvatar>
          </Block>
        </Block>
        {
          (!isEdit || isOwner) && (
            <Block margin="32px 0 0 0">
              <Title margin="0 0 10px 0">
                Make private
              </Title>
              <Block type="flex" align="center" justify="space-between">
                <Text margin="0" width="70%">
                  When a channel is set to private,
                  it can only be viewed or joined by invitation.
                </Text>
                <Toggle
                  checked={form.isPrivate}
                  onChange={() => setForm({ ...form, isPrivate: !form.isPrivate })}
                />
              </Block>
            </Block>
          )
        }
      </Block>
      <StyledButton>
        <Button
          size="18px"
          width="152px"
          height="40px"
          inverse
          onClick={() => createChannel(form)}
          disabled={Boolean(!form.name || channelExists)}
        >
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </StyledButton>
    </>
  );
};


Create.defaultProps = {
  avatar: undefined,
};

Create.propTypes = {
  createChannel: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  about: PropTypes.string.isRequired,
  isPrivate: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isOwner: PropTypes.bool.isRequired,
  onImageClick: PropTypes.func.isRequired,
  avatar: PropTypes.oneOfType([PropTypes.string, () => undefined]),
};

export default Create;
