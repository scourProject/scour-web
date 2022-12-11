import { setDoc, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

import { auth, firestore } from './firebase'

import { RegisterData } from '~~/types/auth'

export const register = async (userData: RegisterData) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
    const user = res.user

    const userTemp: any = { ...userData }
    delete userTemp.password

    // Signed in
    const uid = user.uid
    await setDoc(doc(firestore, 'users', uid), userTemp)

    return { status: 200, data: { ...user, ...userTemp, uid } }
  } catch (error: any) {
    console.log(error)

    const errorCode = error.code
    const errorMessage = error.message
    return { status: errorCode, message: errorMessage }
  }
}

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password)
  if (userCredential.user) {
    // Signed in
    const user = userCredential.user

    const profile = await getDoc(doc(firestore, 'users', user.uid))
    return { status: 200, data: { ...user, ...profile.data(), uid: user.uid } }
  } else {
    return { status: 401, message: 'Unauthorized' }
  }
}

export const updateProfile = async (uid: string, data: any) => {
  const profile = await getDoc(doc(firestore, 'users', uid))
  await setDoc(doc(firestore, 'users', uid), { ...profile.data(), ...data })
}

export const fetchProfile = async (uid: string) => {
  const profile = await getDoc(doc(firestore, 'users', uid))
  return profile.data()
}

export const addLikedPerson = (uid: string, likedPerson: string) => {
  const docRef = doc(firestore, 'users', uid)
  updateDoc(docRef, {
    likedPeople: arrayUnion(likedPerson),
  })
}

export const addDislikedPerson = (uid: string, dislikedPerson: string) => {
  const docRef = doc(firestore, 'users', uid)
  updateDoc(docRef, {
    dislikedPeople: arrayUnion(dislikedPerson),
  })
}
