const PlayerController = require('../controllers/player.controller');

module.exports = function(app){
    app.get('/api', PlayerController.index);
    app.post('/api/players', PlayerController.create);
    app.get('/api/players', PlayerController.findAll);
    app.delete('/api/players/:id', PlayerController.delete);
    app.put('/api/players/:id', PlayerController.update);
    app.get('/api/players/:id', PlayerController.findById);
}