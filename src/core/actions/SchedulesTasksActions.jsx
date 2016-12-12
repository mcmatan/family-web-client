import {SCHEDULED_TASKS_UPDATE} from "./ActionTypes";
export function updateScheduledTasks(scheduledTasks) {
    return {
        type: SCHEDULED_TASKS_UPDATE,
        payload: scheduledTasks
    }
}