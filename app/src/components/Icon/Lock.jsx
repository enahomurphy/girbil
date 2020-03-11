import React from 'react';
import PropTypes from 'prop-types';

const Lock = ({ width, height }) => (
  <svg width={width} height={height} viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M7.875 4H7.3125V2.85714C7.3125 1.25714 6.075 0 4.5 0C2.925 0 1.6875 1.25714 1.6875 2.85714V4H1.125C0.50625 4 0 4.51429 0 5.14286V10.8571C0 11.4857 0.50625 12 1.125 12H7.875C8.49375 12 9 11.4857 9 10.8571V5.14286C9 4.51429 8.49375 4 7.875 4ZM4.5 9.14265C3.88125 9.14265 3.375 8.62836 3.375 7.99979C3.375 7.37122 3.88125 6.85693 4.5 6.85693C5.11875 6.85693 5.625 7.37122 5.625 7.99979C5.625 8.62836 5.11875 9.14265 4.5 9.14265ZM6.2436 4.00047H2.7561V2.85761C2.7561 1.88618 3.5436 1.08618 4.49985 1.08618C5.4561 1.08618 6.2436 1.88618 6.2436 2.85761V4.00047Z" fill="white" />
  </svg>
);

Lock.defaultProps = {
  width: '9',
  height: '12',
};

Lock.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Lock;
