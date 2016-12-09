import React, {Component} from "react";
import Subheader from "material-ui/Subheader";
import Avatar from "material-ui/Avatar";
import {connect} from "react-redux";
import {List, ListItem, makeSelectable} from "material-ui/List";
import Divider from 'material-ui/Divider';
import DayPicker from '../views/DayPicker';


/*

 const rows = this.props.tasks.map(function (task) {
 return (
 <div key={task.uid + "wdwd"}>
 <ListItem
 leftAvatar={<Avatar src={task.taskType.src}/>}
 primaryText={task.taskType.display}
 key={task.uid}
 children={
 <div key={task.uid}>
 <span style={{color: darkBlack}}>Days:</span>
 <div>
 <span>{task.days}</span>
 </div>
 </div>
 }
 secondaryTextLines={2}
 />
 <Divider inset={true}/>
 </div>
 )
 });
 */


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
        const someDiv = <div key="Im the key" style={{width:"100px", height:"100px", textAlign: "center"}}>Im a div</div>;
        return (
                <SelectableList defaultValue={3}>
                    <Subheader>Selectable Contacts</Subheader>
                    <ListItem
                        value={1}
                        primaryText="Brendan Lim"
                        leftAvatar={<Avatar src="images/ok-128.jpg"/>}
                        nestedItems={[
                            <ListItem
                                value={2}
                                primaryText="Grace Ng"
                                leftAvatar={<Avatar src="images/uxceo-128.jpg"/>}
                                children={<DayPicker />}
                            />,
                        ]}
                    />
                    <ListItem
                        style={{textAlign: "center"}}
                        children={someDiv}
                        value={3}
                        primaryText="Kerem Suer"
                        leftAvatar={<Avatar src="images/kerem-128.jpg"/>}
                    />
                    <ListItem
                        value={4}
                        primaryText="Eric Hoffman"
                        leftAvatar={<Avatar src="images/kolage-128.jpg"/>}
                    />
                    <ListItem
                        value={5}
                        primaryText="Raquel Parrado"
                        leftAvatar={<Avatar src="images/raquelromanp-128.jpg"/>}
                    />
                </SelectableList>
        );
    }
}

function mapStateToProps(state) {
    return {tasks: state.tasksChangedReducer.tasks}
}

export default connect(mapStateToProps)(TasksTable);

