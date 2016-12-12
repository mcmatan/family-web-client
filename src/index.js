import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import "./index.css";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {reducer as formReducer} from "redux-form";
import AuthReducer from "./core/reducers/AuthReducer.jsx";
import EditTaskReducer from "./core/reducers/EditTaskReducer";
import CreateTaskReducer from "./core/reducers/CreateTaskReducer.jsx";
import ScheduledTasksReducer from "./core/reducers/ScheduledTasksReducer";
import ApplicationUIStateReducer from "./core/reducers/ApplicationUIStateReducer";
import routes from "./core/routes.jsx";
import {Router, browserHistory} from "react-router";
import thunk from "redux-thunk";
import DataBaseReducer from "./core/reducers/DataBaseReducer.jsx";
import  TasksChangedReducer  from "./core/reducers/TasksChangedReducer";
import {dataBaseShared} from "./core/services/DataBase.jsx";

const reducers = {
    authReducer: AuthReducer,
    createTaskReducer: CreateTaskReducer,
    dataBaseReducer: DataBaseReducer,
    tasksChangedReducer: TasksChangedReducer,
    editTaskReducer: EditTaskReducer,
    scheduledTasksReducer: ScheduledTasksReducer,
    applicationUIStateReducer: ApplicationUIStateReducer,
    form: formReducer
};
const reducer = combineReducers(reducers);

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    reducer,
    persistedState,
    applyMiddleware(thunk)
);

store.subscribe(()=>{
    console.log(store.getState());
});

dataBaseShared.setStore(store);

render(
    <Provider store={store}>
        <div>
            <Router history={browserHistory} routes={routes}/>
        </div>
    </Provider>,
    document.getElementById('root')
);
