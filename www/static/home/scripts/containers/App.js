import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { initNavigator } from '../actions/navigator';
import { loginUser } from '../actions/authed';

import DesktopContainer from '../containers/DesktopContainer';
import TaskBarContainer from '../containers/TaskBarContainer';
import StartMenuContainer from '../containers/StartMenuContainer';

const propTypes = {};

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(initNavigator());
        dispatch(loginUser());
    }

    renderContent() {
        const { path } = this.props;
        console.log(path)
        switch (path[0]) {
            case 'desktop':
                break;
            case 'signin':
                break;
            default:
                break
        }
    }

    render() {

        return (
            <div>
                <DesktopContainer />
                <TaskBarContainer />
                {this.renderContent()}
            </div>
        );
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    const { applists,startmenu,navigator } = state;
    const {path} = navigator.route;

    return {
        applists,
        startmenu,
        path
    };
}


export default connect(mapStateToProps)(App);
