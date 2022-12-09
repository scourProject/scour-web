
export interface CustomerCreate {
    nameOfCompany: string
    isVIP: boolean
    email: string
    website: string

    additionalInformation: string

    isActive: boolean
    creationDate?: any
}

export interface CustomerRead {
    uid: string
    nameOfCompany: string
    isVIP: boolean
    email: string
    website: string

    additionalInformation: string
    contracts: string[]

    isActive: boolean
    creationDate?: any
}
