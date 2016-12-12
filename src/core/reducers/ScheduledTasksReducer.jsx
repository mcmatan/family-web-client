import {SCHEDULED_TASKS_UPDATE} from "../actions/ActionTypes";
const initialState = {allScheduledTasks: []};

const ScheduledTasksReducer = (state = initialState, action) => {
  switch (action.type) {
      case SCHEDULED_TASKS_UPDATE:
          return Object.assign({}, state, {
              allScheduledTasks: action.payload
          });
      default:
          return state;
  }
};

export default ScheduledTasksReducer;