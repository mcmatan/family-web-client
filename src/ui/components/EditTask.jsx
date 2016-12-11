import React, {Component} from "react";
import DaysEdit from "./DaysEdit";
import TimePicker from "../views/TimesPicker";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {connect} from "react-redux";
import {endEditingTask} from "../../core/actions/EditTasksActions";

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */

const customContentStyle = {
    width: '80%',
    maxWidth: 'none',
};

class EditTask extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.props.dispatch(endEditingTask());
        this.setState({open: false});
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return (
            <div style={{height: 0}}>
                <Dialog
                    contentStyle={customContentStyle}
                    title={this.props.isOpen && this.props.task.taskType.display}
                    actions={actions}
                    modal={true}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <div>
                        <DaysEdit style={{ display: "inline-block", paddingLeft: 30, paddingTop: 30, paddingBottom: 30, paddingRight: 30}}/>
                        <TimePicker style={{ display: "inline-block", paddingLeft: 30, paddingTop: 30, paddingBottom: 30, paddingRight: 30}}/>
                    </div>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        isOpen: state.editTaskReducer.editingTask,
        task: state.editTaskReducer.task
    }
}

export default connect(mapStateToProps)(EditTask);