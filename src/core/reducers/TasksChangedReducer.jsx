import {TASK_CHANGES_TASKS_UPDATED} from "../actions/ActionTypes";
const TasksChangedReducer = (state = [], action) => {
  switch (action.type) {
      case TASK_CHANGES_TASKS_UPDATED:
          return Object.assign({}, state, {
              allTasks: action.payload
          });
      default:
          return state;
  }
};

export default TasksChangedReducer;