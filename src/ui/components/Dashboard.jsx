import React, {Component} from 'react';
import FloatingButton from '../views/FloatingButton'
import BottomTabBar from './BottomTabBar'
import {browserHistory} from "react-router";
import TasksTable from "./TasksTable";
import TodayComponent from "./TodayComponent";
import MapContainer from "./MapContainer";
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
                showingComponent = <MapContainer />
        }


        return (
        <div>
            <div style={{height: "100%", position: "relative", bottom: "80px" ,width:"100%"}} className="DashboardContentContainer">
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