import React, { Component, PropTypes } from 'react';

import {changeStartMenu} from '../actions/startmenu';


const propTypes = {};

class TaskBar extends Component {
    constructor(props) {
        super(props);

        this.onStartMenuClick = this.onStartMenuClick.bind(this);

        this.state = {
            isOpen: false,
            timer: ''
        }


    }

    onStartMenuClick(e) {
        this.setState({isOpen: !this.state.isOpen});

        const { dispatch } = this.props;
        dispatch(changeStartMenu(this.state));
    }

    onTimer() {
        let now = new Date();
        let f = {
            h: now.getHours(),
            m: now.getMinutes(),
        }

        this.setState({timer: `${f.h}:${f.m}`});
    }

    componentDidMount() {
        this.onTimer();
    }


    render() {
        const {timer} = this.state;

        return (
            <div className="taskbar">
                <div className="taskbar-left">
                    <sapn className="taskbar-start" onClick={this.onStartMenuClick}>开始</sapn>
                </div>
                <div className="taskbar-right">
                    <sapn className="taskbar-time">{timer}</sapn>
                    <span className="taskbar-desktop"></span>
                </div>
            </div>
        );
    }
}

TaskBar.propTypes = propTypes;

export default TaskBar;

