import React, {Component} from 'react';
import {inject,observer} from 'mobx-react/index'
import BoardList from './BoardList'
import PostView from "./PostView";
import User from '../User';
import PostNew from "./PostNew";
import './board.scss';
@inject('stores')
@observer
class Board extends Component {
    componentDidMount() {
        this.props.stores.PostStore.fetchItems();
    }

    render() {

        if(this.props.match && this.props.match.params.postid && this.props.match.params.command === 'view' )
            return <PostView postid={this.props.match.params.postid}/>;

        if(this.props.match && this.props.match.params.command === 'new')
            return <PostNew/>;

        if(this.props.match && this.props.match.params.postid && this.props.match.params.command === 'edit')
            return <PostNew postid={this.props.match.params.postid} />;

        let p = this.props.stores.PostStore;
        let u = this.props.stores.ProfileStore;
        return (
            <div>
                {/*<div className="login-content">*/}
                {/*    <a href="#">로그인</a>*/}
                {/*</div>*/}
                <User/>
                <div className="home-board">
                    <div className="home-header">공지사항</div>
                    <div className="home-body">
                        <div className="board-header">
                            <ul className='itembar item-title'>
                                <li>제목</li>
                                <li>작성자</li>
                                <li>작성일자</li>
                            </ul>
                            {p.items && <BoardList items={p.items} islogin={u.islogin}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;