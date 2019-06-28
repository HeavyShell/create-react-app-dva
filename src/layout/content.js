import {connect} from 'dva';
import React from 'react';
import {injectIntl, FormattedMessage} from 'react-intl'
import pathToRegexp from 'path-to-regexp'
import classnames from 'classnames';
import { Menu, Icon } from 'antd';
import styles from './index.less';

const Content=({ children,dispatch,menu,locationPathname,intl:{formatMessage} })=>{

  const menuById=menu.get('byId');
  const currentMenu = menuById.filter(item=>pathToRegexp(`${item.get('path')}/:path*`).exec(locationPathname)).map(item=>item.get('id')).toArray();

  return (
    <div className={classnames(styles.CContent)}>
      <div className={classnames(styles.CToolBar)}>
        <Icon type={'flag'} /> <FormattedMessage id={'App.currentPosition'} />：
        {currentMenu.map((item,index)=>{
          if(menuById.getIn([item,'display'])=='block'){
            if(index==0){
              return <span key={index}>{formatMessage({id: menuById.getIn([item,'name'])})}</span>
            }else{
              return <span key={index}> / {formatMessage({id: menuById.getIn([item,'name'])})}</span>
            }
          }
        })}
      </div>
      <div className={classnames(styles.CMain)}>
        {children}
      </div>
    </div>
  );
}

export default injectIntl(Content)
