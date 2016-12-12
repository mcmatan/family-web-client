import {APPLICATION_UI_STATE_TAB_BAR_INDEX_CHANGED} from "../actions/ActionTypes";

const initialState = {dashboardTabBarIndex: 0};
const ApplicationUIStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case APPLICATION_UI_STATE_TAB_BAR_INDEX_CHANGED:
            return Object.assign({}, state, {
                dashboardTabBarIndex: action.payload
            });
        default:
            return state;
    }
};

export default ApplicationUIStateReducer;