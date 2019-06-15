import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react/index'
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component{
    state = {
      account : "",
      password : "",
      gotoMain : false
    };
    render() {
        if(this.state.gotoMain)
            return <Redirect to={{pathname : '/', state : {isLogin: true}}} />;
        return (
            <div>
                <div className="home-board">
                    <div className="home-header">로그인</div>
                    <div className="input-box">
                        아이디 : <input type="text" value={this.state.account} onChange={this.updateAccount}/>
                    </div>
                    <div className="input-box">
                        비밀번호 : <input type="password" value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div className="btn_new">
                        <button onClick={this.onlogin}>로그인</button>
                        <Link to='/user/register' >회원가입</Link>
                    </div>
                </div>
            </div>
        );
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    onlogin = () => {;
        if (this.props.stores.ProfileStore.onLogin(this.state)){
            this.setState({
                ...this.state,
                gotoMain: true
            });
        }
    };
}

export default Login;