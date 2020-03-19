import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListItem } from 'framework7-react';

import { Icon, Link } from '@/components/Style';
import { RecordingInfo, RecordingInfoContainer, ImageItemOption } from './style';

const ImageItemInfo = ({ recording, pullover, replyCount }) => !recording && (
  <RecordingInfoContainer>
    <RecordingInfo />
    <div>
      <Link popoverOpen=".popover-menu">
        <Icon f7="ellipsis_vertical" color="#ffffff" />
      </Link>
      <Popover className="popover-menu">
        <ImageItemOption>
          {
            pullover.reduce((acc, { Component, type, ...props }) => {
              if (type === 'thread' && replyCount) return acc;
              acc.push(
                <ListItem popoverClose key={type} {...props}>
                  { Component && <Component /> }
                </ListItem>,
              );
              return acc;
            }, [])
          }
        </ImageItemOption>
      </Popover>
    </div>
  </RecordingInfoContainer>
);

ImageItemInfo.propTypes = {
  recording: PropTypes.bool.isRequired,
  pullover: PropTypes.array.isRequired,
  replyCount: PropTypes.number.isRequired,
};

export default ImageItemInfo;
