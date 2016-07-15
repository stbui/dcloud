import React, { Component, PropTypes } from 'react';

import AppCard from './AppCard.js';


const propTypes = {};

class Desktop extends Component {

    constructor(props) {
        super(props);

        this.onResize = this.onResize.bind(this);

        this.state = {
            adjust: false
        }
    }

    componentDidMount() {
        window.addEventListener('resize', this.onResize, false);
    }

    onResize() {
        // 触发事件，通知dom更新数据
        //adjust属性没有实际意义
        this.setState({
            adjust: true
        });
    }

    renderDesktop() {
        const {applists} = this.props;
        const datas = applists.items;

        return datas.map((data, key)=> {
            var e = 10, a = 10, t = 85, i = 100, n = 10, s = document.documentElement.clientHeight, o = Math.floor((s - e) / (i + n)), r = 0, l = 0, c = 0, d = 0;
            r = key % o, l = Math.floor(key / o), c = a + (t + n) * l, d = e + (i + n) * r

            let left = c;
            let top = d;

            return <AppCard data={data} key={key} id={data.id} left={left} top={top}/>
        });
    }

    render() {

        return (
            <div className="desktop">
                {this.renderDesktop()}
            </div>
        );
    }
}

Desktop.propTypes = propTypes;

export default Desktop;
