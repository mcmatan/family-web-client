import React, {Component} from 'react';
import Checkbox from 'material-ui/Checkbox';
import Days from "../../model/Days";
import {connect} from "react-redux";
import {addDay, removeDay} from "../../core/actions/EditTasksActions";

const styles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    },
};

class DaysEdit extends Component {

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    onChecked = (key, event, checked) => {
        if (checked) {
            this.props.dispatch(addDay(key, checked));
        } else {
            this.props.dispatch(removeDay(key, checked));
        }
    };

    render() {
        const days = Days.all();
        let self = this;
        let checkBoxes = days.map(function (text) {
            let isSelected = (self.props.selectedDays.indexOf(text) >= 0);
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
    return {selectedDays: state.editTaskReducer.days};
}

export default  connect(mapStateToProps)(DaysEdit)