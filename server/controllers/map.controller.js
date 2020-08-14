const { default: Axios } = require("axios");

module.exports.getDistance = async (req, res)=>{
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    let output = await getDistance(address1, address2)
    console.log("Output", output);
    res.json(output);
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

module.exports.getPotentialPlaces = async(req, res) =>{
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    const keyword = req.params.keyword;

}

//returns a json object with the distance in meters between the two destinations, and the duration in seconds
async function getDistance(address1, address2){
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + address1 + '&destinations=' + address2 + '&key=' + process.env.GOOGLE_MAPS_API_KEY + '&departure_time=now'
    try{
        let response = await Axios.get(url);
        console.log(response.status);
        if(response.status === 200){
            console.log(response.data.rows[0].elements[0]);
            return {
                distance: response.data.rows[0].elements[0].distance.value, //In meters
                duration: response.data.rows[0].elements[0].duration.value, //In seconds
                duration_in_traffic: response.data.rows[0].elements[0].duration_in_traffic.value //In seconds
            }
        }
    }catch(err){
        console.log(err);
    }
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

async function comparePlaces(places1, places2){
    let allPlaces = {};
    let output = [];
    for(let place in places){
        if(allPlaces.hasOwnProperty(place.placeId)){
            output.push(place);
        }else{
            allPlaces[place.placeId] = 1;
        }
    }
    return output;
}