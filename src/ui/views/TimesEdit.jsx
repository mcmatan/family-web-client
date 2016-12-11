import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import {createTaskServiceShared} from '../../core/Services/CreateTaskService';
import {connect} from "react-redux";
import FlatButton from 'material-ui/FlatButton';



class TimesEdit extends Component {

    onAddTimePress() {
        this.props.dispatch(createTaskServiceShared.dateChangedAIndex(null, this.props.dates.length));
    }

    onChange = (index, unusedValue, date) => {
        this.props.dispatch(createTaskServiceShared.dateChangedAIndex(date, index));
    };

    render() {

        const times = this.props.times.map((value, index) => {
            let date = new Date(value);
            if (!value) {
                date = null;
            }
            return (
                <div>
                    <TimePicker
                        hintText="Enter time"
                        onChange={this.onChange.bind(this, index)}
                        key={index}
                        value={date}
                        style={{width:"50%"}}
                    />
                    <FlatButton label="Remove time" secondary={true} style={{width:"50%"}}/>
                </div>
            )
        });

        return <div style={this.props.style}>
            <RaisedButton label="Add time +" primary={true} onClick={this.onAddTimePress.bind(this)}/>
            {times}
        </div>
    }
}

function mapStateToProps(state) {
    return {times: state.editTaskReducer.times};
}

export default connect(mapStateToProps)(TimesEdit);
