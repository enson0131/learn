import React from "react";

class Person extends React.Component {
    constructor(props) {
        super(props);
        console.log('hello, i am persion');
    }
    componentDidMount() {
        // 这里的console.log 会被 Programmer 覆盖掉
        console.log(1111);
    }
    eat() {}
    sleep() {}
    ddd() { console.log('ddd')}
    render() {
        return <div>
            大家好，我是一个person
        </div>
    }
}


class Programmer extends Person {
    constructor(props) {
        super(props);
        console.log('hello, i am programmer, too')
    }
    componentDidMount() {
        console.log(`programmer`, this);
    }
    code() {}
    render() {
        return <div style={{marginTop: '50px'}}>
            { super.render() }
            我还是一个程序猿
        </div>
    }
}

export default Programmer;