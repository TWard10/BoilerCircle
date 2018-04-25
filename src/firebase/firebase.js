import * as firebase from 'firebase';
import 'firebase/firestore';
var config = {
    apiKey: "AIzaSyAwWoby7yaH7o8MKsunzjeXFy6ly-OdW-Q",
    authDomain: "boilercircle-ecbd4.firebaseapp.com",
    databaseURL: "https://boilercircle-ecbd4.firebaseio.com",
    projectId: "boilercircle-ecbd4",
    storageBucket: "boilercircle-ecbd4.appspot.com",
    messagingSenderId: "798938919270"
  };

firebase.initializeApp(config);
  
  const db = firebase.database();
  const auth = firebase.auth();
  const fs = firebase.firestore();
  //const firestore = firebase.firestore();

export {
    auth,
    db,
    fs
};

