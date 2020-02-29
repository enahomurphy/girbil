import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useClickAway } from 'react-use';
import { Button } from 'framework7-react';

import { Title } from '@/components/Style';

import { OptionsContainer, ReactionContainer, StyledButton } from './style';

const IconWithOptions = ({
  onClick, vertical, reaction, options, icon, height, isEmoji, tooltip,
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
    <ReactionContainer ref={ref} height={height} reaction={reaction} vertical={vertical}>
      {
        reaction && (
          <StyledButton active={showEmoji} onClick={onClickReaction}>
            { icon }
          </StyledButton>
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
                  tooltip={tooltip ? option.value : ''}
                  onClick={() => onClick(option)}
                >
                  <Title
                    width="24px"
                    padding="0"
                    margin="0"
                    size={isEmoji ? '24px' : '12px'}
                    color="#ffffff"
                  >
                    {option.name}
                  </Title>
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
  height: '250px',
  isEmoji: true,
  tooltip: true,
};

IconWithOptions.propTypes = {
  onClick: PropTypes.func.isRequired,
  reaction: PropTypes.bool,
  vertical: PropTypes.bool,
  options: PropTypes.array.isRequired,
  icon: PropTypes.element.isRequired,
  height: PropTypes.string,
  isEmoji: PropTypes.bool,
  tooltip: PropTypes.bool,
};

export default IconWithOptions;
