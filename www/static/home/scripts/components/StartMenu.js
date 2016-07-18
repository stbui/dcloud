import React, { Component, PropTypes } from 'react';
import Dialog from 'rc-dialog';
import Switch from 'rc-switch';

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

        console.log(e.target.innerHTML)

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

        if (title == '代理设置') {
            return (
                <Dialog style={{width:width}} title={title} onClose={this.onClose} visible={visible}>
                    <Switch onChange={this.onChange}
                            disabled={this.state.disabled}
                            checkedChildren={'开'}
                            unCheckedChildren={'关'}
                    />
                    <Proxy />
                </Dialog>
            );
        } else if (title == '使用帮助') {
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


    render() {

        return (
            <div className={`startmenu open`}>
                <ul className="programs">
                    <li><a href="/jslint">JSlint</a></li>
                    <li><a href="/">自测云</a></li>
                    <li><a href="/wdriver">WDriver</a></li>
                </ul>
                <ul className="startmenu-quick">
                    <li className="startmenu-profile">
                        <div className="startmenu-icon"></div>
                        <div className="startmenu-name">administrator</div>
                    </li>
                    <li><a href="/profile/proxy" onClick={this.onHandleProxyClick}>代理设置</a></li>
                    <li><a href="/admin">系统设置</a></li>
                    <li><a href="/help" onClick={this.onHandleHelpClick}>使用帮助</a></li>
                </ul>

                <a className="startmenu-logout" href={`/signin/logout`}>退出</a>

                {this.renderDialogContent()}
            </div>
        );


    }

}

export default StartMenu;

