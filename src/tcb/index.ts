
import { envId, collectionList, email, password } from './tcbConfig'
import cloudbase from '@cloudbase/js-sdk'



const tcb: object = cloudbase.init({
    env: envId,
})
const db: object = tcb.database()
const request: object = tcb.callFunction

tcb
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
        console.log(res)
    });

const collection: object = function () {
    let obj = {}
    for (let item of collectionList) {
        obj[item] = db.collection(item)
    }
    console.log(obj)
    return obj
}()



// tcb
//     .auth()
//     .signUpWithEmailAndPassword('1158356429@qq.com', 'a86861636')
//     .then((res) => {
//         console.log(res)
//         // 发送验证邮件成功
//     });
export {
    tcb,
    request,
    collection
}