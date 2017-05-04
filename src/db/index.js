'use strict';

//Bluebird is the best promise library available as of now
var promise = require('bluebird');
//var config = require('../config').dev;

//Loading all the database repos separately
//because event extend is called multiple times

var repos = {
    categories: require('./repos/categories')
    //to be implemented
    //users: require('./repos/users'),
    //houses: require('./repos/houses')
}

//pg-promise intialization options,study this over and over
var options = {
    //use a custom promise library,instead of the default ES6 Promise:
    promiseLib: promise,

    //Extending the database protocol with our custom repos
    extend: obj => {
        //do not use require,because event occurs for every task
        //and transaction being executed,which should be as fast as possible
        obj.categories = repos.categories(obj,pgp);
        //obj.users = repos.products(obj,pgp);

        //Alternatively,set all repos in a loop
        //for (var r in repos) {
        //obj[r] = repos[r](obj,pgp)
        //        }
    }
}
//Database connection parameters are in the dev module
var config = {
     host: 'localhost',
     port: 5432,
     database: 'househunter',
     user: 'postgres', 
     password: 'tali4719'
};
//load and intialize pg-promise
var pgp = require('pg-promise')(options);

//Create database instance
var db = pgp(config);
//console.log(db);

//Load and intialize optional diagnostics to be implemented
//var diag = require('./diagnostics');
//diag.init(options);

//Example of changing default pool size should you need it...
//pgp.pg.defaults.poolSize = 20;

//Database object is all that's needed
// If you even need access to the library's root (pgp object),
// you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = {
    // Library instance is often necessary to access all the useful
    // types and namespaces available within the library's root:
    pgp,
    // Database instance. Only one instance per database is needed
    // within any application.
    db
};