import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TaskBar from '../components/TaskBar';


const propTypes = {};

class TaskBarContainer extends Component {
    render() {
        return <TaskBar {...this.props} />;
    }
}

TaskBarContainer.propTypes = propTypes;

function mapStateToProps(state) {
    const {applists, startmenu} = state;
    return {
        applists,
        startmenu
    }
}

export default connect(mapStateToProps)(TaskBarContainer);
