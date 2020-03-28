import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListItem, f7 } from 'framework7-react';

import { Icon, Link } from '@/components/Style';
import { RecordingInfo, RecordingInfoContainer, ImageItemOption } from './style';

const ImageItemInfo = ({
  recording, pullover, hasRead, messageId,
}) => !recording && (
  <RecordingInfoContainer hasRead={hasRead}>
    {!hasRead && <RecordingInfo /> }
    <div>
      <Link popoverOpen={`.popover-menu-${messageId}`}>
        <Icon f7="ellipsis_vertical" color="#ffffff" />
      </Link>
      <Popover className={`popover-menu-${messageId}`}>
        <ImageItemOption>
          {
            pullover.map(({
              Component, type, onClick, ...props
            }) => (
              <ListItem
                onClick={() => {
                  if (onClick) onClick();
                  f7.popover.close(`.popover-menu-${messageId}`);
                }}
                popoverClose
                key={type}
                {...props}
              >
                { Component && <Component /> }
              </ListItem>
            ))
          }
        </ImageItemOption>
      </Popover>
    </div>
  </RecordingInfoContainer>
);

ImageItemInfo.propTypes = {
  recording: PropTypes.bool.isRequired,
  pullover: PropTypes.array.isRequired,
  hasRead: PropTypes.bool.isRequired,
  messageId: PropTypes.string.isRequired,
};

export default ImageItemInfo;
