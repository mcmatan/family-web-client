import React, {Component} from 'react';
import FloatingButton from '../views/FloatingButton'
import BottomTabBar from './BottomTabBar'
import {browserHistory} from "react-router";
import TasksTable from "./TasksTable";

class Dashboard extends Component {

    onFloatingButtonClick = () => {
        browserHistory.push('addTask');
    };

    render() {
        return (
        <div style={{width:"100%",  height: 300}}>
            <div style={{height: "100%", display: "inline-block" ,width:"100%"}}>
                <TasksTable />
            </div>
            <FloatingButton onClick={this.onFloatingButtonClick} />
            <BottomTabBar />
        </div>

        )
    }
}

export default Dashboard;