import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImageStorage = async (file, folder) => {
  const storage = getStorage();
  const storageRef = ref(storage, folder + file.name);

  await uploadBytes(storageRef, file);

  const url = await getDownloadURL(storageRef);

  return url;
};
