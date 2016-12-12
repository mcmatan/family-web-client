import {APPLICATION_UI_STATE_TAB_BAR_INDEX_CHANGED} from "./ActionTypes";
export function dashboardTabBarChanged(index) {
    return {
        type: APPLICATION_UI_STATE_TAB_BAR_INDEX_CHANGED,
        payload: index
    }
}