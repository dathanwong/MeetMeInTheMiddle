const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/mapusersdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established connection to the database"))
    .catch(err => console.log("Something went wrong ", err));