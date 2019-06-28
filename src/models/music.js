import pathToRegexp from 'path-to-regexp'
import { Map, fromJS, List } from 'immutable'
import {queryMusic,modifyMusic,infoMusic,deleteMusic} from '../services/music'

export default {

    namespace: 'music',
  
    state: Map({
      byId:Map(),
      list:List(),
      keyword:'',
      pageSize:5,
      current:1,
      total:100 //此处模拟总数100条数据
    }),
  
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
          dispatch({type: 'dataInit', payload: {pathname}});
        });
      },
    },
  
    effects: {
      * dataInit({payload: {pathname}}, {put,call,select}){
      
        const musicList = yield select(_=>_.app.getIn(['menu','byId','music','path']));
        const musicEdit = yield select(_=>_.app.getIn(['menu','byId','music-edit','path']));
        const musicCopy = yield select(_=>_.app.getIn(['menu','byId','music-copy','path']));
        
        if(pathToRegexp(musicList).exec(pathname)){
          yield put({type: 'queryMusic'});
        }else if(pathToRegexp(musicEdit.substring(0,musicEdit.lastIndexOf('?')-4)).exec(pathname)){
          
        }else if(pathToRegexp(musicEdit.substring(0,musicEdit.lastIndexOf('?'))).exec(pathname)){
          const pathArray = pathToRegexp(musicEdit.substring(0,musicEdit.lastIndexOf('?'))).exec(pathname);
          const id=pathArray[1];
          yield put({type: 'infoMusic', payload:{id}});
        }else if(pathToRegexp(musicCopy.substring(0,musicCopy.lastIndexOf('?'))).exec(pathname)){
          const pathArray = pathToRegexp(musicCopy.substring(0,musicCopy.lastIndexOf('?'))).exec(pathname);
          const id=pathArray[1];
          yield put({type: 'infoMusic', payload:{id}});
        }
        

      },

      * queryMusic({ payload }, { call, put, select }) {
      
        const pageSize = yield payload&&payload.pageSize || select(_=>_.music.get('pageSize'));
        const current = yield payload&&payload.current || select(_=>_.music.get('current'));
        const keyword = yield payload&&payload.keyword || select(_=>_.music.get('keyword'));

        const data = yield call(queryMusic, {pageSize,current,keyword,...payload});

        if(data.success){
          yield put({ 
              type: 'setMusicList',
              payload: { 
                list: data.data,
                pageSize,
                current,
                keyword
              } 
          });  
        }else{
          throw data;
        }
         
      }, 

      * modifyMusic({ payload }, { call, put, select }) {
      
        const data = yield call(modifyMusic, {...payload});

        if(data.success){
          const musicList = yield select(_=>_.app.getIn(['menu','byId','music','path']));
          yield put({
            type:'app/goToPage',
            payload:{
              url:musicList
            }
          });
        }else{
          throw data;
        }
        
      },

      * infoMusic({ payload }, { call, put }) {
      
        const data = yield call(infoMusic, {...payload});

        if(data.success){
          yield put({ 
              type: 'setMusicInfo',
              payload: { 
                list: data.data,
              } 
          });  
        }else{
          throw data;
        }
        
      },

      * deleteMusic({ payload }, { call, put }) {
      
        const data = yield call(deleteMusic, {...payload});

        if(data.success){
          yield put({ 
              type: 'queryMusic'
          });  
        }else{
          throw data;
        }
        
      },
      
    },
  
    reducers: {

      setMusicList(state, { payload:{list,pageSize,current,keyword} }) {
        let ids = List();
        list.map(item=>{
          state = state.setIn(['byId', item.id + ''], fromJS({...item, key: item.id}));
          ids = ids.push(item.id + '');
        })
     
        return state.setIn(['list'], ids)
               .setIn(['pageSize'], pageSize)
               .setIn(['current'], current)
               .setIn(['keyword'], keyword)
      },

      setMusicInfo(state, { payload:{list} }) {

        state = state.setIn(['byId', list.id + ''], fromJS({...list, key: list.id}));
     
        return state;
      },

    },
  
  };
  