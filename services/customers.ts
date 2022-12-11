import { doc, addDoc, getDoc, getDocs, collection, query, where, serverTimestamp } from 'firebase/firestore'
import { CustomerCreate } from '~~/types/customers'

import { firestore } from './firebase'



export const createCustomer = async (ad: CustomerCreate) => {
  const res = await addDoc(collection(firestore, 'Customer'), { ...ad, createdAt: serverTimestamp() })
  return res
}

export const getCustomers = async () => {
  const q = query(collection(firestore, 'Customer'))
  const querySnapshot = await getDocs(q)
  const customers = querySnapshot.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id }
  })
  return customers
}

export const getCustomer = async (id: string) => {
  const docRef = await getDoc(doc(firestore, 'Customer', id))
  return docRef.data()
}


