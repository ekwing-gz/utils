import { Service, ReadOnly } from './decorators'

class BaseService {
  @ReadOnly
  get (
    url,
    params,
    options = {}
  ) {
    options = Object.assign({
      baseURL: this.serviceURL
    }, options, {params})
    return BaseService.$http.get(url, options)
  }

  @ReadOnly
  post (
    url,
    data,
    options = {}
  ) {
    options = Object.assign({
      baseURL: this.serviceURL
    }, options)
    return BaseService.$http.post(url, data, options)
  }

  get serviceURL () {
    const baseURL = Reflect.getMetadata('baseURL', BaseService)
    const serviceBaseURL = Reflect.getMetadata('baseURL', this.constructor)
    return `/${baseURL}/${serviceBaseURL}`
  }

  find (params, _url = '/list') {
    return this.$get(_url, params)
  }

  findOne (params, _url = '/get') {
    return this.$get(_url, params, params)
  }

  add (data, _url = '/add', options) {
    return this.$post(_url, data, options)
  }

  update (data, _url = '/update', options) {
    return this.$post(_url, data, options)
  }

  delete (params, _url = '/delete', options) {
    return this.$get(_url, params, options)
  }
}

export const createBaseService = ({ baseURL, axiosInstance }) => {
  @Service(baseURL)
  class NewService extends BaseService {
    static _http = axiosInstance
  }

  return NewService
}