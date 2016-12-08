import {firebaseApp} from "../firebase/firebase";
import React, {Component} from "react";
import {loadState} from "../actions/DataBaseActions";
const firebaseDb = firebaseApp.database();

class DataBase extends Component {

    isLoggedIn() {
        return localStorage.loggedIn
    }

    setUserLoggedIn(user) {
        localStorage.loggedIn = true;
        this.ref = firebaseDb.ref("users/" + user.uid);
        this.tasksRef = firebaseDb.ref("users/" + user.uid).child("tasks");
        firebaseDb.ref("users/" + user.uid).child("isLoggedIn").set(true);
    }

    setUserLoggedOut() {
        localStorage.loggedIn = false;
        localStorage.clear();
    }

    saveTask(task) {
        this.tasksRef.child(task.uid).set(task);
    }

}

export const dataBaseShared = new DataBase();