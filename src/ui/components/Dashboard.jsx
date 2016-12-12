import React, {Component} from 'react';
import FloatingButton from '../views/FloatingButton'
import BottomTabBar from './BottomTabBar'
import {browserHistory} from "react-router";
import TasksTable from "./TasksTable";
import TodayComponent from "./TodayComponent";
import {connect} from "react-redux";

class Dashboard extends Component {

    onFloatingButtonClick = () => {
        browserHistory.push('addTask');
    };

    render() {

        let showingComponent = {};
        switch (this.props.selectedIndex) {
            case 0:
                showingComponent = <TasksTable />;
                break;
            case 1:
                showingComponent = <TodayComponent />;
                break;
            default:
                showingComponent = <div>Work in progress...</div>
        }


        return (
        <div style={{width:"100%",  height: 300}}>
            <div style={{height: "100%", display: "inline-block" ,width:"100%"}}>
                {showingComponent}
            </div>
            <FloatingButton onClick={this.onFloatingButtonClick} />
            <BottomTabBar />
        </div>

        )
    }
}


function mapStateToProps(state) {
    return {selectedIndex: state.applicationUIStateReducer.dashboardTabBarIndex};
};

export default connect(mapStateToProps)(Dashboard);