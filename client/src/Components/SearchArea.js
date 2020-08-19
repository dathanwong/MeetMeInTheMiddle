import React, { useState } from 'react';
import Axios from 'axios';

const SearchArea = (props) => {

    const {setRadius, setCoord1, setCoord2, address1, address2, setAddress1, setAddress2, setMapCenter, setPlaces} = props;

    const [searchTerm, setSearchTerm] = useState("golf course");
    const [loading, setLoading] = useState(false);

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        let url = "http://localhost:8000/api/map/getPotentialPlaces/" + stringToParam(address1) + "/" + stringToParam(address2) + "/" + stringToParam(searchTerm);
        Axios.get(url)
            .then(response =>{
                console.log(response);
                setPlaces([...response.data.places]);
                setCoord1(response.data.coord1);
                setCoord2(response.data.coord2);
                setRadius(response.data.radius);
                setMapCenter(response.data.center);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    function stringToParam(string){
        return string.replace(/ /g, '+');
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Enter first address:</span> 
                    </div>
                    <input className="form-control" required type="text" placeholder="User1 Address" onChange={ e => setAddress1(e.target.value)} value={address1} />
                </div>
                <div className="row input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Enter second address:</span> 
                    </div>
                    <input className="form-control" required type="text" placeholder="User2 Address" onChange={ e => setAddress2(e.target.value)} value={address2} />
                </div>
                <div className="row input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Enter search term:</span> 
                    </div>
                    <input className="form-control" required type="text" placeholder="Search Term" onChange={e => setSearchTerm(e.target.value)} value={searchTerm} />
                </div>
                <div className="row">
                    <button disabled={loading} className="btn btn-primary" type="submit">{loading ? "Loading..." : "Search"}</button>
                </div>
            </form>
        </div> 
     );
}
 
export default SearchArea;