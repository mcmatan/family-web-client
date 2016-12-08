import React, {Component} from "react";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import ActionHome from "material-ui/svg-icons/action/home";
import Settings from "material-ui/svg-icons/action/settings";

const dashboardIcon = <ActionHome />;
const settingsIcon = <Settings />;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomTabBar extends Component {
    state = {
        selectedIndex: 0,
    };

    select = (index) => this.setState({selectedIndex: index});

    render() {
        return (
            <Paper zDepth={1} style={{ position: "fixed", bottom: 0 ,left:0, right: 0}}>
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                    <BottomNavigationItem
                        label="Dashboard"
                        icon={dashboardIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Settigs"
                        icon={settingsIcon}
                        onTouchTap={() => this.select(1)}
                    />
                    <BottomNavigationItem
                        label="Location"
                        icon={nearbyIcon}
                        onTouchTap={() => this.select(2)}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default BottomTabBar;
