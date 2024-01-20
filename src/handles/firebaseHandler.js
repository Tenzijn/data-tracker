import {
  deleteDoc,
  getDocs,
  doc,
  addDoc,
  collection,
} from 'firebase/firestore'; // Import the necessary package
import { fireStore } from '../firebase/firebaseConfig';

export const handleSubmit = async (data) => {
  try {
    const docRef = await addDoc(collection(fireStore, 'dairy'), {
      title: data.title,
      content: data.content,
      date: data.date,
      time: data.time,
      uid: data.uid,
    });
    console.log('data', data);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

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

export const handleDelete = async (id) => {
  try {
    await deleteDoc(doc(fireStore, 'dairy', id));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
};

export const handleFetch = async () => {
  const querySnapshot = await getDocs(collection(fireStore, 'dairy'));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
