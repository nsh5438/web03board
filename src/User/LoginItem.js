import React from 'react';
import {Link} from 'react-router-dom';

const LoginItem = (props) => {
    return (
        <div>
            <div className="login-content">
                <Link to='/user/login' >로그인</Link>
            </div>
        </div>
    );
};

export default LoginItem;