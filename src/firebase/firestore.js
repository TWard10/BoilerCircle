import { fs } from './firebase';

export const addUser = (id, username, email) =>
  fs.collection('users').doc(id).set({
      displayName: username,
      email: email,
      friends: [],
      interests: [],
      photoURL: "none",
      uid: id
  })

  export const updateUserInfo = (id, username, photo) =>
    fs.collection('users').doc(id).update({
      displayName: username,
      photoURL: photo
    })

    export const updateUserInterests = (id, newInterests) =>
      fs.collection('users').doc(id).update({
        interests: newInterests
      })

  export const getUser = (id) =>
    fs.collection('users').doc(id).get()
