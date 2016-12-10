import React, {Component} from "react";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from "material-ui/List";
import Divider from 'material-ui/Divider';
import DayPicker from '../views/DayPicker';
import EditTask from './EditTask';

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
        return (<div><Avatar src={task.taskType.src} key={task.uid}/>
        </div>);
    };

    render() {
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
            <SelectableList selectedValue={this.state.selectedIndex} onSelect={self.onSelect}>
                <Subheader style={{textAlign: "center"}}>Tasks</Subheader>
                {rows}
            </SelectableList>
        );
    }

    onSelect = (index, value) => {
        if (this.state.selectedIndex === index) {
            this.setSelectedIndex(-1);
        } else {
            this.setSelectedIndex(index);
        }
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

