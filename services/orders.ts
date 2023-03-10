import { doc, addDoc, getDoc, getDocs, collection, query, where, serverTimestamp, orderBy } from 'firebase/firestore'
import { OrderCreate } from '~~/types/orders'
import { firestore } from './firebase'
import { getStorage, ref, uploadBytes } from 'firebase/storage'


export const createOrder = async (ad: OrderCreate) => {
    const res = await addDoc(collection(firestore, 'Order'), { ...ad, createdAt: serverTimestamp() })
    return res
}

export const getOrders = async () => {
    const q = query(collection(firestore, 'Order',), orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    const orders = querySnapshot.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id }
    })
    return orders
}

export const getOrder = async (id: string) => {
    const docRef = await getDoc(doc(firestore, 'Order', id))
    return docRef.data()
}


export const orderImageUpload = (file: any, filename: string) => {
    const storage = getStorage()
    const storageRef = ref(storage, `images/${filename}`)
    return uploadBytes(storageRef, file)
}


