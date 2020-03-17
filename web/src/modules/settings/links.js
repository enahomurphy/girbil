export default [
  {
    id: 1,
    name: 'account',
    subLinks: [
      {
        id: 1,
        name: 'account management',
        link: '/settings/management',
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
        link: '/settings/organization',
      },
      {
        id: 2,
        name: 'users & permissions',
        link: '/settings/users/permissions',
      },
      {
        id: 3,
        name: 'plan & billing',
        link: '/settings/billing',
      },
    ],
  },
];
