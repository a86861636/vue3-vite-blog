import { resolve } from 'path'
import { tcb, auth, request, collection } from './index'
import { ElNotification } from 'element-plus'

interface loginParam {
  email: string
  password: string
}
export function useLogin(param: loginParam): Promise<any> {
  return new Promise((resolve, reject) => {
    auth
      .signInWithEmailAndPassword(param.email, param.password)
      .then((res) => {
        resolve(true)
      }).catch(error => {
        resolve(false)
      })
  })
}

interface FileRes {
  download_url: string
  fileID: string
  requestId: string
}
export function useUploadFile(file: File): Promise<FileRes> {
  return new Promise((resolve, reject) => {
    tcb.uploadFile({
      cloudPath: 'blog/' + new Date().getTime() + file.name,
      filePath: file
    }).then(res => {
      resolve(res)
    })
  })
}
export function getArticleList(): Promise<object[]> {
  return new Promise((resolve, reject) => {
    collection.article.get().then(res => {
      resolve(res.data)
    })
  })
}