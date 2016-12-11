import {firebaseApp} from "../firebase/firebase";
import {Component} from "react";
import {tasksUpdated} from "../actions/TasksChangedActions";
import Task from "../../model/Task";

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
            const dic = snapshot.val();

            if (dic) {
                const keys = Object.keys(dic);
                const values = keys.map(function(v) { return new Task(dic[v]); });
                self.store.dispatch(tasksUpdated(values));
            } else {
                console.log("No tasks in data base")
            }
        });
    }

}

export const dataBaseShared = new DataBase();