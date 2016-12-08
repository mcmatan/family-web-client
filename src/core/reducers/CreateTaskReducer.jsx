import {
    CREATE_TASK_PICKED_TYPE,
    CREATE_TASK_SELECTED_DAY,
    CREATE_TASK_UN_SELECTED_DAY,
    CREATE_TASK_STEP
    , CREATE_TASK_DATE_CHANGED_AT_INDEX
    , CREATE_TASK_FINISHED
} from "../actions/ActionTypes.jsx";


const initialState = {
    stepIndex: 0,
    dates: []
};


const CreateTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK_PICKED_TYPE:
            return Object.assign({}, state, {
                selectedTaskType: action.payload
            });
        case CREATE_TASK_SELECTED_DAY:
            return Object.assign({}, state, {
                [action.payload]: true
            });
        case CREATE_TASK_UN_SELECTED_DAY:
            return Object.assign({}, state, {
                [action.payload]: false
            });
        case CREATE_TASK_STEP:
            return Object.assign({}, state, {
                stepIndex: action.payload
            });
        case CREATE_TASK_FINISHED:
            return initialState;
        case CREATE_TASK_DATE_CHANGED_AT_INDEX:

            const index = action.index;
            const oldDates = state.dates;
            const value = action.payload;
            let datesAfter = [];

            if (oldDates && oldDates.length > index) {
                datesAfter = oldDates.slice(0, index).concat([value]).concat(oldDates.slice(index + 1))
            } else if (state.dates) {
                datesAfter = state.dates.concat([action.payload]);
            } else {
                datesAfter = [action.payload]
            }

            return Object.assign({}, state, {
                dates: datesAfter
            });

        default:
            return state;
    }
};

export default CreateTaskReducer;