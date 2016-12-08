import TaskType from "../../Model/TaskType";
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
import Days from "../../Model/Days";
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

        const repeatOnDates = this.repeateOnDays(createTaskReducer);
        task.repeateOnDates = repeatOnDates;

        dataBaseShared.saveTask(task);

        return dispatch => {
            dispatch(taskCreationHasFinished());
        }
    }

    repeateOnDays(createTaskReducer) {
        const timesFilterdWithNoNull = createTaskReducer.dates.filter(function (n) {
            return n != undefined
        });
        const timesStrings = timesFilterdWithNoNull.map(function (dateString) {
            const date = new Date(dateString);
            return Moment(date).format('HH:mm');
        });

        let repeatOnDates = {};
        if (createTaskReducer[Days.sunday]) {
            repeatOnDates[Days.sunday] = timesStrings;
        }

        if (createTaskReducer[Days.monday]) {
            repeatOnDates[Days.monday] = timesStrings;
        }

        if (createTaskReducer[Days.tuesday]) {
            repeatOnDates[Days.tuesday] = timesStrings;
        }

        if (createTaskReducer[Days.wednesday]) {
            repeatOnDates[Days.wednesday] = timesStrings;
        }

        if (createTaskReducer[Days.thursday]) {
            repeatOnDates[Days.thursday] = timesStrings;
        }

        if (createTaskReducer[Days.friday]) {
            repeatOnDates[Days.friday] = timesStrings;
        }

        if (createTaskReducer[Days.saturday]) {
            repeatOnDates[Days.saturday] = timesStrings;
        }
        return repeatOnDates
    }
}

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};


export const createTaskServiceShared = new CreateTaskService();