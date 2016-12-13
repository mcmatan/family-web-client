

import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import GoogleMap from 'google-map-react';
import MyGreatPlace from './my_great_place.jsx';

const API_KEY = "AIzaSyBFC8qD5O4t0bBHredcy1yTxJnx12VkfB8";

export default class MapContainer extends Component {
    static propTypes = {
        center: PropTypes.array,
        zoom: PropTypes.number,
        greatPlaceCoords: PropTypes.any
    };

    static defaultProps = {
        center: [52.508030, 13.45989],
        zoom: 12,
        greatPlaceCoords: {lat: 52.508030, lng: 13.45989}
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  style={{padding: "-8px", height: "750px"}}>
                <GoogleMap className="GoogleMap"
                           bootstrapURLKeys={{
                               key: API_KEY,
                               language: 'en'
                           }}
                           center={this.props.center}
                           zoom={this.props.zoom}>
                    <MyGreatPlace lat={52.508030} lng={13.45989} text={'A'} /* Kreyser Avrora */ />
                    <MyGreatPlace {...this.props.greatPlaceCoords} text={'Patient'} /* road circle */ />
                </GoogleMap>
            </div>
        );
    }
}