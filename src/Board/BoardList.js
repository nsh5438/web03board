import React from 'react';
import {Link} from 'react-router-dom';
import BoardListItem from './BoardListItem';

const BoardList = (props) => {

    let addPost = null;
    if (props.islogin === true) addPost = <Link to='/board/new'>새 글 쓰기</Link>;
    else addPost = <div/>;
    return (
        <div>
            {props.items.map(item => <BoardListItem key={item.id} post={item} />)}
            <div className="btn_new">
                {addPost}
            </div>
        </div>
    );
};

export default BoardList;