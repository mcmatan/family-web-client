import {SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_IN_SUBMIT, LOGOUT} from "./ActionTypes.jsx";
import {browserHistory} from "react-router";

export function loginSubmit() {
    return {
        type: SIGN_IN_SUBMIT
    };
}

export function signInError(error) {
    const path = '/login';
    browserHistory.push(path);
    return {
        type: SIGN_IN_ERROR,
        payload: error.message
    };
}


export function signInSuccess(user) {
    return {
        type: SIGN_IN_SUCCESS,
        payload: user
    };
}

export function logout() {
    return {
        type: LOGOUT
    }
}

export function signInSuccessAndRoute(user) {
    const path = '/dashboard';
    browserHistory.push(path);
    return signInSuccess(user);
}





