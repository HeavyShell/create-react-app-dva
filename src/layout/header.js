import {connect} from 'dva';
import React from 'react';
import {injectIntl} from 'react-intl'
import classnames from 'classnames';
import { Menu, Dropdown, Button } from 'antd';
import styles from './index.less';
import logoPng from '../assets/logo.png';

const Header=({ children,dispatch,i18n,intl:{formatMessage} })=>{

  function changeLang(e){
    dispatch({
      type:'app/changeLang',
      payload:{
        value:e.key
      }
    })
  }

  function logout(){
    dispatch({
      type:'app/logout'
    })
  }

  const menuLang = (
    <Menu selectedKeys={[i18n]} onClick={changeLang}>
      <Menu.Item key="zh_CN">中文</Menu.Item>
      <Menu.Item key="en_US">英文</Menu.Item>
      <Menu.Item key="zh_HK">繁体</Menu.Item>
    </Menu>
  );

  return (
    <div className={classnames(styles.CHeader)}>
      <div className={classnames(styles.CLogo)}>
        <img src={logoPng} width={70} />
      </div>
      <div className={classnames(styles.CNavBar)}>
        <Dropdown trigger={['click']} overlay={menuLang}>
          <Button size={'small'} style={{marginRight:'10px'}} icon={'global'}>{formatMessage({id: 'App.lang'})}</Button>
        </Dropdown>
        <Button size={'small'} icon={'logout'} onClick={logout}>{formatMessage({id: 'App.logout'})}</Button>
      </div>
    </div>
  );
}

export default injectIntl(Header)
