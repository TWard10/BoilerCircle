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

export const updateUsername = (id, username) =>
  fs.collection('users').doc(id).update({
    displayName: username
  })

export const updatePhoto = (id, photo) =>
  fs.collection('users').doc(id).update({
    photoURL: photo
  })

    export const updateUserInterests = (id, newInterests) =>
      fs.collection('users').doc(id).update({
        interests: newInterests
      })

     
  
export const addPost = (id, displayName, title, description, tags) =>
  fs.collection('posts').doc().set({
    title: title,
    displayName: displayName,
    description: description,
    tags: tags,
    uid: id
  }).then(function() {
    console.log("Document successfully written!");
})

export const getUser = (id) =>
  fs.collection('users').doc(id).get()


