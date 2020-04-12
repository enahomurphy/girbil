import React from 'react';
import PropTypes from 'prop-types';
import { useCopyToClipboard } from 'react-use';
import { storage } from '@shared/lib';
import { invitePeopleOpener } from '@/lib';

import Close from '@/components/Icon/Close';
import {
  InviteContainer, InviteForm, InviteInput, InviteButton, CloseContainer,
} from './style';

const InviteWidget = ({ hideWidget }) => {
  const [state, copyToClipboard] = useCopyToClipboard();
  const url = `${process.env.WEB_URL}/invite?token=${storage.token}`;

  return (
    <InviteContainer>
      <CloseContainer onClick={hideWidget} className="pointer">
        <Close small />
      </CloseContainer>
      <span style={{ fontWeight: '600', fontSize: '18 ' }}>
        <span aria-label="fist" role="img">🤜🏻🤛🏻</span>
        Add a few teammates
      </span>
      <span>Girbil is more valuable with friends</span>
      <InviteForm>
        <InviteInput value={url} onChange={() => {}} />
        <InviteButton
          onClick={() => copyToClipboard(url)}
          className="pointer"
          type="button"
        >
          {state.value ? 'Copied' : 'Copy Link'}
        </InviteButton>
      </InviteForm>
      <span role="button" className="pointer" onClick={invitePeopleOpener}>+ More invite options</span>
    </InviteContainer>
  );
};

InviteWidget.propTypes = {
  hideWidget: PropTypes.func.isRequired,
};

export default InviteWidget;
