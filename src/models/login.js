import {message} from 'antd';

export default {

    namespace: 'login',
  
    state: {
      name:'这是login的model'
    },
  
    subscriptions: {
      
    },
  
    effects: {
      * login ({
          payload
      }, {put, select}) {
          if(payload.values.username=='admin'&&payload.values.password=='123456'){
            //登录成功
            yield put({
              type:'app/loginOk',
              payload:{
                token:'123abc'
              }
            });
          }else{
            message.warning('用户名或密码不正确')
          }
      },

    },
  
    reducers: {
      
    },
  
  };
  