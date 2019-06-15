import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react/index'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostNew extends Component {
    // state = {
    //     title : "",
    //     content : "",
    //     user_id : 1,
    //     gotoMain : false
    // };
    //
    // async componentDidMount() {
    //     if (this.props.postid && this.props.stores.PostStore.viewitem !== null) {
    //         this.setState({
    //             ...this.state,
    //             id: this.props.stores.PostStore.viewitem.id,
    //             title: this.props.stores.PostStore.viewitem.title,
    //             content: this.props.stores.PostStore.viewitem.content,
    //         })
    //     }
    // }

    constructor(props){
        super(props);
        this.state = {
            title : '',
            content : '',
            user_id : this.props.stores.ProfileStore.item.id,
            gotoMain : false
        };
        if (this.props.postid && this.props.stores.PostStore.viewitem !== null)
            this.state = {
                ...this.state,
                id: this.props.stores.PostStore.viewitem.id,
                title: this.props.stores.PostStore.viewitem.title,
                content: this.props.stores.PostStore.viewitem.content
            };
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/' />;
        return (
            <div className="board-view-item">
                <div>
                    제목 : <input value={this.state.title} onChange={this.updateTitle}/>
                </div>
                <div>
                    내용 :
                    <div>
                        {/*<textarea value={this.state.content} onChange={this.updateContent}/>*/}
                        <CKEditor editor={ClassicEditor}
                                  data={this.state.content}
                                  onChange={this.updateContent}
                        />
                    </div>
                </div>
                <div className="btn_new">
                    <button onClick={this.addNewPost}>확인</button>
                </div>
            </div>
        );
    }


    updateContent = (event,editor) => {
        this.setState({
            ...this.state,
            content: editor.getData()
        });
    };

    addNewPost = async () => {

        if (!window.confirm("실행하시겠습니까?")) return false;

        if (this.props.postid && await this.props.stores.PostStore.updatePost(this.state)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToMain: true
            });
        }else if(await this.props.stores.PostStore.addNewPost(this.state)) {
            await this.props.stores.PostStore.fetchItems();
            this.setState({
                ...this.state,
                goToMain: true
            });
        }
    };

    updateTitle = event => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    };
}

export default PostNew ;