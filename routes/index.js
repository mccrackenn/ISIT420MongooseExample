var express = require('express');
var router = express.Router();

// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

const Orders = require("../Brews");

// edited to include my non-admin, user level account and PW on mongo atlas
// and also to include the name of the mongo DB that the collection
const dbURI =
 "mongodb+srv://neiluser:userneil@cluster0.rts44.mongodb.net/FavoriteBars?retryWrites=true&w=majority";

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);



/* GET home page. */
router.get('/', function(req, res) {
  res.sendFile('index.html');
});

/* GET allBrews */
// router.get('/Brews', function(req, res) {
//   // find {  takes values, but leaving it blank gets all}
//  Brews.find({}, (err, AllToDos) => {
//     if (err) {
//       console.log(err);
//       res.status(500).send(err);
//     }
//     res.status(200).json(AllToDos);
//   });
// });




/* post a new ToDo and push to Mongo */
// router.post('/NewBrew', function(req, res) {

//     let oneNewBrew = Brews(req.body);  // call constuctor inBrews code that makes a new mongo ToDo object
//     //console.log(req.body);
//     oneNewBrew.save((err, brew) => {
//       if (err) {
//         res.status(500).send(err);
//       }
//       else {
//       console.log(brew);
//       res.status(201).json(brew);
//       }
//     });
// });
router.post('/NewOrder', function(req, res){
  let oneNewOrder=Orders(req.body);
  console.log(req.body);
  //oneNewOrder.save((err, order) => {
  if (err) {
    res.status(500).send(err);
  }
  else {
  console.log("Worked");
  res.status(201).json("Great success!");
  }
  
});

router.post('/FiveHundred', function(req, res){
  let oneNewOrder=Orders(req.body);
  console.log(req.body);
  oneNewOrder.save((err, order) => {
  if (err) {
    res.status(500).send(err);
  }
  else {
  console.log(order);
  res.status(201).json(order);
  }
  });
});

router.delete('/DeleteBrew/:id', function (req, res) {
 Brews.deleteOne({ _id: req.params.id }, (err, brew) => { 
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Brew successfully deleted" });
  });
});


router.put('/UpdateBrew/:id', function (req, res) {

  Brews.findOneAndUpdate(
    { _id: req.params.id },
    { BrewName: req.body.BrewName, 
     Brewer: req.body.Brewer , 
     BrewerLocation: req.body.BrewerLocation ,   
     Tried: req.body.Tried },
   { new: true },
    (err, brew) => {
      if (err) {
        res.status(500).send(err);
    }
    res.status(200).json(brew);
    })
  });


  /* GET oneBrews */
router.get('/FindBrew/:id', function(req, res) {
  console.log(req.params.id );
 Brews.find({ _id: req.params.id }, (err, oneBrew) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(oneBrew);
  });
});

module.exports = router;
