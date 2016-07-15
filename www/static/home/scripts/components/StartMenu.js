import React, { Component, PropTypes } from 'react';


const propTypes = {};

class StartMenu extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {

    }

    componentWillReceiveProps() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        const {isOpen} =this.state;

        return (
            <div className={`startmenu${(isOpen ? ' open' : '')}`}>
                <ul className="programs">
                    <li><a href="/">JSlint</a></li>
                    <li><a href="/">自测云</a></li>
                    <li><a href="/">WDriver</a></li>
                </ul>
                <ul className="startmenu-quick">
                    <li><a href="/">使用帮助</a></li>
                    <li><a href="/admin">系统设置</a></li>
                    <li><a href="/">代理设置</a></li>
                </ul>

                <a className="startmenu-logout" href="/sigin/login">退出</a>
            </div>
        );


    }

}

StartMenu.propTypes = propTypes;

export default StartMenu;

