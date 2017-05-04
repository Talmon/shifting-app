const db = require('../db').db;
const express = require('express');
const router = express.Router();

//Insert Authentication Middleware

//Helper Get Function
function get (url, handler){
    router.get(url, (req, res) => {
      handler(req)
        .then(data =>
          res.json( { success:true, data:data} ) )          
         .catch(error => 
           res.json( {success:false , error: error.message || error } )
         )
    })
}

//About route for categories
router.get('/about' , (req, res) => 
  res.json( {success:true, message:"About Categories!"} )   
)
//all categories
get('/',db.categories.all);
//Home page route for categories
router.route('/')
//Add a category
.post( (req,res) => {
    let body = req.body;
    db.categories.insert({ 
        id: body.id,
        name: body.name   
    })
.then( data =>
    res.json( {success:true , data} )
)
.catch(error =>
    res.json( {success:false, error: error.message || error} )
)
})
//.get(db.categories.all)
//Get all categories
// .get( (req, res) => {
//     db.categories.all(req)
//       .then(data => 
//         res.json( { success:true, data} )
//       )
//       .catch(error =>
//         res.json( {success:false, error: error.message || error})
//       )  
//});
//Route for getting categories by id
router.route('/:id')
//Get category id by id
  .get( (req,res) => {
    db.categories.find(req.params.category_id)
      .then(data => 
          res.json( {success:true , data} )
      )
      .catch(error => 
          res.json( {success:false , error:error.message || error})
      )
  })
//Update the category given its id
  .patch( (req, res) => {
    let body = req.body
    db.categories.update({
        id: req.params.id,
        name: body.name
    })
  .then(data => 
    res.json( {success:true, data }) 
  )
  .catch(error =>
    res.json( {success:false, error:error.message || error })
  )
}) 
//Remove a category by it's id
 .delete( (req,res ) => {
    db.categories.remove(req.params.category_id)
      .then(data =>
          res.json( {success:true, data} )
      )
      .catch(error =>
          res.json( {success:false, error:error.message || error} )
      )
 });
 //Find a category by it's id
 get('/find/id=:id', req => db.categories.find(+req.params.id))

 module.exports = router;