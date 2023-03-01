import { useMemo, useState } from "react";
import React from 'react';


function HOC(Component) {
    return function renderWrapComponent(props) {
        const { num } = props;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const RenderElement = useMemo(() => <Component {...props} />, [num]);
        return RenderElement;
    }
}

class Index extends React.Component {
    render() {
        console.log(`当前组件是否渲染`, this.props);
        return <div>hello, world, my name is enson</div>
    }
}

const IndexHoc = HOC(Index);

export default function Test() {
    const [ num, setNumber ] = useState(0);
    const [ num1, setNumber1 ] = useState(0);
    const [ num2, setNumber2 ] = useState(0);

    return <div>
        <IndexHoc num={num} num1={num1} num2={num2} />
        <button onClick={() => setNumber(num + 1)}>num</button>
        <button onClick={() => setNumber1(num1 + 1)}>num1</button>
        <button onClick={() => setNumber2(num2 + 1)}>num2</button>
    </div>
}