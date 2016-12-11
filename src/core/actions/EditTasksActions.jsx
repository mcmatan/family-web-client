import {EDIT_TASK_START_EDITING, EDIT_TASK_CANCEL_EDITING, EDIT_TASK_REMOVE_DAY, EDIT_TASK_ADD_DAY,
    EDIT_TASK_REMOVE_TIME
    , EDIT_TASK_DATE_CHANGED_AT_INDEX
    , EDIT_TASK_END_EDITING
} from "./ActionTypes";
export function startEditingTask(task) {
    return {
        type: EDIT_TASK_START_EDITING,
        payload: task
    }
}

export function cancelEditingTask() {
    return {
        type: EDIT_TASK_CANCEL_EDITING
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

export function dateChanged(date , index) {
    return {
        type: EDIT_TASK_DATE_CHANGED_AT_INDEX,
        payload: date,
        index: index
    }
}

export function removeTime(date) {
    return {
        type: EDIT_TASK_REMOVE_TIME,
        payload: date
    }
}

export function endEditing() {
    return {
        type: EDIT_TASK_END_EDITING
    }
}
