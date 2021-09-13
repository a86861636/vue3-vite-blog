
import { envId, collectionList } from './tcbConfig'
import cloudbase from '@cloudbase/js-sdk'

const tcb: object = cloudbase.init({
    env: envId,
})
const db: object = tcb.database()
const request: object = tcb.callFunction
const collection: object = function () {
    let obj = {}
    for (let item of collectionList) {
        obj[item] = db.collection(item)
    }
    console.log(obj)
    return obj
}()
export {
    request,
    collection
}