import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TimePicker from 'material-ui/TimePicker';
import {createTaskServiceShared} from '../../core/Services/CreateTaskService';
import {connect} from "react-redux";

const style = {
    margin: 12,
};


class TimesPicker extends Component {

    onAddTimePress() {
        this.props.dispatch(createTaskServiceShared.dateChangedAIndex(null, this.props.dates.length));
    }

    onChange = (index, unusedValue, date) => {
        this.props.dispatch(createTaskServiceShared.dateChangedAIndex(date, index));
    };

    render() {
        const times = this.props.dates.map((value, index) => {
            const date = new Date(value);
            return <TimePicker
                hintText="Enter time"
                onChange={this.onChange.bind(this, index)}
                key={index}
                value={date}
            />
        });

        return <div style={this.props.style}>
            {times}
            <RaisedButton label="Add time +" primary={true} style={style} onClick={this.onAddTimePress.bind(this)}/>
        </div>
    }
}

function mapStateToProps(state) {
    return {dates: state.createTaskReducer.dates};
}

export default connect(mapStateToProps)(TimesPicker);
