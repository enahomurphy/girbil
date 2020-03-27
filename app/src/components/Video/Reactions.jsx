import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import emojis from '../Emoji/emojis';

export const ReactionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 200px;
  z-index: 10000;
  width: 70%;
  left: 60px;
`;

const Reactions = ({
  reactions,
  handleReact
}) => {

  const getEmojiNameByValue = (value) => emojis.find((i) => i.name === value).value;

  const reactionsWithCount = reactions && reactions.reduce((acc, value) => {
    const emoji = emojis.find((i) => i.value === value.reaction);
    acc[emoji.name] = acc[emoji.name] ? acc[emoji.name] + 1 : 1;
    return acc;
  }, {}) || [];

  return (
    <ReactionContainer>
      {Object.keys(reactionsWithCount).map((key) => (
        <span onClick={() => handleReact({ value: getEmojiNameByValue(key) })}>
          {`${key}${reactionsWithCount[key]}`}
        </span>
      ))}
    </ReactionContainer>
  );
};

Reactions.propTypes = {
  reactions: PropTypes.object.isRequired,
};

export default Reactions;
