//@ts-nocheck
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import  Provider from './react-redux2/index.tsx';
import { createStore } from './react-redux2/createStore.ts';
import { reducer } from './react-redux2/reducer.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={createStore(reducer)}>
        <App />
      </Provider>
  </React.StrictMode>,
)
