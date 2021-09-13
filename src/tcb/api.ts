import { resolve } from 'path'
import { request, collection } from './index'

export function getArticleList(): Promise<object[]> {
    return new Promise((resolve, reject) => {
        collection.article.get().then(res => {
            resolve(res.data)
        })
    })
}