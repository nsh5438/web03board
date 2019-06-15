import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react/index'

@inject('stores')
@observer
class Register extends Component {

    constructor(props){
      super(props);
      this.state = {
          id:"",
          account : "",
          password : "",
          username: "",
          email:"",
          gotoLogin : false
      };
        if (this.props.userid && this.props.stores.ProfileStore.viewitem !== null)
            this.state = {
                ...this.state,
                id: this.props.userid,
                account: this.props.stores.ProfileStore.viewitem.account,
                password: "",
                username: this.props.stores.ProfileStore.viewitem.username,
                email: this.props.stores.ProfileStore.viewitem.email
            };
    };
    render() {
        if(this.state.gotoLogin)
            return <Redirect to='/user/login' />;
        return (
            <div>
                <div className="home-board">
                    <div className="home-header">회원가입</div>
                    <div className="input-box">
                        아이디 : <input type="text" value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div className="input-box">
                        비밀번호 : <input type="password" value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div className="input-box">
                        이름 : <input type="text" value={this.state.username} onChange={this.updateName}/>
                    </div>
                    <div className="input-box">
                        이메일 : <input type="text" value={this.state.email} onChange={this.updateEmail}/>
                    </div>
                    <div className="btn_new">
                        <button onClick={this.onRegister}>확인</button>
                    </div>
                </div>
            </div>
        );
    }

    onRegister = async () => {
        if (this.props.userid && await this.props.stores.ProfileStore.updateUser(this.state)) {
            this.setState({
                ...this.state,
                gotoLogin: true
            });
        }else if(await this.props.stores.ProfileStore.onRegister(this.state)){
            this.setState({
               ...this.state,
                gotoLogin: true
            });
        }
    };

    updateAccount = event => {
        this.setState({
            ...this.state,
            account: event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    };

    updateName = event => {
        this.setState({
            ...this.state,
            username: event.target.value
        });
    };

    updateEmail = event => {
        this.setState({
            ...this.state,
            email: event.target.value
        });
    };
}

export default Register;