import pathToRegexp from 'path-to-regexp'

export default {

    namespace: 'books',
  
    state: {
      name:'books'
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
  