import React, {Component} from 'react';
import {inject,observer} from 'mobx-react/index'
import {Link} from 'react-router-dom';
import './user.scss';
@inject('stores')
@observer
class LogoutItem extends Component {
    // componentDidMount() {
    //     this.props.stores.PostStore.fetchItems();
    // }

    render() {
        let user = this.props.stores.ProfileStore.item;
        let link = `/user/view/${user.id}`;
        return (
            <div>
                <div className="login-content">
                    <Link to={link} user={user}>
                        {this.props.stores.ProfileStore.item.username}님
                    </Link>
                    <Link to= '/' onClick={this.onLogout} >로그아웃</Link>
                </div>
            </div>
        );
    }

    onLogout = () => {
        this.props.stores.ProfileStore.item = null;
       this.props.stores.ProfileStore.islogin = false;
    };
}

export default LogoutItem;