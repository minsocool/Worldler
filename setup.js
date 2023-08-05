import React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCo355UETvbhNFXmOgkqeIvpPJ3ACd6jSQ',
  authDomain: 'worldler-authenication.firebaseapp.com',
  projectId: 'worldler-authenication',
  storageBucket: 'worldler-authenication.appspot.com',
  messagingSenderId: '530997850918',
  appId: '1:530997850918:web:769c35868926be827e87e7',
  measurementId: 'G-RX7QW2JP02',
};

if (!firebase.app.length) {
  firebase.initializeApp(firebaseConfig);
}

export default () => {
  return {firebase, auth};
};
