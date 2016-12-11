import React, {Component} from "react";
import RaisedButton from "material-ui/RaisedButton";
import TimePicker from "material-ui/TimePicker";
import {connect} from "react-redux";
import FlatButton from "material-ui/FlatButton";
import {removeTime, dateChanged} from "../../core/actions/EditTasksActions";


class TimesEdit extends Component {

    onAddTimePress() {
        this.props.dispatch(dateChanged(null, this.props.times.length));
    }

    onChange = (index, unusedValue, date) => {
        this.props.dispatch(dateChanged(date, index));
    };

    onRemoveTime = (index, unusedValue, unusedValue2) => {
        const date = this.props.times[index];
        this.props.dispatch(removeTime(date));
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
                    <FlatButton label="Remove time"
                                secondary={true}
                                style={{width:"100%"}}
                                onClick={this.onRemoveTime.bind(this, index)}
                    />
                </div>
            )
        });

        return <div style={this.props.style}>
            {times}
            <div style={{height: "20px"}} />
            <RaisedButton label="Add time +" primary={true} onClick={this.onAddTimePress.bind(this)} />
        </div>
    }
}

function mapStateToProps(state) {
    return {times: state.editTaskReducer.times};
}

export default connect(mapStateToProps)(TimesEdit);
