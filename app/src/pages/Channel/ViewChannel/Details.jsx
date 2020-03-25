import React from 'react';
import PropTypes from 'prop-types';

import { Title, Block } from '@/components/Style';

const Details = ({ channel }) => (
  <>
    <Block margin="0 0 24px 0">
      <Title
        weight="bold"
        size="12px"
        line="15px"
        margin="0 0 8px 0"
        color="var(--gb-medium-grey)"
      >
        Name
      </Title>
      <Title size="14px">{`#${channel.name}`}</Title>
    </Block>

    {
      Boolean(channel.about) && (
        <Block margin="0 0 24px 0">
          <Title
            weight="bold"
            size="12px"
            line="15px"
            margin="0 0 8px 0"
            color="var(--gb-medium-grey)"
          >
            Description (optional)
          </Title>
          <Title width="290px" size="14px">{channel.about}</Title>
        </Block>
      )
    }
    <Block margin="0 0 24px 0">
      <Title
        weight="bold"
        size="12px"
        line="15px"
        margin="0 0 8px 0"
        color="var(--gb-medium-grey)"
      >
        Private or public
      </Title>
      <Title size="14px">{channel.isPrivate ? 'private' : 'public'}</Title>
    </Block>
  </>
);


Details.propTypes = {
  channel: PropTypes.object.isRequired,
};

export default Details;
