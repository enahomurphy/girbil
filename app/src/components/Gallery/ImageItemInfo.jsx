import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListItem } from 'framework7-react';

// import Emoji from '@/components/Emoji';
import { Icon, Link } from '@/components/Style';
import { RecordingInfo, RecordingInfoContainer, ImageItemOption } from './style';

const ImageItemInfo = ({ recording, pullover }) => !recording && (
  <RecordingInfoContainer>
    <RecordingInfo />
    <div>
      <Link popoverOpen=".popover-menu">
        <Icon f7="ellipsis_vertical" color="#ffffff" />
      </Link>
      <Popover className="popover-menu">
        <ImageItemOption>
          {
            pullover.map(({ Component, type, ...props }) => (
              <ListItem popoverClose key={type} {...props}>
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
};

export default ImageItemInfo;
