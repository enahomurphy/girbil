import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import emojis from '../Emoji/emojis';

const ReactionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  z-index: 10000;
  align-items: center;
`;

const Reaction = styled.span`
  padding: 3px 8px;
  margin: 0 2px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
`;

const Reactions = ({
  reactions = [],
  handleReact,
}) => {
  const getEmojiByValue = (value) => emojis.find((i) => i.value === value);

  return (
    <ReactionContainer>
      {reactions && reactions.map(({ reaction, count, userReacted }) => (
        <Reaction
          style={{ background: userReacted ? '#0A84FF' : '#222222' }}
          key={reaction}
          onClick={() => handleReact({ value: getEmojiByValue(reaction).value })}>
          {`${getEmojiByValue(reaction).name}${count}`}
        </Reaction>
      ))}
    </ReactionContainer>
  );
};

Reactions.defaultProps = {
  reactions: [],
};

Reactions.propTypes = {
  reactions: PropTypes.array,
  handleReact: PropTypes.func.isRequired,
};

export default Reactions;
