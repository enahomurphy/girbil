import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { List } from 'framework7-react';
import { Search } from '@/components/Icon';

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

const DefaultSearchList = ({ title, options }) => (
  <List style={{ marginLeft: '42px', display: 'flex', flexDirection: 'column' }}>
    <div style={{ fontSize: '14px', color: '#999999', margin: '0 0 17px 0' }}>
      {title}
    </div>
    {
      options.map(({
        text, onClick,
      }) => (
        <ListItem>
          <Search />
          <div role="presentation" style={{ fontSize: '18px', marginLeft: '8px' }} onClick={onClick}>
            {text}
          </div>
        </ListItem>
      ))
    }
  </List>
);

DefaultSearchList.propTypes = {
  title: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
};

export default DefaultSearchList;
