const MapController = require('../controllers/map.controller');

module.exports = function(app){
    app.get('/api/map/getDistance/:address1/:address2', MapController.getDistance);
    app.get('/api/map/getGeocode/:address', MapController.getGeocode);
    app.get('/api/map/getPlaces/:address/:radius/:keyword', MapController.getPlaces);
    app.get('/api/map/getPotentialPlaces/:address1/:address2/:keyword', MapController.getPotentialPlaces);
    app.get('/api/map/getPhoto/:reference/:width', MapController.getPhoto);
}