import React, {useState} from 'react';
import MapContainer from '../Components/MapContainer';
import SearchArea from '../Components/SearchArea';
import PlaceInfo from '../Components/PlaceInfo';

const Main = (props) => {

    const [mapCenter, setMapCenter] = useState({lat: 34.05349 , lng: -118.24532});
    const [address1, setAddress1] = useState("12222 wilshire blvd los angeles");
    const [address2, setAddress2] = useState("1921 s union st anaheim");
    const [places, setPlaces] = useState([]);
    const [coord1, setCoord1] = useState(null);
    const [coord2, setCoord2] = useState(null);
    const [radius, setRadius] = useState(null);

    return ( 
        <div className="container">
            <div className="row">
                <div className="col-8">
                    <div className="row">
                        <SearchArea setCoord1={setCoord1} setCoord2={setCoord2} setRadius={setRadius} setPlaces={setPlaces} address1={address1} address2={address2} setAddress1={setAddress1} setAddress2={setAddress2} setMapCenter={setMapCenter} />
                    </div>
                    <div className="row">
                        <MapContainer mapCenter={mapCenter} places={places} coord1={coord1} coord2={coord2} radius={radius} />
                    </div>
                        
                    
                </div>
                <div className="col-3">
                    <div className="container">
                        {
                            places.map((place, index) =>
                                <div className="row">
                                    <PlaceInfo place={place} key={index} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            
        </div>
     );
}
 
export default Main;