import React, { Component, PropTypes } from 'react';


class Proxy extends Component {

    render() {
        return (
            <table className="table">
                <thead>
                <tr>
                    <th>IP</th>
                    <th>域名</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>127.0.0.1</td>
                    <td>dcloud.stbui.com</td>
                    <td>x</td>
                </tr>
                <tr>
                    <td><input className="form-control" type="text"/></td>
                    <td><input className="form-control" type="text"/></td>
                    <td>√</td>
                </tr>
                </tbody>
            </table>
        );
    }
}

export default Proxy;