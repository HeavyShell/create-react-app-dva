import {connect} from 'dva';
import React from 'react';
import pathToRegexp from 'path-to-regexp'
import Helmet from 'react-helmet';
import {injectIntl} from 'react-intl'
import classnames from 'classnames';
import Header from './header';
import Tree from './tree';
import Content from './content';
import styles from './index.less';

const Layout=({ children,dispatch,menu,locationPathname,i18n,intl:{formatMessage} })=>{

  const menuList=menu.getIn(['byId']).toList();
  let menuName='';
  menuList.map(item=>{
    if(pathToRegexp(item.get('path')).exec(locationPathname)){
      menuName = item.get('name');
    }
  });

  //判断是否是登录页，登录页面和内页是不同的布局
  const loginUrl=menu.getIn(['byId','login','path']);
  const isLoginPage=pathToRegexp(loginUrl).exec(locationPathname)?true:false;

  const headerProps={
    i18n,
    dispatch
  }

  const treeProps={
    menu,
    locationPathname,
    dispatch
  }

  const contentProps={
    menu,
    locationPathname,
    dispatch
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>
          {formatMessage({id: menuName})}
        </title>
      </Helmet>
      {isLoginPage?
        children
      :
        <div className={classnames(styles.LBodyOuter)}>
          <div className={classnames(styles.LHeader)}>
            <Header {...headerProps} />
          </div>
          <div className={classnames(styles.LBody)}>
            <div className={classnames(styles.LTree)}>
              <Tree {...treeProps}/>
            </div>
            <div className={classnames(styles.LContent)}>
              <Content {...contentProps}>
                {children}
              </Content>
            </div>
          </div>
        </div>
      }
      
    </React.Fragment>
  );
}

export default injectIntl(Layout)
