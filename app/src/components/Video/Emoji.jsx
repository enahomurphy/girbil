import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'framework7-react';

import { Reaction } from '@/components/Icon';
import styled from 'styled-components';

const EmojiContainer = styled.div`
  width: 40px;
  height: 250px;
  background-color: #222222;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 60px;
  right: 10px;
 
  .button {
    margin: 0;
    width: 24px;
    font-size: 24px;
    background-color: transparent;
    border-radius: 0px;
    border-bottom: ${({ last }) => (last ? 'none' : '1px solid #ffffff')};
  }

  .last {
    border-bottom: none;
  }
`;

const ReactionContainer = styled.div`
  position: relative;
`;

const emojis = [
  {
    name: 'like',
    value: '👍',
  },
  {
    name: 'love',
    value: '❤',
  },
  {
    name: 'funny',
    value: '😁',
  },
  {
    name: 'sad',
    value: '😔',
  },
  {
    name: 'thanks',
    value: '🙏',
  },
  {
    name: 'bunny',
    value: '🐭',
  },
];

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
              {emoji.value}
            </Button>
          ))
        }
      </EmojiContainer>
    </ReactionContainer>
  );
};

Emoji.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Emoji;
