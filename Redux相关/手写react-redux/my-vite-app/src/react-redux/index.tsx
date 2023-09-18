//@ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';

export default class Provider extends React.Component {
  // 需要声明静态属性childContextTypes来指定context对象的属性,是context的固定写法
  static childContextTypes = {
    store: PropTypes.object
  }
  // 实现getChildContext方法,返回context对象,也是固定写法  
  getChildContext() {
    return { store: this.props.store }
  }

  // 渲染被Provider包裹的组件
  render() {
    return this.props.children
  }
}


export function connect(mapStateToProps: unknown, mapDispatchToProps: unknown) {
    return function (Component: unknown) {
        class Connect extends React.Component {
            componentDidMount(): void {
                this.context.store.subscribe(this.handleStoreChange.bind(this))
            }

            handleStoreChange = () => {
                // 强制刷新
                this.forceUpdate();
            }
            render() {
                return (
                  <Component
                      // 传入该组件的props,需要由connect这个高阶组件原样传回原组件   
                      { ...(this.props) }
                      // 根据 mapStateToProps 把 state 挂到 this.props 上       
                      { ...(mapStateToProps(this.context.store.getState())) }
                      // 根据mapDispatchToProps把dispatch(action)挂到this.props上              
                      { ...(mapDispatchToProps(this.context.store.dispatch)) }
                  />
                )
                    
            }
        }

        //接收context的固定写法      
        Connect.contextTypes = {        
            store: PropTypes.object      
        } 

        return Connect;

    }
}