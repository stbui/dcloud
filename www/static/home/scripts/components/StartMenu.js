import React, { Component, PropTypes } from 'react';
import Dialog from 'rc-dialog';
import Switch from 'rc-switch';

import * as types from '../constants/StartMenu';
import Proxy from './Proxy';


class StartMenu extends Component {
    constructor(props) {
        super(props);


        this.onHandleProxyClick = this.onHandleProxyClick.bind(this);
        this.onHandleHelpClick = this.onHandleHelpClick.bind(this);
        this.onClose = this.onClose.bind(this);

        this.state = {
            visible: false,
            width: 600,
            disabled: false,
            title: '设置'

        }
    }

    onHandleProxyClick(e) {
        e.preventDefault();

        this.setState({
            visible: true,
            width: 600,
            title: e.target.innerHTML
        })
    }

    onHandleHelpClick(e) {
        e.preventDefault();

        this.setState({
            visible: true,
            width: 800,
            title: e.target.innerHTML
        })
    }

    onClose(e) {
        this.setState({
            visible: false,
        });
    }

    toggle() {
        this.setState({
            disabled: !this.state.disabled,
        });
    }

    onChange() {

    }


    renderDialogContent() {
        const {visible,width,title} = this.state;


        if (title == types.USER_PROFILES_PROXY) {
            return (
                <Dialog style={{width:width}} title={title} onClose={this.onClose} visible={visible}>
                    <Switch onChange={this.onChange}
                            disabled={this.state.disabled}
                            checkedChildren={'开'}
                            unCheckedChildren={'关'}
                    />
                    <Proxy {...this.props} />
                </Dialog>
            );
        } else if (title == types.USER_PROFILES_HELP) {
            return (
                <Dialog style={{width:width}} title={title} onClose={this.onClose} visible={visible}>

                </Dialog>
            );
        } else {
            return (
                <Dialog style={{width:width}} title={title} onClose={this.onClose} visible={visible}>

                </Dialog>
            );
        }
    }

    renderLists() {
        const START_MENU_LISTS = types.START_MENU_LISTS;
        let data = [];

        START_MENU_LISTS.map((value, key)=> {
            data.push(<li key={key}><a href={value.link}>{value.name}</a></li>);
        });

        return data;
    }


    render() {
        const {authed} = this.props;
        const {accessToken,user} = authed;

        return (
            <div className={`startmenu open`}>
                <ul className="programs">
                    {this.renderLists()}
                </ul>
                <ul className="startmenu-quick">
                    <li className="startmenu-profile">
                        <div className="startmenu-icon"></div>
                        <div className="startmenu-name">{accessToken}</div>
                    </li>
                    <li><a href="/profile/proxy" onClick={this.onHandleProxyClick}>{types.USER_PROFILES_PROXY}</a></li>
                    <li><a href="/admin">{types.USER_PROFILES_SYSTEM}</a></li>
                    <li><a href="/help" onClick={this.onHandleHelpClick}>{types.USER_PROFILES_HELP}</a></li>
                </ul>

                <a className="startmenu-logout" href={types.START_MENU_EXIT.link}>{types.START_MENU_EXIT.name}</a>

                {this.renderDialogContent()}
            </div>
        );


    }

}

export default StartMenu;

