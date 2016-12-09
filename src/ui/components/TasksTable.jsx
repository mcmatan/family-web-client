import React, {Component} from "react";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from "material-ui/List";
import Divider from 'material-ui/Divider';
import DayPicker from '../views/DayPicker';


let SelectableList = makeSelectable(List);

function wrapState(ComposedComponent) {
    return class SelectableList extends Component {

        componentWillMount() {
            this.setState({
                selectedIndex: this.props.defaultValue,
            });
        }

        handleRequestChange = (event, index) => {
            this.setState({
                selectedIndex: index,
            });
        };

        render() {
            return (
                <ComposedComponent
                    value={this.state.selectedIndex}
                    onChange={this.handleRequestChange}
                >
                    {this.props.children}
                </ComposedComponent>
            );
        }
    };
}

SelectableList = wrapState(SelectableList);

class TasksTable extends Component {

    render() {

        const rows = this.props.tasks.map(function (task) {
            return (
                <div key={task.uid + "wdwd"}>
                    <ListItem
                        leftAvatar={<Avatar src={task.taskType.src}/>}
                        primaryText={task.taskType.display}
                        key={task.uid}
                        secondaryTextLines={2}
                        nestedItems={[
                            <ListItem
                                value={2}
                                children={<DayPicker />}
                            />,
                        ]}
                    />
                    <Divider inset={true}/>
                </div>
            )
        });

        return (
                <SelectableList defaultValue={3}>
                    <Subheader>Tasks</Subheader>
                    {rows}
                </SelectableList>
        );
    }
}

function mapStateToProps(state) {
    return {tasks: state.tasksChangedReducer.tasks}
}

export default connect(mapStateToProps)(TasksTable);

