import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';
import { Button } from 'framework7-react';
import { Text } from '@/components/Style';

import { OptionsContainer, ReactionContainer } from './style';

const IconWithOptions = ({
  onClick, vertical, reaction, options, icon,
}) => {
  const [showEmoji, setShowEmoji] = useState(!reaction);
  const ref = useRef(null);

  useClickAway(ref, () => {
    if (reaction) {
      setShowEmoji(false);
    }
  });

  const onClickReaction = () => {
    setShowEmoji(!showEmoji);
  };

  return (
    <ReactionContainer ref={ref} reaction={reaction} vertical={vertical}>
      {
        reaction && (
          <Button style={{ height: '35px' }} onClick={onClickReaction}>
            { icon }
          </Button>
        )
      }
      {
        showEmoji && (
          <OptionsContainer reaction={reaction} vertical={vertical}>
            {
              options.map((option, index) => (
                <Button
                  key={option.name}
                  className={index === (options.length - 1) ? 'last' : ''}
                  tooltip={option.name}
                  onClick={() => onClick(option)}
                >
                  <Text
                    width="24px"
                    padding="0"
                    margin="0"
                    size="24px"
                  >
                    {option.value}
                  </Text>
                </Button>
              ))
            }
          </OptionsContainer>
        )
      }
    </ReactionContainer>
  );
};

IconWithOptions.defaultProps = {
  vertical: false,
  reaction: false,
};

IconWithOptions.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool,
  vertical: PropTypes.bool,
  options: PropTypes.array.isRequired,
  icon: PropTypes.element.isRequired,
};

export default IconWithOptions;
