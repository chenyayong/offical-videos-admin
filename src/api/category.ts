/* eslint-disable camelcase */
import request from '@/utils/request'

export interface IResponse {
  code: number
  msg: string
  total?: number
  data?: any
}

export interface ICategoryData {
  category_id?: number
  name?: string
  page?: number
  limit?: number
}

// 视频分类列表
export const getCategoryList = (params: ICategoryData) => {
  return request({
    url: '/admin/category/index',
    method: 'get',
    params
  })
}

// 添加视频分类
export const addCategory = (data: ICategoryData) => {
  return request({
    url: '/admin/category/add',
    method: 'post',
    data
  })
}

// 删除视频分类
export const delCategory = (data: ICategoryData) => {
  return request({
    url: '/admin/category/del',
    method: 'post',
    data
  })
}

// 编辑分类
export const editCategory = (data: ICategoryData) => {
  return request({
    url: '/admin/category/edit',
    method: 'post',
    data
  })
}
