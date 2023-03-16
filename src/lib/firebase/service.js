import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from './config';

export const useGetDocument = (collectionName) => {
  const [data, getData] = useState([]);
  useEffect(() => {
    const q = query(collection(db, collectionName), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      getData(data);
    });
    return () => unsubscribe();
  }, [collectionName]);
  return data;
}; // lấy dữ liệu

export const getDocuments = async (collectionName) => {
  const querySnapshot = await getDocs(collection(db, collectionName));

  const data = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
}; // lấy danh sách các doc

export const addDocument = (collectionName, data) => {
  addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
  });
}; // thêm doc

export const deleteDocument = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
}; // xóa doc

export const deleteDocuments = async (collectionName, list) => {
  await list.forEach((id) => {
    deleteDoc(doc(db, collectionName, id));
  });
}; // xóa nhiều doc

export const deleteAllDocument = async (collectionName) => {
  await deleteDoc(doc(db, collectionName));
}; // xóa tất cả doc

export const updateDocument = async (collectionName, id, data) => {
  await updateDoc(doc(db, collectionName, id), {
    ...data,
  });
}; // update doc

export const updateAllDocument = async (collectionName, list, data) => {
  await list.forEach((id) => {
    updateDoc(doc(db, collectionName, id), {
      ...data,
    });
  });
}; // update tất cả doc
