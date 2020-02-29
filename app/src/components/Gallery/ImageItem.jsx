import React from 'react';
import PropTypes from 'prop-types';
import {
  SwiperSlide, Popover, List, ListItem,
} from 'framework7-react';

import { Icon, Link } from '@/components/Style';
import {
  StyledSlide, RecordingInfo, RecordingInfoContainer,
} from './style';

const ImageItem = ({
  onClick, id, thumbnail,
}) => (
  <SwiperSlide key={id}>
    <RecordingInfoContainer>
      <RecordingInfo />
      <div>
        <Link popoverOpen=".popover-menu">
          <Icon f7="ellipsis_vertical" color="#ffffff" />
        </Link>
        <Popover className="popover-menu">
          <List>
            <ListItem link="#" popoverClose title="Dialog" />
            <ListItem link="#" popoverClose title="Tabs" />
            <ListItem link="#" popoverClose>
              <h1>Hello</h1>
            </ListItem>
            <ListItem link="#" popoverClose title="List View" />
            <ListItem link="#" popoverClose title="Form Inputs" />
          </List>
        </Popover>
      </div>
    </RecordingInfoContainer>
    <StyledSlide
      data-background={thumbnail}
      className="swiper-slide swiper-lazy"
      onClick={() => onClick(id)}
    >
      <div className="swiper-lazy-preloader" />
    </StyledSlide>
  </SwiperSlide>
);

ImageItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
};

export default React.memo(ImageItem);
