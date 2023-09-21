/* eslint-disable react-hooks/rules-of-hooks */
//@ts-nocheck 
import React, { createContext, useContext, useEffect } from 'react';

let StoreContext;
const Provider = (props) => {
  StoreContext = createContext(props.store);
  
  return <StoreContext.Provider value={props.store}>{ props.children }</StoreContext.Provider>
}

export default Provider;

export function connect(mapStateToProps: unknown, mapDispatchToProps: unknown) {
    return function (Component: unknown) {
      const connectComponent: React.FC = (props) => {
        
        const store = useContext(StoreContext);
        
        const [, updateState] = React.useState();
        
        const forceUpdate = React.useCallback(() => updateState({}), []);

        const handleStoreChange = () => {
            // 强制刷新
            forceUpdate();
        }
        
        useEffect(() => {
          store.subscribe(handleStoreChange)
        }, [])

        return (
          <Component
              // 传入该组件的props,需要由connect这个高阶组件原样传回原组件   
              { ...(props) }
              // 根据 mapStateToProps 把 state 挂到 this.props 上       
              { ...(mapStateToProps(store.getState())) }
              // 根据mapDispatchToProps把dispatch(action)挂到this.props上              
              { ...(mapDispatchToProps(store.dispatch)) }
          />
        )
      }

      return connectComponent;
    }
}