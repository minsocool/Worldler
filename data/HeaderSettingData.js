export const SECTIONS = [
  {
    header: 'General',
    icon: 'settings',
    items: [
      {icon: 'globe', color: '#1CC7DB', label: 'Language', type: 'link'},
      {
        icon: 'bell',
        color: '#F6B800',
        label: 'Notification Settings',
        value: false,
        type: 'link',
      },
      {
        id: 1,
        icon: 'location-arrow',
        color: '#32c759',
        label: 'Location',
        type: 'boolean',
      },
      {
        id: 2,
        icon: 'moon',
        color: 'gray',
        label: 'Dark-Mode',
        type: 'boolean',
      },
    ],
  },
  {
    header: 'Account & Security',
    icon: 'Profile',
    items: [
      {icon: 'mobile', color: 'black', label: 'Mobile Number', type: 'link'},
      {
        icon: 'lock',
        color: '#14283c',
        label: 'Privacy & Security',
        value: false,
        type: 'link',
      },
    ],
  },
  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      {icon: 'flag', color: '#D22B2B', label: 'Report Bug'},
      {
        icon: 'headphones',
        color: 'black',
        label: 'Help and Support',
      },
    ],
  },
  {
    header: 'Other',
    icon: 'help-circle',
    items: [
      {
        icon: 'shield-alt',
        color: '#0883FF',
        label: 'Privacy Policy',
      },
      {
        icon: 'flag',
        color: 'cyan',
        label: 'Terms and Conditions',
      },
      {icon: 'check-circle', color: 'lime', label: 'Versions'},
      {
        icon: 'star',
        color: 'yellow',
        label: 'Rate Worldler Travel App',
      },
      {
        icon: 'info-circle',
        color: 'black',
        label: 'About Worldler Travel App',
      },
    ],
  },
];
