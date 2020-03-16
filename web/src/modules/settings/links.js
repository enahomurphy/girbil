export default [
  {
    id: 1,
    name: 'account',
    subLinks: [
      {
        id: 1,
        name: 'account management',
        link: '/organizations/settings/management',
      },
    ],
  },
  {
    id: 2,
    name: 'organization',
    subLinks: [
      {
        id: 1,
        name: 'settings',
        link: '/organizations/settings/setting',
      },
      {
        id: 2,
        name: 'users & permissions',
        link: '/organizations/settings/users/permissions',
      },
      {
        id: 3,
        name: 'plan & billing',
        link: '/organizations/settings/billing',
      },
    ],
  },
];
