import React from 'react';
import MapContainer from '../Components/MapContainer';
import SearchArea from '../Components/SearchArea';

const Main = (props) => {
    return ( 
        <div className="container">
            <div className="row">
                <SearchArea/>
            </div>
            <div className="row">
                <MapContainer></MapContainer>
            </div>
        </div>
     );
}
 
export default Main;