import React, { Component, PropTypes } from 'react';
import Trigger from 'rc-trigger';

import {changeStartMenu} from '../actions/startmenu';
import StartMenu from '../components/StartMenu';


class TaskBar extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isOpen: false,
            timer: ''
        }
    }

    componentDidMount() {
        this.onTimer();
    }

    componentDidUpdate() {
    }

    onClose() {

    }

    onTimer() {
        let now = new Date();
        let f = {
            h: now.getHours(),
            m: now.getMinutes(),
        }

        this.onClose = this.onClose.bind(this);

        this.setState({timer: `${f.h}:${f.m}`});
    }

    render() {
        const {timer} = this.state;

        return (
            <div className="taskbar">
                <div className="taskbar-left">
                    <Trigger
                        action={['click']}
                        popupAlign={{
                          points: ['tl', 'cc'],
                          offset: [-29, 16]
                        }}
                        popup={<StartMenu {...this.props} />}
                    >
                        <sapn className="taskbar-start">开始</sapn>
                    </Trigger>
                </div>
                <div className="taskbar-right">
                    <sapn className="taskbar-time">{timer}</sapn>
                    <span className="taskbar-desktop"></span>
                </div>
            </div>
        );
    }
}


export default TaskBar;

