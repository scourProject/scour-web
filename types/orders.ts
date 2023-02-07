export interface OrderCreate {
    objectID: string
    objectName: string
    objectAddress: string
    status: string,
    requiredWorkerAmount: number
    deadline: Date

}