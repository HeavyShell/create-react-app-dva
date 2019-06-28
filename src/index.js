import dva from 'dva';
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Locale from './layout/locale';
import createHistory from 'history/createBrowserHistory'

// 1. Initialize
const app = dva({
    history:createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
const App = app.start();

//此处，是dva配合国际化使用方式
ReactDOM.render(<Locale store={app._store}><App /></Locale>, document.getElementById('root'));

