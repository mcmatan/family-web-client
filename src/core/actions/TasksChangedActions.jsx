import {TASK_CHANGES_TASKS_UPDATED} from "./ActionTypes";
export function tasksUpdated(tasks) {
       return {
            type: TASK_CHANGES_TASKS_UPDATED,
            payload: tasks
       }
}