import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAwWoby7yaH7o8MKsunzjeXFy6ly-OdW-Q",
    authDomain: "boilercircle-ecbd4.firebaseapp.com",
    databaseURL: "https://boilercircle-ecbd4.firebaseio.com",
    projectId: "boilercircle-ecbd4",
    storageBucket: "boilercircle-ecbd4.appspot.com",
    messagingSenderId: "798938919270"
};
var fire = firebase.initializeApp(config);
export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default fire;

