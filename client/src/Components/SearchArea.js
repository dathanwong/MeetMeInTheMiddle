import React, { useState } from 'react';
import Axios from 'axios';

const SearchArea = (props) => {

    const {setRadius, setCoord1, setCoord2, address1, address2, setAddress1, setAddress2, setMapCenter, setPlaces} = props;

    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        let url = "http://localhost:8000/api/map/getPotentialPlaces/" + stringToParam(address1) + "/" + stringToParam(address2) + "/" + stringToParam(searchTerm);
        Axios.get(url)
            .then(response =>{
                console.log(response);
                setPlaces([...response.data.places]);
                setCoord1(response.data.coord1);
                setCoord2(response.data.coord2);
                setRadius(response.data.radius);
            })
            .catch(err => console.log(err));
    }

    function stringToParam(string){
        return string.replace(/ /g, '+');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input required type="text" placeholder="User1 Address" onChange={ e => setAddress1(e.target.value)} />
                </div>
                <div className="row">
                    <input required type="text" placeholder="User2 Address" onChange={ e => setAddress2(e.target.value)} />
                </div>
                <div className="row">
                    <input required type="text" placeholder="Search Term" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="row">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
        </div> 
     );
}
 
export default SearchArea;