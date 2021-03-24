import request from '@/utils/request'

export function getMediaList(params) {
  return request({
    url: '/getMediaList',
    method: 'get',
    params
  })
}

export function getDirList(params) {
  return request({
    url: '/getDirList',
    method: 'get',
    params
  })
}