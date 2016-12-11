import {EDIT_TASK_START_EDITING, EDIT_TASK_END_EDITING, EDIT_TASK_REMOVE_DAY, EDIT_TASK_ADD_DAY} from "../actions/ActionTypes";
const EditTaskReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_TASK_START_EDITING:
            debugger;
            return Object.assign({}, state, {
                editingTask: true,
                times: action.payload.times,
                days: action.payload.days,
            });
        case EDIT_TASK_END_EDITING:
            return Object.assign({}, state, {
                editingTask: false,
                times: {},
                days: {},
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
        default:
            return state;
    }
};

export default EditTaskReducer;