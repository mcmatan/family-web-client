import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';



class FloatingButton extends Component {

    render() {
        return (
            <div style={{ position: "fixed", bottom: 80 ,left:50, right: 0}}>
                <FloatingActionButton onClick={this.props.onClick}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        )
    }
}

export default FloatingButton;