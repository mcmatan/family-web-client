import TaskType from "../../model/TaskType";
import {
    pickedType,
    selectedDay,
    unSelectedDay,
    createTaskStep,
    dateChanged,
    taskCreationHasFinished
} from "../actions/CreateTaskActions";
import {dataBaseShared} from "./DataBase";
import Moment from "moment";
import Days from "../../model/Days";
class CreateTaskService {

    selectedTaskType(index) {
        return dispatch => {
            const taskType = TaskType.all()[index];
            dispatch(pickedType(taskType))
        }
    }

    daySelected(day, isSelected) {
        return dispatch => {
            if (isSelected) {
                dispatch(selectedDay(day));
            } else {
                dispatch(unSelectedDay(day));
            }
        }
    }

    setTaskStep(index, isFinished) {
        return dispatch => {
            dispatch(createTaskStep(index));
        }
    }

    dateChangedAIndex(date, index) {
        return dispatch => {
            dispatch(dateChanged(date, index));
        }
    }

    taskCreationHasFinished(createTaskReducer) {

        const uid = generateUUID();
        let task = {};

        task.kTaskType = createTaskReducer.selectedTaskType.key;
        task.uid = uid;
        task.task.taskTypeDisplay = uid;

        const repeatOnDays = this.repeateOnDays(createTaskReducer);
        task.repeateOnDates = repeatOnDays;

        dataBaseShared.saveTask(task);

        return dispatch => {
            dispatch(taskCreationHasFinished());
        }
    }

    repeateOnDays(createTaskReducer) {
        const timesFilterdWithNoNull = createTaskReducer.dates.filter(function (n) {
            return n !== undefined
        });
        const timesStrings = timesFilterdWithNoNull.map(function (dateString) {
            const date = new Date(dateString);
            return Moment(date).format('HH:mm');
        });

        let repeatOnDays = {};
        if (createTaskReducer[Days.sunday]) {
            repeatOnDays[Days.sunday] = timesStrings;
        }

        if (createTaskReducer[Days.monday]) {
            repeatOnDays[Days.monday] = timesStrings;
        }

        if (createTaskReducer[Days.tuesday]) {
            repeatOnDays[Days.tuesday] = timesStrings;
        }

        if (createTaskReducer[Days.wednesday]) {
            repeatOnDays[Days.wednesday] = timesStrings;
        }

        if (createTaskReducer[Days.thursday]) {
            repeatOnDays[Days.thursday] = timesStrings;
        }

        if (createTaskReducer[Days.friday]) {
            repeatOnDays[Days.friday] = timesStrings;
        }

        if (createTaskReducer[Days.saturday]) {
            repeatOnDays[Days.saturday] = timesStrings;
        }
        return repeatOnDays
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};


export const createTaskServiceShared = new CreateTaskService();