const {User} = require('../models/user.model');

module.exports.register = (req, res) =>{
    User.create(req.body)
        .then(user =>{
            res.json({message:"Success!", user: user});
        })
        .catch(err => res.status(400).json(err));
}