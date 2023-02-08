import { doc, addDoc, getDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore'
import { ObjectCreate } from '~~/types/objects'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { firestore } from './firebase'



export const createObject = async (ad: ObjectCreate) => {
    const res = await addDoc(collection(firestore, 'Object'), { ...ad, createdAt: serverTimestamp() })
    return res
}

export const getObjects = async () => {
    const q = query(collection(firestore, 'Object'))
    const querySnapshot = await getDocs(q)
    const customers = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id }
    })
    return customers
}

export const getObject = async (id: string) => {
    const docRef = await getDoc(doc(firestore, 'Object', id))
    return docRef.data()
}

export const getObjectsByCustomer = async (uid: string) => {
    const q = query(collection(firestore, 'Object'), where('CustomerID', '==', uid))
    const querySnapshot = await getDocs(q)
    const objects = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id }
    })
    return objects
}

export const objectImageUpload = (file: any, filename: string) => {
    const storage = getStorage()
    const storageRef = ref(storage, `objects/${filename}`)
    return uploadBytes(storageRef, file)
}

