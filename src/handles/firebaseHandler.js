import { addDoc, collection } from 'firebase/firestore';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';
import { fireStore, auth, provider } from '../firebase/firebaseConfig';

// handle submit
export const handleSubmit = async (data) => {
  try {
    await addDoc(collection(fireStore, data.uid), {
      content: data.content,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// handle create user
export const handleCreateUser = async (email, password, logInSuccessful) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
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

// handle google login with popup
export const handleGoogleLoginWithPopup = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage + errorCode);
      // The email of the user's account used.
      error.email;
      // The AuthCredential type that was used.
      const credential = error.credential;
      console.log(credential);
      // ...
    });
};
