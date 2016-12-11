import {EDIT_TASK_START_EDITING, EDIT_TASK_END_EDITING, EDIT_TASK_REMOVE_DAY, EDIT_TASK_ADD_DAY} from "./ActionTypes";
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

export function addDay(day) {
    return {
        type: EDIT_TASK_ADD_DAY,
        payload: day
    }
}

export function removeDay(day) {
    return {
        type: EDIT_TASK_REMOVE_DAY,
        payload: day
    }
}

