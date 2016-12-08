import React, {Component} from 'react';
import FloatingButton from '../views/FloatingButton'
import BottomTabBar from './BottomTabBar'
import {browserHistory} from "react-router";

class Dashboard extends Component {

    onFloatingButtonClick = () => {
        browserHistory.push('addTask');
    };

    render() {
        return (
        <div style={{width:"100%",  height: 300}}>
            <div style={{width:"100%",  height: "100%"}}></div>
            <FloatingButton onClick={this.onFloatingButtonClick} />
            <BottomTabBar />
        </div>

        )
    }
}

export default Dashboard;