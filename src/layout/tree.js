import {connect} from 'dva';
import {Link} from 'dva/router';
import React from 'react';
import {injectIntl} from 'react-intl'
import pathToRegexp from 'path-to-regexp'
import classnames from 'classnames';
import { Menu, Icon } from 'antd';
import styles from './index.less';

const SubMenu = Menu.SubMenu;

const Tree=({ children,dispatch,menu,locationPathname,intl:{formatMessage} })=>{
  const menuById=menu.get('byId');
  const menuByPid=menu.get('byPid');
  const currentById=menuById.filter(item=>pathToRegexp(`${item.get('path')}`).exec(locationPathname)).toList().get(0);
  const currentMenu = menuById.filter(item=>pathToRegexp(`${item.get('path')}/:path*`).exec(locationPathname)).map(item=>item.get('id')).toArray();
  
  //平判断当前菜单下是否有自己菜单可显示
  function isHaveChild(arr){
    let flag=false;
    arr.map(item=>{
      if(menuById.getIn([item,'display']) && menuById.getIn([item,'display'])=='block'){
        flag=true;
        return false;
      }
    })

    return flag;
  }

  //计算菜单方法支持无限级
  function CalChildMenu(item){
    if(menuById.getIn([item,'display']) && menuById.getIn([item,'display'])=='block'){
        if(menuByPid.get(item)&&isHaveChild(menuByPid.get(item))){
        return <SubMenu key={item} title={<span><Icon type={menuById.getIn([item,'icon'])} /><span>{formatMessage({id: menuById.getIn([item,'name'])})}</span></span>}>
            {menuByPid.get(item).map(item2=>{
            return CalChildMenu(item2)
            })}
        </SubMenu>
        }else{
        return <Menu.Item key={item} to={menuById.getIn([item,'path'])}>
            <Link to={menuById.getIn([item,'path'])}><span><Icon type={menuById.getIn([item,'icon'])} /><span>{formatMessage({id: menuById.getIn([item,'name'])})}</span></span></Link>
        </Menu.Item>
        }
    }
  }

  return (
    <div className={classnames(styles.CTree)}>
      <Menu
        selectedKeys={[currentById.get('display')!='block'?currentById.get('pid'):currentById.get('id')]}
        defaultOpenKeys={currentMenu}
        mode="inline"
      > 
        {menuByPid.get('0').map(item=>{
          return CalChildMenu(item)          
        })}
      </Menu>
    </div>
  );
}

export default injectIntl(Tree)
