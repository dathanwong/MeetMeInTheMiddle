import React, {useState} from 'react';
import MapContainer from '../Components/MapContainer';
import SearchArea from '../Components/SearchArea';

const Main = (props) => {

    const [mapCenter, setMapCenter] = useState({lat: 34.05349 , lng: -118.24532});
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [places, setPlaces] = useState([]);
    const [coord1, setCoord1] = useState(null);
    const [coord2, setCoord2] = useState(null);
    const [radius, setRadius] = useState(null);

    return ( 
        <div className="container">
            <div className="row">
                <SearchArea setCoord1={setCoord1} setCoord2={setCoord2} setRadius={setRadius} setPlaces={setPlaces} address1={address1} address2={address2} setAddress1={setAddress1} setAddress2={setAddress2} setMapCenter={setMapCenter} />
            </div>
            <div className="row">
                <MapContainer className="col-6" mapCenter={mapCenter} places={places} coord1={coord1} coord2={coord2} radius={radius} />
            </div>
        </div>
     );
}
 
export default Main;