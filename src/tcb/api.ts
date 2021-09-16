import { resolve } from 'path'
import { tcb, request, collection } from './index'

interface FileRes {
    download_url: string
    fileID: string
    requestId: string
}
export function uploadFile(file: object): Promise<FileRes> {
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