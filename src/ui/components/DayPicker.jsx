import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import Days from "../../model/Days";
import {connect} from "react-redux";
import {createTaskServiceShared} from "../../core/services/CreateTaskService";

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class DayPicker extends Component {

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    onChecked = (key, event, checked) => {
        this.props.dispatch(createTaskServiceShared.daySelected(key, checked));
    };

    render() {
        const days = Days.all();
        let self = this;
        let checkBoxes = days.map(function (text) {
            let isSelected = self.props.selectedDays[text];
            return (
                <Checkbox
                    label={self.capitalizeFirstLetter(text)}
                    style={styles.checkbox}
                    key={text}
                    checked={isSelected}
                    onCheck={self.onChecked.bind(this, text)}
                />)
        });

        return (
            <div style={this.props.style}>
                {checkBoxes}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {selectedDays: state.createTaskReducer};
}

export default connect(mapStateToProps)(DayPicker);