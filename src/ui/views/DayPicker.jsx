import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import Days from "../../Model/Days";
import {connect} from "react-redux";
import {createTaskServiceShared} from "../../core/Services/CreateTaskService";

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

String.prototype.capitalizeFirstLetter = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

class DayPicker extends Component {

    onChecked = (key, event, checked) => {
        this.props.dispatch(createTaskServiceShared.daySelected(key, checked));
        // this.setState(
        //     {[key]: checked}
        // );
    };

    render() {
        const days = Days.all();
        let self = this;
        let checkBoxes = days.map(function (text) {
            let isSelected = self.props.selectedDays[text];
            return (
                <Checkbox
                    label={text.capitalizeFirstLetter()}
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