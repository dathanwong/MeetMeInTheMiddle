const MapController = require('../controllers/map.controller');

module.exports = function(app){
    app.get('/api/map/getDistance/:address1/:address2', MapController.getDistance);
}