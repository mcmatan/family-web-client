import {EDIT_TASK_START_EDITING, EDIT_TASK_END_EDITING} from "./ActionTypes";
export function startEditingTask(task) {
    return {
        type: EDIT_TASK_START_EDITING,
        payload: task
    }
}

export function endEditingTask() {
    return {
        type: EDIT_TASK_END_EDITING
    }
}