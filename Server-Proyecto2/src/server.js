
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.set('json spaces', 2);

// import the routes of the server 
 app.use('/api/orders', require('./routes/orders')) 
 app.use('/api/supplies', require('./routes/supplies')) 
 app.use('/api/requisitions', require('./routes/requisitions')) 
 app.use('/api/login', require('./routes/login')) 
 app.use('/api/register', require('./routes/register')) 
 

// Initialice the port of the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});