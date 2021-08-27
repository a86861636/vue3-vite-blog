import request from '/@/utils/request'
import { AxiosResponse } from 'axios'

const api = {
    category: '/api/course/course-category/'
}

//请求头formdata格式
const FORMDATA_HEADERS = { 'Content-Type': 'multipart/form-data' }

//json数据转成formdata数据
function tranFormData(param: object) {
    const data = new FormData()
    for (let key in param) {
        data.append(key, param[key])
    }
    return data
}

//课程分类
interface categoryListParam {
    page: number,
    page_size: number
}
interface categoryListData {
    id: number,
    category: string,
    date_joined: string
}
interface categoryListRes {
    total: number,
    count: number,
    next: string | null,
    previous: string | null,
    results: categoryListData[]
}
export function categoryList(param: categoryListParam = { page: 1, page_size: 10 })
    : categoryListRes {
    return request({
        url: api.category,
        method: 'get',
        params: param
    })
}

interface categoryAddParam {
    category: string
}
export function categoryAdd(param: categoryAddParam) {
    param = tranFormData(param)
    return request({
        url: api.category,
        method: 'post',
        headers: FORMDATA_HEADERS,
        data: param
    })
}

interface categoryDelParam {
    id: number
}
export function categoryDel(param: categoryDelParam) {
    return request({
        url: api.category + param.id + '/',
        method: 'delete'
    })
}