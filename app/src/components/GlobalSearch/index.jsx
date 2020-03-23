import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Popup, Icon } from 'framework7-react';

import { Search } from '@/components/Style';
import Close from '@/components/Icon/Close';

const SearchHeader = styled.div`
  height: 88px;
  border-bottom: 1px solid #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;

  .global-input {
    min-width: 296px;
    margin-right: 16px;
  }
`;

const GlobalSearch = ({ opened, onClose }) => {
  const [isOpen, setOpened] = useState(opened);

  useEffect(() => {
    setOpened(opened);
  }, [opened]);

  return (
    <Popup className="global-search" style={{ background: '#222222' }} opened={isOpen}>
      <SearchHeader>
        <div className="global-input">
          <Search>
            <Icon f7="search" />
            <input
              onChange={console.info}
              placeholder="Search channels and DMs..."
            />
          </Search>
        </div>
        <span
          role="presentation"
          onClick={() => {
            setOpened(false);
            onClose();
          }}
        >
          <Close />
        </span>
      </SearchHeader>
    </Popup>
  );
};

GlobalSearch.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default GlobalSearch;
