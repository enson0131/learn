import React from 'react'

class FriendStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false // 默认当前不在线
        }
    }
    render() {
        return <div>
            好友 {this.props.friendId} 在线状态：{this.state.status}
        </div>
    }
    componentDidMount() {
        console.log(`开始监听 ${this.props.friendId} 的在线状态`)
    }
    componentWillUnMount() {
        console.log(`结束监听 ${this.props.friendId} 的在线状态`)
    }
    // friendId 更新
    componentDidUpdate(prevProps) {
        console.log(`结束监听 ${prevProps.friendId} 在线状态`)
        console.log(`开始监听 ${this.props.friendId} 在线状态`)
    }
}

export default FriendStatus
