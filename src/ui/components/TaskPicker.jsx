import React, {Component} from "react";
import {List, ListItem, makeSelectable} from "material-ui/List";
import Avatar from "material-ui/Avatar";
import TaskType from "../../model/TaskType";
import {createTaskServiceShared} from "../../core/Services/CreateTaskService";
import {connect} from "react-redux";


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {
        render() {
            return (
                <ComposedComponent
                    value={this.props.selectedValue}
                    onChange={this.props.onSelect}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class TaskPicker extends Component {

    onSelect = (value, index) => {
        this.props.dispatch(createTaskServiceShared.selectedTaskType(index));
    };

    render() {
        const listItems = TaskType.all().map((taskType, index) => {
            return (<ListItem
                value={index}
                key={taskType.key}
                primaryText={taskType.display}
                leftAvatar={<Avatar src={taskType.src}
                />}
            />)
        });

        return (
            <SelectableList selectedValue={this.props.selectedIndex} onSelect={this.onSelect}>
                {listItems}
            </SelectableList>
        )
    }
}

function mapStateToProps(state) {
    if (state.createTaskReducer.selectedTaskType) {
        const index = state.createTaskReducer.selectedTaskType.index;
        return {selectedIndex: index};
    }
    return {};
}

export default connect(mapStateToProps)(TaskPicker)


