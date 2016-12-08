import {firebaseApp} from '../firebase/firebase';
import {signInSuccess, signInError, loginSubmit, signInSuccessAndRoute, logout} from "../actions/AuthActions";
import {dataBaseShared} from "./DataBase";
const firebaseAuth = firebaseApp.auth();
import {reset} from 'redux-form';


class AuthService {

    isLoggedIn() {
        return dataBaseShared.isLoggedIn()
    }

    startAuthListener() {
        return dispatch => {
            firebaseAuth.onAuthStateChanged(function (user) {
                if (user) {
                    dataBaseShared.setUserLoggedIn(user);
                    dispatch(signInSuccess(user))
                } else {
                    dataBaseShared.setUserLoggedOut();
                    dispatch(signInError({message: ""}))
                }
            })
        };
    }

    login(values) {
        const email = values.username;
        const password = values.password;
        return dispatch => {
            dispatch(loginSubmit());
            firebaseAuth.signInWithEmailAndPassword(email, password).then(function (user) {
                dataBaseShared.setUserLoggedIn(user);
                dispatch(signInSuccessAndRoute(user));
            }).catch(function (error) {
                dataBaseShared.setUserLoggedOut();
                dispatch(signInError(error));
            });
        };
    }


    logout() {
        return dispatch => {
            firebaseAuth.signOut().then(function () {
                dataBaseShared.setUserLoggedOut();
                dispatch(logout());
            }, function (error) {
                console.log(`Error on logout = ${error}`);
            });
        };
    }
}

export const authServiceShared = new AuthService();