//@ts-nocheck
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
// import  Provider from './react-redux2/index.tsx';
// import { createStore } from './react-redux2/createStore.ts';
// import { reducer } from './react-redux2/reducer.ts';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//       <Provider store={createStore(reducer)}>
//         <App />
//       </Provider>
//   </React.StrictMode>,
// )

import { createStore, applyMiddleware } from "redux";

const initialState = {
  count: 0
}

function reducer(state = initialState, action: { type: string}) {
  switch (action.type) {
      case 'add': 
          return {
              ...state,
              count: state.count + 1
          }
      case 'reduce':
          return {
              ...state,
              count: state.count - 1
          }
      default:
          return initialState;
  }
}

const logger1 = storeAPI => next => action => {  
  console.log('logger1 开始');
  const result = next(action)  
  console.log('logger1 结束');
  return result  
}

const logger2 = storeAPI => next => action => {  
  console.log('logger2 开始');
  const result = next(action)  
  console.log('logger2 结束');
  return result  
}

const logger3 = storeAPI => next => action => {  
  console.log('logger3 开始');
  const result = next(action)  
  console.log('logger3 结束');
  return result  
}

const middlewares = applyMiddleware(logger1, logger2, logger3);


const store = createStore(reducer, middlewares);

store.dispatch({ type: 'add' });