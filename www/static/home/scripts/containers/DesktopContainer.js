import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import {fetchApps} from '../actions/app';
import Desktop from '../components/Desktop';


const propTypes = {};

class desktopContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchApps());
    }

    render() {
        return <Desktop {...this.props} />;
    }
}

desktopContainer.propTypes = propTypes;

function mapStateToProps(state) {
    const {dispatch, applists } = state;
    return { applists };
}

export default connect(mapStateToProps)(desktopContainer);
