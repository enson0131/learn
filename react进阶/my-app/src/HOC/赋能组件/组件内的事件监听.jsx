import { Component } from 'react';
import { useEffect, useRef } from 'react';

function ClickHoc (Component) {
    return function Wrap(props) {
        const dom = useRef(null);

        useEffect(() => {
            const handleClick = () => console.log(`发生点击事件`);
            dom.current.addEventListener('click', handleClick)
            
            return () => dom?.current?.removeEventListener('click', handleClick);
        }, [])

        return <div ref={dom}>
            <Component {...props} />
        </div>
    }
}

@ClickHoc
class Index extends Component {
    render() {
        return <div>
            <p>hello, world</p>
            <button>组件内部点击</button>
        </div>
    }
}

export default () => {
    return <div>
        <Index />
        <button>组件外部点击</button>
    </div>
}