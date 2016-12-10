import React, {Component} from 'react';
import DayPicker from '../views/DayPicker';
import TimePicker from '../views/TimesPicker';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from "react-redux";
import {endEditingTask} from "../../core/actions/EditTasksActions";

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
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
            <div style={{height:0}}>
                <Dialog
                    title="Dialog With Actions"
                    actions={actions}
                    modal={true}
                    open={this.props.isOpen}
                    onRequestClose={this.handleClose}
                >
                    The actions in this window were passed in as an array of React objects.
                    <div>
                        <DayPicker style={{width: "30%", display: "inline-block"}} />
                        <TimePicker style={{width: "30%", display: "inline-block"}} />
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