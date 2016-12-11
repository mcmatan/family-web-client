import React, {Component} from "react";
import "../../App.css";
import {browserHistory} from "react-router";
import {connect} from "react-redux";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";
import NavigationBar from "../views/NavigationBar.jsx";
import {authServiceShared} from "../../core/Services/AuthService.jsx";
injectTapEventPlugin();


class App extends Component {

    componentWillMount() {
        this.props.dispatch(authServiceShared.startAuthListener());
    }

    handleLoginPress = () => {
        const path = '/login';
        browserHistory.push(path);
    };

    handleLogoutPress = () => {
        this.props.dispatch(authServiceShared.logout());
    };

    handleTitleTouch = () => {
        const path = '/dashboard';
        browserHistory.push(path);
    };


    render() {
        const muiTheme = getMuiTheme({
            palette: {
                primary1Color: "#6d9de0",
            },
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    {this.props.loggedIn ? (
                        <NavigationBar onTitleTouchTap={this.handleTitleTouch} iconElementRight="Logout"
                                       onClick={this.handleLogoutPress}/>
                    ) : (
                        <NavigationBar onTitleTouchTap={this.handleTitleTouch} onClick={this.handleLoginPress}/>
                    )}
                    {this.props.children || <p>You are {!this.props.loggedIn && 'not'} logged in.</p>}
                </div>
            </MuiThemeProvider>
        )
    }
};

function mapStateToProps(state) {
    return {loggedIn: state.authReducer.isLoggedIn};
}

export default connect(mapStateToProps)(App)

