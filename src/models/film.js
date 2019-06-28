import pathToRegexp from 'path-to-regexp'

export default {

    namespace: 'film',
  
    state: {
      name:'film'
    },
  
    subscriptions: {
      setup({ dispatch, history }) {
        return history.listen(({ pathname, query }) => {
          dispatch({type: 'dataInit', payload: {pathname}});
        });
      },
    },
  
    effects: {
      * dataInit({payload: {pathname}}, {put,call,select}){


      },
    },
  
    reducers: {
      
    },
  
  };
  