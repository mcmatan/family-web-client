import {LOAD_STATE_FROM_DATABASE} from "./ActionTypes";

export function loadState(state) {
    return {
        type: LOAD_STATE_FROM_DATABASE,
        payload:state,
    }
}
