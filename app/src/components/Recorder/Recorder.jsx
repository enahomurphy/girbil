import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useVideo } from 'react-use';
import { Popup } from 'framework7-react';

import { BackIcon } from '@/components/Video/style';
import { Video as VideoComponent } from '@/components/Video';

import RecorderButton from './ReorderButton';
import EmptyState from './EmptyState';
import { Back } from '../Icon';

export const NewMessageWrapper = styled.div`
  position: relative;
  height: calc(100vh - var(--gb-message-height));
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Recorder = ({ opened }) => {
  const [isOpen, setOpened] = useState(opened);
  const [video] = useVideo({ id: 'video-popup', width: '376px', height: '676px' });


  useEffect(() => {
    setOpened(opened);
  }, [opened]);

  return (
    <Popup style={{ background: '#222222' }} opened={isOpen}>
      <NewMessageWrapper>
        <BackIcon onClick={() => setOpened(false)} margin="16px 0 0 ">
          <Back />
        </BackIcon>
        <RecorderButton onClick={() => {}} recording={false} />
        <VideoComponent video={video} />
      </NewMessageWrapper>
      <div>
        <EmptyState />
      </div>
    </Popup>
  );
};

Recorder.propTypes = {
  opened: PropTypes.bool.isRequired,
};

export default Recorder;
