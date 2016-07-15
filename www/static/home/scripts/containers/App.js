import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import DesktopContainer from '../containers/DesktopContainer';
import TaskBarContainer from '../containers/TaskBarContainer';
import StartMenuContainer from '../containers/StartMenuContainer';

const propTypes = {};

class App extends Component {

    render() {

        return (
            <div>
                <DesktopContainer />
                <TaskBarContainer />
                <StartMenuContainer />
            </div>
        );
    }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
    const { applists,startmenu } = state;

    return {
        applists,
        startmenu
    };
}


export default connect(mapStateToProps)(App);
