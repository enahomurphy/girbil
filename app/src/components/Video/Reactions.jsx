import React from 'react';
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
  reactions
}) => {
  const reactionsWithCount = reactions && reactions.reduce((acc, value) => {
    let emoji = emojis.find(i => i.value === value.reaction);
    acc[emoji.name] = acc[emoji.name] ? acc[emoji.name]++ : 1;
    return acc;
  }, {}) || [];

  return (
    <ReactionContainer>
      {Object.keys(reactionsWithCount).map(key => (
        <span>{`${key}${reactionsWithCount[key]}`}</span>
      ))}
    </ReactionContainer>
  );
}

export default Reactions;
