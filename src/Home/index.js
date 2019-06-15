import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import './home.scss';
import {Link} from "react-router-dom";

import Board from '../Board'

@inject('stores')
@observer
class Home extends Component {


    render() {
        // let t = this.props.stores.TimeStore;
        return (
            <div className="Home">
                <Board/>
            </div>
        );
    }
}

export default Home;