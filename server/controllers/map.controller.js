const { default: Axios } = require("axios");

module.exports.getDistance = (req, res)=>{
    const address1 = req.params.address1;
    const address2 = req.params.address2;
    const url = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=' + address1 + '&destinations=' + address2 + '&key=' + process.env.GOOGLE_MAPS_API_KEY + '&departure_time=now'
    Axios.get(url)
        .then( response =>{
            console.log(response.data);
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
