
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
        this.props.stores.PostStore.fetchItem(this.props.postid);
    }
    render() {
        if(this.state.gotoMain === true )
            return <Redirect to='/' />;

        if(this.state.gotoEdit === true)
            return <Redirect to={`/board/edit/${this.props.postid}`}/>;

        let p = this.props.stores.PostStore;
        let u = this.props.stores.ProfileStore;
        if (p.viewitem === null)
            return <div/>;

        let btn = {
          btnRemove: null,
          btnUpdate: null
        };
        if (u.islogin === true ){
            if (u.item.id === p.viewitem.user_id){
                btn.btnRemove = <button onClick={this.removePost}>삭제</button>
                btn.btnUpdate = <button onClick={this.updatePost}>수정</button>
            } else {
                btn = <div/>
            }
        }

        return (
            <div className="board-view-item">
                <div>
                    제목 : {p.viewitem.title}
                </div>
                <div>
                    내용 :
                    <div className='board-view-content'
                         dangerouslySetInnerHTML={{__html: p.viewitem.content}}>
                    </div>
                </div>
                <div>
                    작성시간 : {new Date(p.viewitem.created).toLocaleString()}
                </div>
                <div className="btn_new">
                    <Link to='/'>목록</Link>
                    {btn.btnRemove}
                    {btn.btnUpdate}
                </div>
            </div>
        );
    }

    removePost = async () => {
        if(window.confirm("삭제하시겠습니까?") === false) return;

        if(await this.props.stores.PostStore.removePost(this.props.stores.PostStore.viewitem.id)) {
            await this.props.stores.PostStore.fetchItems();
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