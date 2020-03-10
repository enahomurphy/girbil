import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';

import { Title } from '@/components/Style';
import { Pause } from '@/components/Icon';
import { PlayingItem } from './style';

const ImageRecordingItem = ({ sender }) => (
  <PlayingItem>
    <Pause />
    <Title
      size="14px"
      margin="0 0 0 8px"
      width="fit-content"
      transform="capitalize"
    >
      {sender.name}
    </Title>
    <Title
      weight="600"
      size="14px"
      margin="0 0 0 8px"
      width="100px"
    >
      {format(sender.createdAt)}
    </Title>
  </PlayingItem>
);

ImageRecordingItem.propTypes = {
  sender: PropTypes.object.isRequired,
};

export default ImageRecordingItem;
