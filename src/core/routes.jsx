import React from "react";
import {Route} from "react-router";
import App from "../ui/components/App.jsx";
import LoginComponent from "../ui/components/LogInComponent.jsx";
import Dashboard from "../ui/components/Dashboard.jsx";
import AddTask from "../ui/components/AddTask.jsx";
import {authServiceShared} from "./services/AuthService.jsx";


const confirmAuth = (nextState, replace) => {
    if (!authServiceShared.isLoggedIn()) {
        replace({ pathname: '/', state: { nextPathname: nextState.location.pathname } });
    }
};

const checkIfBase = (nextState, replace) => {
    if (authServiceShared.isLoggedIn() && nextState.routes.length === 1) {
        replace({ pathname: '/dashboard', state: { nextPathname: nextState.location.pathname } });
    }
};

export default (
    <Route path="/" component={App} onEnter={checkIfBase} >
        <Route path="login" component={LoginComponent}/>
        <Route path="dashboard" component={Dashboard} onEnter={confirmAuth} />
        <Route path="addTask" component={AddTask} />
    </Route>
);
