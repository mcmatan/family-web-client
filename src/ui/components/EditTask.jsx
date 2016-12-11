import React, {Component} from "react";
import DaysEdit from "./DaysEdit";
import TimesEdit from "../views/TimesEdit";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {connect} from "react-redux";
import {cancelEditingTask} from "../../core/actions/EditTasksActions";
import {editTaskServiceShared} from "../../core/services/EditTaskService";


/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */


class EditTask extends Component {
    state = {
        open: false,
    };

    handleClose = () => {
        this.props.dispatch(cancelEditingTask());
        this.setState({open: false});
    };

    handleUpdate = () => {
        this.props.dispatch(editTaskServiceShared.updateTask(this.props.editTaskReducer));
        this.setState({open: false});
    };

    handleDeleteTask = () => {
        this.props.dispatch(editTaskServiceShared.removeTask(this.props.taskBeforeUpdate))
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Update"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleUpdate}
            />,
            <FlatButton label="Delete task"
                        secondary={true}
                        onTouchTap={this.handleDeleteTask.bind(this)}
                        style={{
                float: "left",
            }} />
        ];

        if (!this.props.isOpen) {
            return <div />
        }

        return (
            <div style={{height: 0}}>
                <Dialog
                    title={this.props.isOpen && this.props.taskTypeDisplay}
                    actions={actions}
                    modal={true}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <DaysEdit style={{
                            float: "left",
                            paddingLeft: 30,
                            paddingTop: 30,
                            paddingBottom: 30,
                            paddingRight: 30
                        }}/>
                        <TimesEdit style={{
                            float: "left",
                            paddingLeft: 30,
                            paddingTop: 30,
                            paddingBottom: 30,
                            paddingRight: 30
                        }}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        taskBeforeUpdate: state.editTaskReducer.taskBeforeUpdate,
        editTaskReducer: state.editTaskReducer,
        isOpen: state.editTaskReducer.editingTask,
        taskTypeDisplay: state.editTaskReducer.taskTypeDisplay
    }
}

export default connect(mapStateToProps)(EditTask);