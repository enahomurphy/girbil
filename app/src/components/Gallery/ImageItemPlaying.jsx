import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';
import { Icon, Link } from 'framework7-react';

import { Title } from '@/components/Style';
import { PlayingItem, RepliesInfo } from './style';
import { Chevron } from '../Icon';

const ImageRecordingItem = ({
  createdAt, sender, state, replyCount, onReplyClicked,
}) => (['playing', 'pause'].includes(state) ? (
  <PlayingItem>
    {state === 'pause' && (
      <Icon
        f7="play_fill"
        color="#ffffff"
        style={{ fontSize: '32px', color: '#ffffff' }}
      />
    )}
    {state === 'playing' && (
      <Icon
        f7="pause_fill"
        color="#ffffff"
        style={{ fontSize: '32px', color: '#ffffff' }}
      />
    )}
    <Title
      size="14px"
      margin="0 0 0 0"
      width="fit-content"
      transform="capitalize"
      align="center"
    >
      {sender.name}
    </Title>
    <Title
      weight="600"
      size="14px"
      margin="0 0 0 0"
      width="100px"
      align="center"
    >
      {format(createdAt)}
    </Title>
    {
      Boolean(replyCount) && (
        <Link onClick={
          (e) => {
            onReplyClicked();
            e.stopPropagation();
          }
        }
        >
          <RepliesInfo>
            <Title>{`${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}</Title>
            <span>
              <Chevron />
            </span>
          </RepliesInfo>
        </Link>
      )
    }
  </PlayingItem>
) : null);

ImageRecordingItem.propTypes = {
  onReplyClicked: PropTypes.func.isRequired,
  sender: PropTypes.object.isRequired,
  state: PropTypes.string.isRequired,
  replyCount: PropTypes.number.isRequired,
  createdAt: PropTypes.oneOfType([Date, PropTypes.number]).isRequired,
};

export default ImageRecordingItem;
