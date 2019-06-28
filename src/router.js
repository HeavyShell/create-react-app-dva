import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic'
import Auth from './layout/auth'
import {config} from './utils'
const { menuGlobal } = config

function RouterConfig({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/music'),
  })
  return (
    <Router history={history}>
      <Auth>
        <Switch>
          {
            menuGlobal.map(({path,...dynamics},index)=>(
              <Route
                key={index} 
                path={path} 
                exact 
                component={dynamic({
                  app,
                  ...dynamics
                })} 
              />
            ))
          }
          <Route component={error} />
        </Switch>
      </Auth>
    </Router>
  );
}

export default RouterConfig;
