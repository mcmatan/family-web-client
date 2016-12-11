import {Component} from 'react';
import {dataBaseShared} from "./DataBase";
import Moment from "moment";
import {endEditing} from "../actions/EditTasksActions";
import Days from "../../model/Days";

class EditTaskService extends Component {
    updateTask(editTaskReducer) {
        return dispatch => {
            let taskBeforeUpdate = editTaskReducer.taskBeforeUpdate;
            const timesStrings = editTaskReducer.times.map(function (dateString) {
                const date = new Date(dateString);
                return Moment(date).format('HH:mm');
            });

            const serverTaskModel = {};
            serverTaskModel.repeateOnDates = this.repeatOnDays(editTaskReducer.days, timesStrings);
            serverTaskModel.kTaskType = taskBeforeUpdate.taskType.key;
            serverTaskModel.uid = taskBeforeUpdate.uid;
            dataBaseShared.saveTask(serverTaskModel);
            dispatch(endEditing());
        }
    }

    repeatOnDays(days, timesStrings) {

        const timesFilterdWithNoNull = timesStrings.filter(function (n) {
            return n !== undefined
        });

        let repeatOnDays = {};

        if (days.indexOf(Days.sunday) >= 0) {
            repeatOnDays[Days.sunday] = timesStrings;
        }

        if (days.indexOf(Days.monday) >= 0) {
            repeatOnDays[Days.monday] = timesStrings;
        }

        if (days.indexOf(Days.tuesday) >= 0) {
            repeatOnDays[Days.tuesday] = timesStrings;
        }

        if (days.indexOf(Days.wednesday) >= 0) {
            repeatOnDays[Days.wednesday] = timesStrings;
        }

        if (days.indexOf(Days.thursday) >= 0) {
            repeatOnDays[Days.thursday] = timesStrings;
        }

        if (days.indexOf(Days.friday) >= 0) {
            repeatOnDays[Days.friday] = timesStrings;
        }

        if (days.indexOf(Days.saturday) >= 0) {
            repeatOnDays[Days.saturday] = timesStrings;
        }
        return repeatOnDays
    }
}

export const editTaskServiceShared = new EditTaskService();