import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'framework7-react';

import {
  Text, Title, Button, Block, BorderedInput,
} from '@/components/Style';
import { StyledButton, StyledAvatar } from '../style';

const Create = ({
  createChannel, name, about, isPrivate, avatar, isOwner, isEdit,
}) => {
  const [form, setForm] = useState({
    name,
    about,
    isPrivate,
    avatar,
  });

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
              value={form.name}
              onChange={({ target }) => setForm({ ...form, name: target.value })}
              placeholder="e.g., introductions"
            />
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
          disabled={Boolean(!form.name)}
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
  avatar: PropTypes.oneOfType([PropTypes.string, () => undefined]),
};

export default Create;
