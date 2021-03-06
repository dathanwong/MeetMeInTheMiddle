import React from 'react';
import {Map, GoogleApiWrapper, Marker, Circle} from 'google-maps-react';

const mapStyles ={
    width: '100%',
    height: '600px'
};

const MapContainer = (props) => {

    const {coord1, coord2, radius, places, mapCenter} = props;
    return ( 
        <Map
            google={props.google}
            zoom={10}
            style={mapStyles}
            initialCenter={mapCenter}
            center={mapCenter}
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
                {   
                    return <Marker
                        key={index}
                        title={place.name}
                        position={place.geometry.location} 
                        icon={{
                            url: '/images/number_'+(+index+1)+'.png'
                        }}
                    />
                }
                )
            }
        </Map>
     );
}

export default GoogleApiWrapper({apiKey: process.env.GOOGLE_MAPS_API_KEY})(MapContainer);