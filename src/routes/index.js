const express = require('express');
const app = express();
const router = express.Router();
const categories = require('./categories');
const bodyParser = require('body-parser');

//Imports yet to be implemented
//const users = require('./users');
//const houses = require('./houses');

//Serve static content using express
app.use(express.static(__dirname + '/public'))

//Body parser is needed for POST information
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type:'application/vnd.api+json'})); 

//Sanity check for our api
// router.get('/', (req, res) => {
//     res.json( {success:true, message:'Got a request to the main API url'} );
// });

app.use('/categories', categories);
app.use(router);
var port = 3000;

app.listen(port, () => {
    console.log('\nServer listening for  requests on http://localhost:' + port );
});

//Routes to be implemented
//app.use('/users', users);
//app.use('/houses', houses);
module.exports = {
    app,
    router   
};