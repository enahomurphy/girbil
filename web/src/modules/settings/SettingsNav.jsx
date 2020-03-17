import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { storage } from '@shared/lib';

import {
  Flex, Title, Text, Image,
} from '@/components/styles';

import links from './links';

import { NavBar, UserInfo, NavLinks } from './style';

const SettingsNav = () => {
  const { pathname } = useLocation();

  return (
    <NavBar align="flex-start" direction="column">
      <UserInfo width="100%">
        <Image src={storage.payload.avatar} />
        <Flex direction="column" margin="0 0 0 16px">
          <Text>SIGNED IN AS</Text>
          <Title
            line="18px"
            transform="capitalize"
            width="100%"
            size="14px"
          >
            John doe
          </Title>
        </Flex>
      </UserInfo>
      <NavLinks>
        {
          links.map(({ id, name, subLinks }) => (
            <div className="nav" key={id}>
              <Title size="14px">{name}</Title>
              {
                Boolean(subLinks && subLinks.length) && (
                  <ul>
                    {
                      subLinks.map(subLink => (
                        <Link
                          className={pathname === subLink.link ? 'active' : ''}
                          key={subLink.id}
                          to={subLink.link}
                        >
                          <li>{subLink.name}</li>
                        </Link>
                      ))
                    }
                  </ul>
                )
              }
            </div>
          ))
        }
      </NavLinks>
      <div
        role="presentation"
        onClick={() => {
          storage.clear();
          window.location.href = '/';
        }}
      >
        <Text
          transform="capitalize"
          siz="14px"
          color="#ffffff"
          cursor="pointer"
        >
          Sign out
        </Text>
      </div>
    </NavBar>
  );
};

export default SettingsNav;
