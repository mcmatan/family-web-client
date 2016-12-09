import React, {Component} from 'react';
import DayPicker from '../views/DayPicker';
import TimePicker from '../views/TimesPicker';

class EditTask extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <DayPicker style={{width: "30%", display: "inline-block"}} />
                <TimePicker style={{width: "30%", display: "inline-block"}} />
            </div>
        )
    }
}

export default EditTask;