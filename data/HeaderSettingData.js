import React from 'react';
import SettingScreen from '../screens/MenuScreen';
export const SECTIONS = [
  {
    header: 'General',
    icon: 'settings',
    items: [
      {icon: 'globe', color: 'black', label: 'Language', type: 'link'},
      {
        icon: 'bell',
        color: 'black',
        label: 'Notification Settings',
        value: false,
        type: 'link',
      },
      {
        id: 1,
        icon: 'location-arrow',
        color: 'black',
        label: 'Location',
        type: 'boolean',
      },
      {
        id: 2,
        icon: 'moon',
        color: 'black',
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
        color: 'black',
        label: 'Privacy & Security',
        value: false,
        type: 'link',
      },
      {icon: 'sign-out-alt', color: 'black', label: 'Log Out', type: 'link'},
    ],
  },
  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      {icon: 'flag', color: 'black', label: 'Report Bug'},
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
        color: 'black',
        label: 'Privacy Policy',
      },
      {
        icon: 'flag',
        color: 'black',
        label: 'Terms and Conditions',
      },
      {icon: 'check-circle', color: 'black', label: 'Versions'},
      {
        icon: 'star',
        color: 'black',
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
