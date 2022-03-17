/* eslint-disable camelcase */
import request from '@/utils/request'

// export interface IResponse {
//   code: number
//   msg: string
//   total?: number
//   data?: any
// }

export interface IVideoData {
  video_id?: number | string
  title?: string
  category_id?: number | string
  category_name?: string
  cover_path?: string
  video_path?: string
  details?: string
  type?: number
  password?: string
  page?: number
  limit?: number
}

// 视频列表
export const getVideoList = (data: IVideoData) => {
  return request({
    url: '/admin/video/index',
    method: 'post',
    data
  })
}

// 添加视频
export const addVideo = (data: IVideoData) => {
  return request({
    url: '/admin/video/add',
    method: 'post',
    data
  })
}

// 视频详情
export const getVideo = (params: IVideoData) => {
  return request({
    url: '/admin/Video/videoInfo',
    method: 'get',
    params
  })
}

// 删除视频
export const delVideo = (data: IVideoData) => {
  return request({
    url: '/admin/video/del',
    method: 'post',
    data
  })
}

// 编辑视频
export const editVideo = (data: IVideoData) => {
  return request({
    url: '/admin/video/edit',
    method: 'post',
    data
  })
}
