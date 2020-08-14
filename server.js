const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
require('dotenv').config();

require('./server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
require('./server/routes/map.routes')(app);
require('./server/routes/player.routes')(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );