import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyB9VOrv542r4r5jhh7-LEBIHHoddgs3xv8",
  authDomain: "alexandre-38200.firebaseapp.com",
  databaseURL: "https://alexandre-38200.firebaseio.com",
  projectId: "alexandre-38200",
  storageBucket: "alexandre-38200.appspot.com",
  messagingSenderId: "1085451408368",
  appId: "1:1085451408368:web:7a64c69d397381a1ed0335",
  measurementId: "G-75J3DX1FMS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;