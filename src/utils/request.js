import axios from 'axios';

//axios默认配置
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8;';
axios.defaults.headers.common['Project-Auth'] = 'AAA-BBB-CCC';

const fetch = (options) => {

  let { method = 'get', data, url, headers } = options;

  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: data,
        headers
      })
    case 'delete':
      return axios.delete(url, {
        data: data,
        headers
      })
    case 'post':
      return axios.post(url, data, {headers})
    case 'put':
      return axios.put(url, data, {headers})
    case 'patch':
      return axios.patch(url, data, {headers})
    default:
      return axios(options)
  }

}

export default function request (options) {
  
  return fetch(options).then((response) => {
    
    return Promise.resolve({
      success: true,
      ...response
    });

  }).catch((error) => {

    return Promise.resolve({
        success: false,
        ...error.response
    });

  })
}
