import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'framework7-react';
import { Text } from '@/components/Style';

import { Reaction } from '@/components/Icon';
import emojis from './emojis';
import { EmojiContainer, ReactionContainer } from './style';

const Emoji = ({ onClick }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const onClickReaction = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <ReactionContainer>
      <Button onClick={onClickReaction}>
        <Reaction />
      </Button>
      <EmojiContainer>
        {
          emojis.map((emoji, index) => (
            <Button
              key={emoji.name}
              className={index === emojis.length - 1 && 'last'}
              tooltip={emoji.name}
              onClick={() => onClick(emoji)}
            >
              <Text
                width="24px"
                padding="0"
                margin="0"
                size="24px"
              >
                {emoji.value}
              </Text>
            </Button>
          ))
        }
      </EmojiContainer>
    </ReactionContainer>
  );
};

Emoji.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool.isRequired,
  vertical: PropTypes.bool.isRequired,
};

export default Emoji;
