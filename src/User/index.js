import React, {Component} from 'react';
import {inject,observer} from 'mobx-react/index'
import Login from './Login';
import LoginItem from './LoginItem';
import LogoutItem from './LogoutItem';
import Register from './Register';
import UserView from './UserView';
import './user.scss';
import PostNew from "../Board/PostNew";
@inject('stores')
@observer
class User extends Component {
    // componentDidMount() {
    //     this.props.stores.PostStore.fetchItems();
    // }

    render() {
        if(this.props.match && this.props.match.params.command === 'login')
            return <Login/>;

        if(this.props.match && this.props.match.params.userid &&  this.props.match.params.command === 'edit')
            return <Register userid={this.props.match.params.userid}/>;

        if(this.props.match && this.props.match.params.command === 'register')
            return <Register/>;

        if (this.props.match && this.props.match.params.userid && this.props.match.params.command === 'view')
            return <UserView userid={this.props.match.params.userid}/>;

        let button = null;
        if (this.props.stores.ProfileStore.islogin) {
            button = <LogoutItem />;
        } else {
            button = <LoginItem />
        }
        return (
            <div>
                {button}
            </div>
        );
    }
}

export default User;