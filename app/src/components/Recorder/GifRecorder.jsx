import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useVideo } from 'react-use';
import { Popup } from 'framework7-react';

import { BackIcon } from '@/components/Video/style';
import { Video as VideoComponent } from '@/components/Video';
import { Gif } from '@/lib/media';
import { Title } from '@/components/Style';

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

const Recorder = ({ opened, onFile, onClose }) => {
  const id = 'gif-recorder';
  const [isOpen, setOpened] = useState(opened);
  const [counter, setCounter] = useState(0);

  const [video] = useVideo({
    id, width: '376px', height: '676px', muted: true,
  });
  const [gifRecorder] = useState(new Gif(id));

  useEffect(() => {
    setOpened(opened);
    if (opened) {
      gifRecorder.init();
    }
    return () => {
      if (gifRecorder.file) {
        gifRecorder.reset();
      }
    };
  }, [gifRecorder, opened]);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => {
        if (!gifRecorder.playing) {
          setCounter(0);
        } else {
          setCounter(counter - 1);
        }
      }, 1000);
    }

    if (gifRecorder.playing && counter === 0) {
      gifRecorder.stopRecording();
    }
  }, [counter, gifRecorder]);

  gifRecorder.onStop = (blob, url) => {
    onFile(blob, url);
  };

  const handleRecording = async () => {
    if (!gifRecorder.playing) {
      setCounter(3);
      gifRecorder.startRecording();
    } else if (gifRecorder.playing && counter === 0) {
      try {
        await gifRecorder.stopRecording();
      } catch (error) {
        // @TODO log to bug snag
      } finally {
        setCounter(0);
      }
    }
  };

  const closeRecorder = () => {
    setOpened(false);
    onClose();
    gifRecorder.reset();
  };

  return (
    <Popup style={{ background: '#222222' }} opened={isOpen}>
      <NewMessageWrapper>
        <BackIcon onClick={closeRecorder} margin="16px 0 0 ">
          <Back />
        </BackIcon>
        <RecorderButton
          onClick={handleRecording}
          recording={gifRecorder.playing}
        />
        <VideoComponent video={video} />
      </NewMessageWrapper>
      <div>
        {
          counter ? (
            <Title
              padding="44px 0 44px 0"
              line="60px"
              size="48px"
              align="center"
            >
              {counter}
            </Title>
          ) : (
            <EmptyState />
          )
        }
      </div>
    </Popup>
  );
};

Recorder.defaultProps = {
  onClose: () => {},
};

Recorder.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onFile: PropTypes.func.isRequired,
};

export default Recorder;
