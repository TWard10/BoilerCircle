import { fs } from './firebase';

export const addUser = (id, username, email) =>
  fs.collection('users').doc(id).set({
      displayName: username,
      email: email,
      friends: [],
      photoURL: "none",
      uid: id
  })
