import React, {Component} from "react";

class Button extends Component {
    render() {
        return (
            <button>
                {this.props.title}
            </button>
        )
    }
}

export default Button;