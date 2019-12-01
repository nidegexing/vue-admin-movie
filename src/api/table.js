import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getDictByTypes(data) {
  return request({
    url: '/table/getDictByTypes',
    method: 'post',
    data: data
  })
}

export function getMoviesByName(data) {
  return request({
    url: '/table/getMoviesByName',
    method: 'post',
    data: data
  })
}

export function getSearchConditions(data) {
  return request({
    url: '/table/getSearchConditions',
    method: 'post',
    data: data
  })
}

export function getMoviesByConditions(data) {
  return request({
    url: '/table/getMoviesByConditions',
    method: 'post',
    data: data
  })
}
