import {EDIT_TASK_START_EDITING, EDIT_TASK_END_EDITING} from "../actions/ActionTypes";
const EditTaskReducer = (state = [], action) => {
    switch (action.type) {
        case EDIT_TASK_START_EDITING:
            return Object.assign({}, state, {
                editingTask: true,
                task: action.payload
            });
        case EDIT_TASK_END_EDITING:
            return Object.assign({}, state, {
                editingTask: false,
                task: {}
            });
        default:
            return state;
    }
};

export default EditTaskReducer;