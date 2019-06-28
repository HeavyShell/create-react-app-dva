import {connect} from 'dva';
import React from 'react';
import Layout from './layout';
import { withRouter } from 'dva/router'

const Auth=({ children,dispatch,token,locationPathname,menu,i18n })=>{

  if(!token&&locationPathname!='/login'){
    dispatch({
      type:'app/logout'
    })
  }else if(token&&locationPathname=='/login'){
    dispatch({
      type:'app/loginOk',
      payload:{
        token:token
      }
    })
  }

  const layoutProps={
    locationPathname,
    menu,
    i18n,
    dispatch
  }

  return (
    <Layout {...layoutProps}>
      {children}
    </Layout>
  );
}

export default withRouter(connect(({
  app
})=>({
  token:app.get('token'),
  locationPathname:app.get('locationPathname'),
  menu:app.get('menu'),
  i18n:app.get('i18n'),
}))(Auth))
