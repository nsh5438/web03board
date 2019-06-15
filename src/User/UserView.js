
import React, {Component} from 'react';
import {inject,observer} from 'mobx-react/index'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "../Home/home.scss";
@inject('stores')
@observer
class PostView extends Component {
    state = {
        gotoEdit: false,
        gotoMain : false
    };
    componentDidMount() {
        this.props.stores.ProfileStore.userView(this.props.userid);
    }
    render() {
        if(this.state.gotoMain === true )
            return <Redirect to='/' />;

        if(this.state.gotoEdit === true)
            // return <Redirect to='/board/edit'/>;
            return <Redirect to={`/user/edit/${this.props.userid}`}/>;

        let p = this.props.stores.ProfileStore;
        if (p.viewitem === null)
            return <div/>;
        return (
            <div className="board-view-item">
                <div>
                    아이디 : {p.viewitem.account}
                </div>
                <div>
                    이름 : {p.viewitem.username}
                </div>
                <div>
                    이메일 : {p.viewitem.email}
                </div>
                <div>
                    작성시간 : {new Date(p.viewitem.created).toLocaleString()}
                </div>
                <div className="btn_new">
                    <Link to='/'>목록</Link>
                    <button onClick={this.removePost}>삭제</button>
                    <button onClick={this.updatePost}>수정</button>
                </div>
            </div>
        );
    }

    removePost = async () => {
        if(window.confirm("삭제하시겠습니까?") === false) return;

        if(await this.props.stores.ProfileStore.removeUser(this.props.stores.ProfileStore.viewitem.id)) {
            this.setState({
                ...this.state,
                gotoMain: true
            });
        }
    };

    updatePost = () => {
        this.setState({ gotoEdit: true });
    };
}

export default PostView;