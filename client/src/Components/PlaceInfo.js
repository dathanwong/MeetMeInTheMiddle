import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const PlaceInfo = (props) => {

    const [photo, setPhoto] = useState(null);
    const {place, index} = props;

    useEffect(() =>{
        const picWidth = 150;
        if(place.photos !== undefined){
            Axios.get('http://localhost:8000/api/map/getPhoto/' + place.photos[0].photo_reference + '/' + picWidth)
            .then(response =>{
                console.log(response.data);
                setPhoto(response.data);
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }, [place])

    return ( 
        <div className="container border border-dark p-2" style={{borderRadius:"10%"}} >
            <div className="row">
                <div className="col">
                    {index+1+"."} {place.name}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Distance from address 1: {place.distance_from_origin1.distance.text}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Distance from address 2: {place.distance_from_origin2.distance.text}
                </div>
                
            </div>
            {
                photo && 
                <div className="row">
                    <div className="col">
                        <img src={photo} alt="location" style={{width:"100%", borderRadius:"10%"}}/>
                    </div>
                </div>
            }
        </div>
     );
}
 
export default PlaceInfo;