import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { FIREBASE_API } from '../../config-global';

// const firebaseConfig = FIREBASE_API;

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

const firebaseConfig = {
  projectId: 'testbanhang',
  storageBucket: 'testbanhang.appspot.com',
  host: 'localhost',
  port: 8080,
  ssl: false,
}; // cấu hình firebase emulators

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
connectFirestoreEmulator(db, 'localhost', 8080);
connectStorageEmulator(storage, 'localhost', 9199);
