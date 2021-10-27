import { resolve } from 'path'
import { tcb, auth, request, collection, _ } from './index'
import { ElNotification } from 'element-plus'

interface loginParam {
  email: string
  password: string
}
export function useLogin(param: loginParam): Promise<boolean> {
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

export interface IArticleRes {
  content: string
  is_active: boolean
  pubTime: string
  title: string
  _id: string
  _openid: string
  tag: string
}
export function getArticleList(page: number = 1, pageSize: number = 10): Promise<IArticleRes[]> {
  return new Promise((resolve, reject) => {
    collection.article.skip((page - 1) * pageSize).limit(pageSize).get().then(res => {
      resolve(res.data)
    }).catch(() => {
      resolve([])
    })
  })
}

export function getActiveArticleList(page: number = 1, pageSize: number = 10): Promise<IArticleRes[]> {
  return new Promise((resolve, reject) => {
    collection.article.where({ is_active: true }).skip((page - 1) * pageSize).limit(pageSize).get().then(res => {
      resolve(res.data)
    }).catch(() => {
      resolve([])
    })
  })
}
export function getArticleCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    collection.article.where({ is_active: true }).count().then(res => {
      resolve(res.total)
    }).catch(() => {
      resolve(0)
    })
  })
}
export function getActiveArticleCount(): Promise<number> {
  return new Promise((resolve, reject) => {
    collection.article.where({ is_active: true }).count().then(res => {
      resolve(res.total)
    }).catch(() => {
      resolve(0)
    })
  })
}


export interface articleDetailRes {
  content: string
  is_active: boolean
  pubTime: string
  title: string
  _id: string
  _openid: string
}
export function getArticleDetail(id: string): Promise<articleDetailRes> {
  return new Promise((resolve, reject) => {
    collection.article.where({ _id: id }).get().then(res => {
      resolve(res.data.length === 0 ? false : res.data[0])
    }).catch(() => {
      resolve(false)
    })
  })
}

export interface setArticleParam {
  id: string
  content: string
  is_active: boolean
  pubTime: string
  title: string
  tag: string
}
export function setArticle(param: setArticleParam): Promise<boolean> {
  return new Promise((resolve, reject) => {
    let id = param.id
    delete param.id
    collection.article.doc(id).set(param)
      .then((res) => {
        if (res.updated) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(error => {
        resolve(false)
      })
  })
}
export interface addArticleParam {
  content: string
  is_active: boolean
  pubTime: string
  title: string
  user_uid: string
}
export function addArticle(param: addArticleParam): Promise<boolean> {
  return new Promise((resolve, reject) => {
    collection.article.add(param)
      .then((res) => {
        if (res.message) {
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch(error => {
        resolve(false)
      })
  })
}
export function removeArticle(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    collection.article.doc(id).remove()
      .then((res) => {
        if (res.deleted) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(error => {
        resolve(false)
      })
  })
}
export interface ISearchArticleParam {
  key: string
  value: string
}
export function searchArticle(param: ISearchArticleParam): Promise<IArticleRes[]> {
  let obj = {}
  if (param.value === 'false' || param.value === 'true') {
    obj[param.key] = param.value === 'true' ? true : false
  } else {
    obj[param.key] = new RegExp(`(${param.value})`, "g")
  }
  return new Promise((resolve, reject) => {
    collection.article.where(obj).get()
      .then((res) => {
        resolve(res.data.length === 0 ? [] : res.data)
      }).catch(error => {
        resolve([])
      })
  })
}

export interface ITagsRes {
  name: string
  _id: string
}
export function getTagsList(): Promise<ITagsRes[]> {
  return new Promise((resolve, reject) => {
    collection.tags.get().then(res => {
      resolve(res.data)
    }).catch(() => {
      resolve([])
    })
  })
}

export interface IAddTagParam {
  name: string
}
export function addTag(param: addTagParam): Promise<boolean> {
  return new Promise((resolve, reject) => {
    collection.tags.add(param)
      .then((res) => {
        if (res.message) {
          resolve(false)
        } else {
          resolve(true)
        }
      }).catch(error => {
        resolve(false)
      })
  })
}
export function removeTag(id: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    collection.tags.doc(id).remove()
      .then((res) => {
        if (res.deleted) {
          resolve(true)
        } else {
          resolve(false)
        }
      }).catch(error => {
        resolve(false)
      })
  })
}