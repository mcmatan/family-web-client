import React, {Component} from 'react';

class Card extends Component {

    render() {
        return (
            <div className="CardComponent">
                {this.props.children}
            </div>
        );
    }


}

export default Card;