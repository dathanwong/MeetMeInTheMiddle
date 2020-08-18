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
    try{
        let coord1 = await getGeocode(address1);
        let coord2 = await getGeocode(address2);
        let radius = 20000;
        //Get all places in range for address 1 and address 2
        let places = await getPlaces(getCenterCoord(coord1, coord2), radius, keyword);
        //Get the distances to all the potential places from each address
        let distances = await getDistances(coord1, coord2, places);
        //Create returned object
        const output = {
            coord1: coord1,
            coord2: coord2,
            radius: radius,
            places: places,
            distances: distances
        }
        res.json(output);
    }catch(err){
        console.log(err);
    }
}

function getCenterCoord(coord1, coord2){
    return{lat: (coord1.lat+coord2.lat)/2, lng: (coord1.lng+coord2.lng)/2}
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
        let coordinates = {lat: response.data.results[0].geometry.location.lat, lng: response.data.results[0].geometry.location.lng};
        return coordinates;
    } catch(err){
        console.log(err);
    }
}

async function getPlaces(coord, radius, keyword){
    let url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + coord.lat + "," + coord.lng + "&radius=" + radius + "&keyword=" + keyword + "&key=" + process.env.GOOGLE_MAPS_API_KEY
    let allPlaces = [];
    let places = await Axios.get(url);
    let token = places.data.next_page_token;
    allPlaces.push(...places.data.results);
    while(token !== undefined){
        url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=" + token + "&key=" + process.env.GOOGLE_MAPS_API_KEY;
        await delay(2000);
        places = await Axios.get(url);
        token = places.data.next_page_token;
        allPlaces.push(...places.data.results);
    }
    return allPlaces;
}

async function getDistances(coord1, coord2, places){
    let origins = coord1.lat + "," + coord1.lng + "|" + coord2.lat + "," + coord2.lng;
    let destinations = "";
    let originAddresses = [];
    let destinationAddresses = [];
    let distanceFromOrigin1 = [];
    let distanceFromOrigin2 = [];
    for(let i = 0; i < places.length; i++){
        destinations = destinations + places[i].geometry.location.lat + "," + places[i].geometry.location.lng + "|";
        if(i%23 === 0 || i === places.length-1){
            let url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + origins + "&destinations=" + destinations + "&key=" + process.env.GOOGLE_MAPS_API_KEY;
            try{
                console.log(url);
                let response = await Axios.get(url);
                originAddresses = response.data.origin_addresses;
                destinationAddresses.push(...response.data.destination_addresses);
                distanceFromOrigin1.push(...response.data.rows[0].elements);
                distanceFromOrigin2.push(...response.data.rows[1].elements);
            }catch(err){
                console.log(err);
            }
            destinations = "";
        }
    }
    return {origins: originAddresses, destinations: destinationAddresses, distance_from_origin1: distanceFromOrigin1, distance_from_origin2: distanceFromOrigin2};
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