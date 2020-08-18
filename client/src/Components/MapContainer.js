import React from 'react';
import {Map, GoogleApiWrapper, Marker, Circle} from 'google-maps-react';

const mapStyles ={
    width: '80%',
    height: '80%'
};

const MapContainer = (props) => {

    const {coord1, coord2, radius, places} = props;

    return ( 
        <Map
            google={props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={props.mapCenter}
        >
            {
                coord1 !== null &&
                    <Marker
                        key={-1}
                        title={"Address1"}
                        position={coord1} 
                    />
            }
            {
                coord2 !== null &&
                <Marker
                    key={-2}
                    title={"Address2"}
                    position={coord2} 
                />
            }
            {
                radius !== null && coord1 !== null &&
                <Circle
                    radius={radius}
                    center={coord1}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#FF0000'
                    fillOpacity={0.2}
                />
            }
            {
                radius !== null && coord2 !== null &&
                <Circle
                    radius={radius}
                    center={coord2}
                    strokeColor='transparent'
                    strokeOpacity={0}
                    strokeWeight={5}
                    fillColor='#00FF00'
                    fillOpacity={0.2}
                />
            }
            {
                places.map((place, index) =>
                    <Marker
                        key={index}
                        title={place.name}
                        position={place.geometry.location} 
                        icon={{
                            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        }}
                    />
                )
            }
        </Map>
     );
}

export default GoogleApiWrapper({apiKey: process.env.GOOGLE_MAPS_API_KEY})(MapContainer);