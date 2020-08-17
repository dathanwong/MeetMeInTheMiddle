const { default: Axios } = require("axios");

module.exports.getDistance = async (req, res)=>{
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    let output = await getDistance(address1, address2);
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
    //Set up parameters
    const additionalDistance = 1000; //Sets the overlap distance between the addresses
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    const keyword = req.params.keyword;
    let distanceValues = await getDistance(address1, address2);
    let radius = distanceValues.distance/2 + additionalDistance;
    //Get all places in range for address 1 and address 2
    let places1 = await getPlaces(address1, radius, keyword);
    let places2 = await getPlaces(address2, radius, keyword);
    //Get the places that overlap for both
    let overlap = comparePlaces(places1, places2);
    res.json(overlap);
}

//returns a json object with the distance in meters between the two destinations, and the duration in seconds
async function getDistance(address1, address2){
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + address1 + '&destinations=' + address2 + '&key=' + process.env.GOOGLE_MAPS_API_KEY + '&departure_time=now'
    try{
        let response = await Axios.get(url);
        if(response.status === 200){
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
        if(response.status !== 200){
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
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coord.lat + "," + coord.long + "&radius=" + radius + "&keyword=" + keyword + "&key=" + process.env.GOOGLE_MAPS_API_KEY
    let allPlaces = [];
    let places = await Axios.get(url);
    let token = places.data.next_page_token;
    console.log(places.data.next_page_token);
    allPlaces.push(...places.data.results);
    if(token !== undefined){
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" + token + "&key=" + process.env.GOOGLE_MAPS_API_KEY;
        await delay(2000);
        places = await Axios.get(url);
        console.log(places);
        allPlaces.push(...places.data.results);
    }
    console.log(allPlaces.length);
    return allPlaces;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function comparePlaces(places1, places2){
    let allPlaces = {};
    let output = [];
    for(let i = 0; i < places1.length; i++){
        allPlaces[places1[i].place_id] = 1;
    }
    for(let i = 0; i < places2.length; i++){
        if(allPlaces.hasOwnProperty(places2[i].place_id)){
            output.push(places2[i]);
        }
    }
    return output;
}