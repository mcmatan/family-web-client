import {Component} from 'react';
import Moment from "moment";
import {endEditing, cancelEditingTask, startEditingTask} from "../actions/EditTasksActions";
import Days from "../../model/Days";
import {dataBaseShared} from "./DataBase";

class EditTaskService extends Component {

    startEditingScheduledTask(scheduledTask) {
        return dispatch => {
            const uid = scheduledTask.uid;
            const task = dataBaseShared.getTaskForId(uid);
            dispatch(startEditingTask(task));
        };
    }

    removeTask(task) {
        return dispatch => {
            dataBaseShared.removeTask(task);
            dispatch(cancelEditingTask());
        };
    }

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