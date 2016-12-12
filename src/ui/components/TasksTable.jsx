import React, {Component} from "react";
import Avatar from "material-ui/Avatar";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from "material-ui/List";
import EditTask from "./EditTask";
import {startEditingTask} from "../../core/actions/EditTasksActions";
import Spinner from "../views/Spinner";

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

class TasksTable extends Component {

    state = {
        selectedIndex: -1
    };

    children = (task, index) => {
        return (<div key={task.uid}><Avatar src={task.taskType.src}/>
        </div>);
    };

    render() {
        if (!this.props.tasks) {
            return (<Spinner>Loading</Spinner>);
        }

        if (this.props.tasks.length == 0) {
            return (<div>No Tasks</div>);
        }

        const self = this;
        const rows = this.props.tasks.map(function (task, index) {
            return (
                <ListItem
                    primaryText={task.taskType.display}
                    key={task.uid}
                    secondaryTextLines={2}
                    open={self.state.selectedIndex === index}
                    value={index}
                    onTouchTap={self.onSelect.bind(this, index)}
                    style={{textAlign: "center"}}
                    children={self.children(task, index)}
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
        this.props.dispatch(startEditingTask(this.props.tasks[index]));
    };

    setSelectedIndex(index) {
        this.setState(
            {selectedIndex: index}
        );
    }
}

function mapStateToProps(state) {
    return {tasks: state.tasksChangedReducer.tasks}
}

export default connect(mapStateToProps)(TasksTable);

