import {
  deleteDoc,
  doc,
  addDoc,
  collection,
  updateDoc,
  deleteField,
} from 'firebase/firestore'; // Import the necessary package
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithRedirect,
} from 'firebase/auth';
import { fireStore, auth, provider } from '../firebase/firebaseConfig';

// handle submit
export const handleSubmit = async (data) => {
  try {
    const docRef = await addDoc(collection(fireStore, data.uid), {
      content: data.content,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// handle update
export const handleUpdate = async (data, id) => {
  console.log(data);
  try {
    const docRef = await addDoc(collection(fireStore, 'dairy'), {
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      uid: data.uid,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// handle delete
export const handleDelete = async (data) => {
  const collectionId = data.uid;
  const docId = data.Id;
  try {
    const dataRef = await deleteDoc(doc(fireStore, collectionId, docId));
    await updateDoc(dataRef, {
      collectionId: deleteField(),
    });
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

// handle delete node

export const handleDeleteNode = async (data) => {
  try {
    await deleteDoc(doc(fireStore, data.uid));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

// handle create user
export const handleCreateUser = async (email, password, logInSuccessful) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      logInSuccessful();
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
      // ..
    });
};

// handle login user
export const handleLoginUser = async (email, password, logInSuccessful) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      logInSuccessful();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
    });
};

// handle logout user
export const handleLogoutUser = async () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      window.location.reload();
    })
    .catch((error) => {
      // An error happened.
      throw new Error("Couldn't logout", error);
    });
};

// handle google login with redirect
export const handleGoogleLoginWithRedirect = async () => {
  signInWithRedirect(auth, provider);
};
