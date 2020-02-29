import React from 'react';
import PropTypes from 'prop-types';
import { Popover, ListItem } from 'framework7-react';

import Emoji from '@/components/Emoji';
import { Icon, Link } from '@/components/Style';
import { RecordingInfo, RecordingInfoContainer, ImageItemOption } from './style';

const ImageItemInfo = ({ recording }) => !recording && (
  <RecordingInfoContainer>
    <RecordingInfo />
    <div>
      <Link popoverOpen=".popover-menu">
        <Icon f7="ellipsis_vertical" color="#ffffff" />
      </Link>
      <Popover className="popover-menu">
        <ImageItemOption>
          <ListItem link="#" popoverClose>
            <Emoji reaction={false} vertical={false} onClick={() => {}} />
          </ListItem>
          <ListItem popoverClose title="Start a thread" />
          <ListItem popoverClose title="Mark as unwatched" />
        </ImageItemOption>
      </Popover>
    </div>
  </RecordingInfoContainer>
);

ImageItemInfo.propTypes = {
  recording: PropTypes.bool.isRequired,
};

export default ImageItemInfo;
