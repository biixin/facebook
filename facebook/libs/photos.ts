import { Photo } from "../types/photo";
import { storage } from '../services/firebase';
import { ref, listAll, getDownloadURL, uploadBytes, getMetadata, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';

export const insert = async (file: File) => {
    for (let i in file as File) {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {

            let randomName = v4();
            let newFile = ref(storage, `images/${randomName}`);

            let upload = await uploadBytes(newFile, file);
            let photoUrl = await getDownloadURL(upload.ref);

            return { id: upload.ref.fullPath, name: upload.ref.name, url: photoUrl } as Photo;

        } else {
            return new Error('Tipo de arquivo inválido');
        }
    }
}

export const deletePhoto = async (id: string) => {
    const DeleteRefFile = ref(storage, id);
    return await deleteObject(DeleteRefFile);
}