import {Map, fromJS} from 'immutable';
import {routerRedux} from 'dva/router';
import {config} from '../utils';
const {menuMap} = config;

const initState = Map({
    i18n: 'zh_CN',
    token:null,
    locationPathname:null,
    menu:menuMap
})

export default {

    namespace: 'app',
  
    state:initState,
  
    subscriptions: {
        setup({ dispatch, history }) {
        
        },
        setupHistory ({ dispatch, history }) {
            history.listen((location) => {
                dispatch({
                    type: 'updateLocation',
                    payload: {
                      locationPathname: location.pathname
                    },
                });
                dispatch({
                    type: 'updateToken',
                    payload: {
                      token: window.sessionStorage.getItem('token')
                    },
                })
            })
        },
    },
  
    effects: {

        * changeLang ({
            payload: {value},
        }, { put }) {
            yield put({ type: 'updateLang', payload: {value}});
        },

        * updateLocation ({
            payload
        }, {put, select}) {
            yield put({type: 'updateStore', payload});
        },

        * updateToken ({
            payload
        }, {put, select}) {
            yield put({type: 'updateStore', payload});
        },

        * goToPage ({
            payload
        }, {put, select}) {
            yield put(routerRedux.push({
                pathname: payload.url
            }));
        },

        * goBack ({
            payload
        }, {put, select}) {
            yield put(routerRedux.goBack());
        },

        * loginOk ({
            payload
        }, {put, select}) {
            const musicUrl = yield select(_=>_.app.getIn(['menu','byId','music','path']))
            window.sessionStorage.setItem('token',payload.token);
            yield put(routerRedux.push({
                pathname: musicUrl
            }));
        },

        * logout ({
            payload
        }, {put, select}) {
            window.sessionStorage.removeItem('token');
            window.location.href='/login';
        },
        
    },
  
    reducers: {
        updateLang (state,{payload:{value}}) {
            return state.set('i18n',value);
        },
        updateStore (state, { payload }) {
            return payload?state.mergeDeep(fromJS(payload)):initState
        },
        
    },
  
  };
  