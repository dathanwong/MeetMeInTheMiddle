const { default: Axios } = require("axios");

module.exports.getDistance = (req, res)=>{
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + address1 + '&destinations=' + address2 + '&key=' + process.env.GOOGLE_MAPS_API_KEY + '&departure_time=now'
    Axios.get(url)
        .then( response =>{
            res.json({
                distance: response.data.rows[0].elements[0].distance,
                duration: response.data.rows[0].elements[0].duration,
                duration_in_traffic: response.data.rows[0].elements[0].duration_in_traffic
            })
        })
        .catch( err => {
            console.log(err);
        });
}

module.exports.getGeocode = (req, res) =>{
    const address = req.params.address;
    getGeocode(address)
        .then(response => res.json(response))
        .catch(err => res.json(err));
}

module.exports.getPlaces = async (req, res) =>{
    const address = req.params.address;
    const radius = req.params.radius;
    const keyword = req.params.keyword;
    let places = await getPlaces(address, radius, keyword);
    res.json(places);
}

async function getGeocode(address){
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + process.env.GOOGLE_MAPS_API_KEY;
    try{
        let response = await Axios.get(url);
        if(response.data.results[0] === undefined){
            console.log("Unable to find location: ", response.data);
            return;
        }
        let coordinates = {lat: response.data.results[0].geometry.location.lat, long: response.data.results[0].geometry.location.lng};
        return coordinates;
    } catch(err){
        console.log(err);
    }
}

async function getPlaces(address, radius, keyword){
    const coord = await getGeocode(address);
    const url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coord.lat + "," + coord.long + "&radius=" + radius + "&keyword=" + keyword + "&key=" + process.env.GOOGLE_MAPS_API_KEY
    let places = await Axios.get(url)
    console.log(places.data.results);
    if(places !== null){
        return places.data.results;
    }else{
        console.log("GetPlaces: Unable to get places");
        return null;
    }
}