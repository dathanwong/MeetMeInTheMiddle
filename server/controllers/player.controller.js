const { Player } = require("../models/player.model");

module.exports.index = (req, res)=>{
    res.json({
        message: "working"
    });
}

module.exports.findAll = (req, res)=>{
    Player.find({})
        .then(players => res.json(players))
        .catch(err => res.json(err));
}

module.exports.findById =(req, res)=>{
    Player.findOne({_id: req.params.id})
        .then(player => res.json(player))
        .catch(err => res.json(err));
}

module.exports.create = (req, res) =>{
    const {name, position} = req.body;
    Player.create({name, position})
        .then(player => res.json(player))
        .catch(err => res.status(400).json(err));
}

module.exports.delete = (req, res) =>{
    Player.deleteOne({_id: req.params.id})
        .then(r => res.json(r))
        .catch(err => res.json(err));
}

module.exports.update = (req, res) =>{
    Player.updateOne({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}