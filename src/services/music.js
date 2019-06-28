import {request,api} from '../utils';
const {baseUrl} = api;

export async function queryMusic({pageSize,current,keyword}) {
  
  return request({
    url: `${baseUrl}/music?_limit=${pageSize}&_page=${current}&q=${keyword}`,
    method: 'get'
  })
}

export async function modifyMusic({id,name,author,gender,avatar,publish_time}) {
  
  if(id){
    return request({
      url: `${baseUrl}/music/${id}`,
      method: 'put',
      data:{
        name,
        author,
        gender,
        avatar,
        publish_time
      }
    })
  }else{
    return request({
      url: `${baseUrl}/music`,
      method: 'post',
      data:{
        name,
        author,
        gender,
        avatar,
        publish_time
      }
    })
  }
  
}

export async function infoMusic({id}) {
  
  return request({
    url: `${baseUrl}/music/${id}`,
    method: 'get'
  })
}

export async function deleteMusic({id}) {
  
  return request({
    url: `${baseUrl}/music/${id}`,
    method: 'delete'
  })
}