import React, { useState, useEffect } from 'react';
import { Page, Toggle } from 'framework7-react';
import { useLocalStorage } from 'react-use';
import { Device } from 'framework7';

import Header from '@/components/Header';
import { Title, Block } from '@/components/Style';
import { Video } from '@/lib/media';
import { getRenderer, triggerDock, getStartUpState } from '@/lib/electron';

import Select from './Select';

const Preferences = () => {
  const [devices, setDevices] = useState({});
  const [device, setDevice] = useLocalStorage('gb-device', {});
  const [showDock, setShowDock] = useLocalStorage('gb-dock', true);
  const [openAtLogin, setOpenAtLogin] = useState(false);

  useEffect(() => {
    if (Device.electron) {
      triggerDock(showDock);
      setOpenAtLogin(getStartUpState());
    }
  }, [showDock]);

  useEffect(() => {
    Video.getMediaDevices().then((deviceInfo) => {
      setDevices(deviceInfo);
      const { microphone, video, speaker } = deviceInfo;
      if (!device) {
        setDevice({
          microphone: microphone.length ? microphone[0] : {},
          video: video.length ? video[0] : {},
          speaker: speaker.length ? speaker[0] : {},
        });
      }
    });
  }, [device, setDevice]);

  const handleChange = (whichDevice) => ({ value }) => {
    setDevice({
      ...device,
      [whichDevice]: value,
    });
  };

  return (
    <Page name="settings">
      <Header title="System Preferences" />
      <Block padding="32px 24px 0 24px">
        <Block
          margin="0 0 24px 0"
          type="flex"
          align="center"
          justify="space-between"
        >
          <Title size="14px" margin="0" width="70%">
            Show dock icon
          </Title>
          <Toggle
            onToggleChange={() => setShowDock(!showDock)}
            checked={showDock}
          />
        </Block>
        <Block
          margin="0 0 24px 0"
          type="flex"
          align="center"
          justify="space-between"
        >
          <Title size="14px" margin="0" width="70%">
            Launch Girbil app on startup
          </Title>
          <Toggle
            onToggleChange={(state) => {
              setOpenAtLogin(!state);
              getRenderer().send('open-on-login', !state);
            }}
            checked={openAtLogin}
          />
        </Block>
        {
          Object.keys(devices).map((key) => (
            <Select
              key={key}
              value={device[key]}
              title={key}
              options={devices[key].map((item) => ({
                label: item.label,
                value: item,
              }))}
              onChange={handleChange(key)}
            />
          ))
        }
      </Block>
    </Page>
  );
};

export default Preferences;
