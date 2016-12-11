import {EDIT_TASK_START_EDITING, EDIT_TASK_CANCEL_EDITING, EDIT_TASK_REMOVE_DAY, EDIT_TASK_ADD_DAY, EDIT_TASK_ADD_TIME,
    EDIT_TASK_REMOVE_TIME
    , EDIT_TASK_DATE_CHANGED_AT_INDEX
    , EDIT_TASK_END_EDITING
} from "../actions/ActionTypes";
const EditTaskReducer = (state = {editingTask: false}, action) => {
    switch (action.type) {
        case EDIT_TASK_START_EDITING:
            return Object.assign({}, state, {
                editingTask: true,
                taskTypeDisplay: action.payload.taskType.display,
                times: action.payload.times,
                days: action.payload.days,
                taskBeforeUpdate: action.payload,
            });
        case EDIT_TASK_CANCEL_EDITING:
            return Object.assign({}, state, {
                editingTask: false,
                times: {},
                days: {},
            });
        case EDIT_TASK_END_EDITING:
            return Object.assign({}, state, {
                editingTask: false,
                taskTypeDisplay: {},
                times: {},
                days: {},
                taskBeforeUpdate: {}
            });
        case EDIT_TASK_REMOVE_DAY:
            const daysAfter = state.days.filter(function (day) {
                return (day !== action.payload);
            });
            return Object.assign({}, state, {
                days: daysAfter
            });
        case EDIT_TASK_ADD_DAY:
            const after = [...state.days, action.payload];
            return Object.assign({}, state, {
                days: after
            });
        case EDIT_TASK_REMOVE_TIME:
            const timesAfterFilter = state.times.filter(function (time) {
               return (time !== action.payload);
            });
            return Object.assign({}, state, {
                times: timesAfterFilter
            });
        case EDIT_TASK_ADD_TIME:
            return Object.assign({}, state, {
                times: [...state.times, action.payload]
            });
        case EDIT_TASK_DATE_CHANGED_AT_INDEX:
            const index = action.index;
            const oldDates = state.times;
            const value = action.payload;
            let datesAfter = [];

            if (oldDates && oldDates.length > index) {
                datesAfter = oldDates.slice(0, index).concat([value]).concat(oldDates.slice(index + 1))
            } else if (state.times) {
                datesAfter = state.times.concat([action.payload]);
            } else {
                datesAfter = [action.payload]
            }
            return Object.assign({}, state, {
                times: datesAfter
            });
        default:
            return state;
    }
};

export default EditTaskReducer;