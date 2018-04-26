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
    Date: Date.now(),
    uid: id
  }).then(function() {
    console.log("Document successfully written!");
})

export const getPeople = (name) =>
  fs.collection('users').where('displayName', '==', name).get()

export const addFriend = (id, friends) =>
  fs.collection('users').doc(id).update({
    friends: friends
  })

export const getPosts = (id, tag) =>
  fs.collection('posts').where(tag).orderBy(Date).get()

export const getUser = (id) =>
  fs.collection('users').doc(id).get()


