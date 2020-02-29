import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'framework7-react';
import { Text } from '@/components/Style';

import { Reaction } from '@/components/Icon';
import emojis from './emojis';
import { EmojiContainer, ReactionContainer } from './style';

const Emoji = ({ onClick, vertical, reaction }) => {
  const [showEmoji, setShowEmoji] = useState(false);

  const onClickReaction = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <ReactionContainer reaction={reaction} vertical={vertical}>
      {
        reaction && (
          <Button onClick={onClickReaction}>
            <Reaction />
          </Button>
        )
      }
      <EmojiContainer reaction={reaction} vertical={vertical}>
        {
          emojis.map((emoji, index) => (
            <Button
              key={emoji.name}
              className={index === emojis.length - 1 ? '' : 'last'}
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

Emoji.defaultProps = {
  vertical: false,
  reaction: false,
};

Emoji.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool,
  vertical: PropTypes.bool,
};

export default Emoji;
