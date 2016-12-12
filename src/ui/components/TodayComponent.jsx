import React, {Component} from "react";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from "material-ui/List";
import EditTask from "./EditTask";
import {startEditingTask} from "../../core/actions/EditTasksActions";
import moment from "moment";
import {blueDefault} from "../../model/Colors";

let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        render() {
            return (
                <ComposedComponent
                    value={this.props.selectedValue}
                    onChange={ () => {
                    }}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class TodayComponent extends Component {

    state = {
        selectedIndex: -1
    };

    children = (scheduledTask, index) => {
        return (<div key={scheduledTask.uid} style={{display: "flex", justifyContent: "center"}}>
            <div style={{display: "flex", justifyContent: "flexStart"}}>
                <div style={{margin: "20px", flexDirection: "column"}}>
                    <div style={{fontSize: "30px", color: blueDefault}}>
                        {moment(scheduledTask.date).format("HH:mm")}
                    </div>
                </div>
                <div style={{margin: "20px", flexDirection: "column", display: "flex"}}>
                    <div style={{fontSize: "20px", width: "150px"}}>
                        {scheduledTask.taskType.display}
                    </div>
                </div>
            </div>
        </div>);
    };

    /*
     <div style={{margin: "20px", flexDirection: "column", display: "flex"}}>
     <Avatar src={scheduledTask.taskType.src}/>
     </div>
     */

    render() {
        if (!this.props.scheduledTasks || this.props.scheduledTasks.length == 0) {
            return (<div>No Tasks</div>)
        }

        const self = this;
        const rows = this.props.scheduledTasks.map(function (scheduledTask, index) {
            return (
                <ListItem
                    key={scheduledTask.uid}
                    open={self.state.selectedIndex === index}
                    value={index}
                    onTouchTap={self.onSelect.bind(this, index)}
                    children={self.children(scheduledTask, index)}
                />
            )
        });

        return (
            <div>
                <EditTask />
                <SelectableList selectedValue={this.state.selectedIndex} onSelect={self.onSelect}>
                    {rows}
                </SelectableList>
            </div>
        );
    }

    onSelect = (index, value) => {
        this.props.dispatch(startEditingTask(this.props.scheduledTasks[index]));
    };

    setSelectedIndex(index) {
        this.setState(
            {selectedIndex: index}
        );
    }
}

function mapStateToProps(state) {
    return {scheduledTasks: state.scheduledTasksReducer.allScheduledTasks}
}

export default connect(mapStateToProps)(TodayComponent);
