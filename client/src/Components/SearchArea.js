import React, { useState } from 'react';
import Axios from 'axios';

const SearchArea = (props) => {

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    function handleSubmit(e){
        e.preventDefault();

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <input type="text" placeholder="User1 Address" onChange={ e => setAddress1(e.target.value)} />
                </div>
                <div className="row">
                    <input type="text" placeholder="User2 Address" onChange={ e => setAddress2(e.target.value)} />
                </div>
                <div className="row">
                    <input type="text" placeholder="Search Term" onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <div className="row">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
            </form>
        </div> 
     );
}
 
export default SearchArea;