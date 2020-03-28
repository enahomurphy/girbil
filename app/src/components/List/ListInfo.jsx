import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge, Link, ListItem, List,
} from 'framework7-react';

import { Block, Popover } from '@/components/Style';

const ListInfo = ({ unreadCount, options, id }) => (
  <Block
    width="60px"
    type="flex"
    align="center"
    justify={unreadCount ? 'space-between' : 'flex-end'}
    padding="0"
  >
    {unreadCount && (<Badge color="red">{unreadCount}</Badge>)}
    {
      Boolean(options && options.length) && (
        <span>
          <Popover width="176px" className={`popover-menu${id}`}>
            <List>
              {
                options.map(({ title, getLink, onClick }) => (
                  <ListItem
                    key={title}
                    link={getLink ? getLink() : '#'}
                    onClick={() => {
                      onClick();
                      // hack to fix popover not been completely removed
                      document.querySelector(`.popover-menu${id}`).remove();
                    }}
                    popoverClose={`.popover-menu${id}`}
                    title={title}
                  />
                ))
              }
            </List>
          </Popover>
          <Link popoverOpen={`.popover-menu${id}`} iconF7="ellipsis_vertical" color="white " />
        </span>
      )
    }
  </Block>
);

ListInfo.propTypes = {
  unreadCount: PropTypes.number.isRequired,
  options: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default ListInfo;
