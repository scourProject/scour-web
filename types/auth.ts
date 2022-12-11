export interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
  avatars: string[]

  country: string
  region: string
  city: string
  phone: string

  gender: string
  age: number
  birthdate: string

  doSmoking: boolean | undefined
  doDrinking: boolean | undefined
  havePets: boolean | undefined

  aboutMe: string

  isVerifiedStudent: boolean
  isTrusted: boolean
  isPublic: boolean
}

export interface UserAdData {
  uid: string
  first_name: string
  last_name: string
  avatars: string[]
  isVerifiedStudent: boolean
  isTrusted: boolean
}

export interface UserProfile {
  uid: string
  email: string
  password: string
  first_name: string
  last_name: string
  avatars: string[]

  country: string
  region: string
  city: string
  phone: string

  gender: string
  age: number
  birthdate: string

  doSmoking: boolean | undefined
  doDrinking: boolean | undefined
  havePets: boolean | undefined

  aboutMe: string

  isVerifiedStudent: boolean
  isTrusted: boolean
  isPublic: boolean

  likedPeople: string[]
  dislikedPeople: string[]
}
