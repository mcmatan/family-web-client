import {firebaseApp} from "../firebase/firebase";
import React, {Component} from "react";
import {tasksUpdated} from "../actions/TasksChangedActions";
const firebaseDb = firebaseApp.database();

class DataBase extends Component {
    store = {};
    ref = {};
    tasksRef = {};

    setStore(store) {
        this.store = store;
    }

    isLoggedIn() {
        return localStorage.loggedIn
    }

    setUserLoggedIn(user) {
        localStorage.loggedIn = true;
        this.ref = firebaseDb.ref("users/" + user.uid);
        this.tasksRef = firebaseDb.ref("users/" + user.uid).child("tasks");
        firebaseDb.ref("users/" + user.uid).child("isLoggedIn").set(true);
        this.listenToTasksChanges()
    }

    setUserLoggedOut() {
        localStorage.loggedIn = false;
        localStorage.clear();
    }

    saveTask(task) {
        this.tasksRef.child(task.uid).set(task);
    }

    listenToTasksChanges() {
        const self = this;
        this.tasksRef.on('value', function(snapshot) {
            self.store.dispatch(tasksUpdated(snapshot.val()));
        });
    }

}

export const dataBaseShared = new DataBase();