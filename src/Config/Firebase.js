import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAY4ySXZKfUUOwQ9qpjzwatXHBWjSatdWI",
    authDomain: "bandwagon-239423.firebaseapp.com",
    databaseURL: "https://bandwagon-239423.firebaseio.com",
    projectId: "bandwagon-239423",
    storageBucket: "bandwagon-239423.appspot.com",
    messagingSenderId: "968888369023",
    appId: "1:968888369023:web:f5f10946b5bd2295"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;