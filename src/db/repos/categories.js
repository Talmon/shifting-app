'use strict';


var sql = require('../sql').categories;

module.exports = (rep,pgp) => {
    return {
        //Add new category and return the new id
        insert: values => 
        rep.one(sql.add, values, category => category.id),

        //Return all categories
        all: () =>
        rep.any(sql.select_all),

        //update a category
        update: values =>
        rep.one(sql.update, values, category => category.id),

        //find a category by id
        find: id =>
        rep.oneOrNone(sql.select_one, id),

        //delete a category by id and return no of records deleted
        remove: id =>
        rep.result(sql.remove, id, r => r.rowCount)
    }
}