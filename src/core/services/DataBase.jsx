import {firebaseApp} from "../firebase/firebase";
import {Component} from "react";
import {tasksUpdated} from "../actions/TasksChangedActions";
import Task from "../../model/Task";
import ScheduledTask from "../../model/ScheduledTask";
import moment from "moment";
import {updateScheduledTasks} from "../actions/SchedulesTasksActions";

const firebaseDb = firebaseApp.database();

class DataBase extends Component {
    store = {};
    ref = {};
    tasksRef = {};

    constructor() {
        super();
        this.setUserLoggedIn = this.setUserLoggedIn.bind(this);
        this.listenToTasksChanges = this.listenToTasksChanges.bind(this);
    }

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

    removeTask(task) {
        this.tasksRef.child(task.uid).remove();
    }

    getTaskForId(uid) {

        const tasks = this.store.getState().tasksChangedReducer.tasks;

        const taskWithSameUid = tasks.filter(function (task) {
            return (task.uid === uid);
        });

        return taskWithSameUid[0];
    }

    listenToTasksChanges() {
        const self = this;
        this.tasksRef.on('value', function (snapshot) {
            const dic = snapshot.val();

            if (dic) {
                const keys = Object.keys(dic);
                const tasks = keys.map(function (v) {
                    return new Task(dic[v]);
                });
                self.store.dispatch(tasksUpdated(tasks));
                self.setNextScheduledTasks(tasks)
            } else {
                self.store.dispatch(tasksUpdated([]));
                console.log("No tasks in data base")
            }
        });
    }

    setNextScheduledTasks(tasks) {
        const todayDayString = moment().format('dddd').toLowerCase();

        let allSchedulesTasks = [];

        for (const taskIndex in tasks) {
            const task = tasks[taskIndex];
            if (task.days.indexOf(todayDayString) >= 0) { // This is taking in mind there are only repetitive tasks.
                const times = task.times;

                const schedulesTasks = times.map(function (time) {
                    return new ScheduledTask(task, time);
                });

                allSchedulesTasks = allSchedulesTasks.concat(schedulesTasks);
            }
        }
        allSchedulesTasks.sort(function (a, b) {
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(b.date) - new Date(a.date);
        });

        allSchedulesTasks.reverse();
        this.store.dispatch(updateScheduledTasks(allSchedulesTasks));
    }

}

export const dataBaseShared = new DataBase();