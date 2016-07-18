import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';

import { constructDesktopAppDomainUrl } from '../utils/DesktopUtils.js';

const propTypes = {
    data: PropTypes.object.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
};

class AppCard extends Component {
    constructor(props) {
        super(props);


        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.handleMouseDoubleClick = this.handleMouseDoubleClick.bind(this);
    }

    handleMouseClick(e) {
    }

    handleMouseDoubleClick(e) {
        const {id} = this.props;

        let url = `${constructDesktopAppDomainUrl()}openApp?id=${id}`;
        window.open(url)
    }

    render() {
        const { data, left, top} = this.props;
        let icon;

        try {
            icon = require(`../../images/${data.name}.png`);
        } catch (e) {
            icon = require(`../../images/computer.png`);
        }

        return (
            <div className="desktop-app" ref="deskTopApp" onClick={this.handleMouseClick}
                 onDoubleClick={this.handleMouseDoubleClick} style={{position:'absolute',left:left,top:top}}>
                <div className="desktop-icon" style={{backgroundImage:`url(${icon})`}}></div>
                <div className="desktop-name">{data.name}</div>
            </div>
        );
    }
}

AppCard.propTypes = propTypes;

export default AppCard;

