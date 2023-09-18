/* eslint-disable @typescript-eslint/ban-types */

export const createStore = (reducer: Function) => {
    let currentState: undefined = undefined;
    const obervers: Array<Function> = [];

    function getState() {
        return currentState;
    }

    function dispatch(action: { type: string}) {
        currentState = reducer(currentState, action);
        obervers.forEach(fn => fn());
    }

    function subscribe(fn: Function) {
        obervers.push(fn);
    }

    dispatch({ type: '@@REDUX/INIT' }); // 初始化 state

    return {
        getState,
        dispatch,
        subscribe
    }
}