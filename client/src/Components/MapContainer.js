import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';
require('dotenv').config();

const mapStyles ={
    width: '100%',
    height: '100%'
};

const MapContainer = (props) => {

    return ( 
        <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={props.center}
        >

        </Map>
     );
}

export default GoogleApiWrapper({apiKey: process.env.GOOGLE_MAPS_API_KEY})(MapContainer);