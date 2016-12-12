import React, {Component} from "react";
import {BottomNavigation, BottomNavigationItem} from "material-ui/BottomNavigation";
import Paper from "material-ui/Paper";
import IconLocationOn from "material-ui/svg-icons/communication/location-on";
import Accessibility from "material-ui/svg-icons/action/accessibility";
import ViewWeek from "material-ui/svg-icons/action/view-week";
import {connect} from "react-redux";
import {dashboardTabBarChanged} from "../../core/actions/ApplicationUIStateActions";

const dashboardIcon = <Accessibility  />;
const settingsIcon = <ViewWeek />;
const nearbyIcon = <IconLocationOn />;

/**
 * A simple example of `BottomNavigation`, with three labels and icons
 * provided. The selected `BottomNavigationItem` is determined by application
 * state (for instance, by the URL).
 */
class BottomTabBar extends Component {

    select = (index) =>  {
        this.props.dispatch(dashboardTabBarChanged(index));
    };

    render() {
        return (
            <Paper zDepth={1} style={{ position: "fixed", bottom: 0 ,left:0, right: 0}}>
                <BottomNavigation selectedIndex={this.props.selectedIndex}>
                    <BottomNavigationItem
                        label="Tasks"
                        icon={dashboardIcon}
                        onTouchTap={() => this.select(0)}
                    />
                    <BottomNavigationItem
                        label="Scheduled for today"
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

function mapStateToProps(state) {
    return {selectedIndex: state.applicationUIStateReducer.dashboardTabBarIndex};
};

export default connect(mapStateToProps)(BottomTabBar);