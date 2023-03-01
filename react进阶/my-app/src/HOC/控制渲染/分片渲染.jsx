import * as React from 'react';
import { useEffect, useState } from 'react';


// 懒加载的 HOC
const renderQueue = [];
let isFirstrender = false;

const tryRender = () => {
  const render = renderQueue.shift();
  if (!render) return;

  setTimeout(() => {
    render && render(); // 执行下一段渲染
  }, 300);
};

// HOC
function renderHOC(WrapComponent) {
  return function Index(props) {
    const [isRender, setRender] = useState(false);
    useEffect(() => {
      renderQueue.push(() => {
        setRender(true)
      })

      if (!isFirstrender) {
        tryRender();
        isFirstrender = true;
      }
    }, [])

    return isRender ? <WrapComponent tryRender={tryRender} {...props} /> : <div>loading...</div>
  };
}

// 业务组件
class Index extends React.Component {
  componentDidMount() {
    const {name, tryRender} = this.props;

    tryRender(); // 这一段渲染完毕, 渲染下一段组件
    console.log(name + '渲染');
  }
  render() {
    return <div>
      <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&amp;fm=26&amp;gp=0.jpg" />
    </div>
  }
}

const Item = renderHOC(Index);

export default () => {
  return <React.Fragment>
    <Item name="组件一" />
    <Item name="组件二" />
    <Item name="组件三" />
  </React.Fragment>
}

