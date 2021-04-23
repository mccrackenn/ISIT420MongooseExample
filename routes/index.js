var express = require('express');
var router = express.Router();

let hourPunched =0;
let dayPunched=0;

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
  poolSize: 10,
};

mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);


router.get('/', function(req, res) {
  res.sendFile('index.html');
});



router.post('/NewOrder', function(req, res){
    if(hourPunched > 23){
      hourPunched=hourReset(hourPunched);
      console.log("hour is :"+hourPunched);
      dayPunched++
      console.log("Day is :"+dayPunched)
    }
  var someOrder=req.body;
  someOrder.hourPunch=hourPunched;
  someOrder.dayPunch=dayPunched;
  console.log(someOrder);
  //console.log(req.body);
 

  
  res.status(201).json(req.body);
  hourPunched += getRoundInteger(1,5);
  // console.log(hourPunch);
});

const hourReset = a=> a-23;

const getRoundInteger = (min, max) => 
  Math.floor(Math.random() * (max-min +1))+min


router.post('/FiveHundred', function(req, res){
  if(hourPunched > 23){
    hourPunched=hourReset(hourPunched);
    dayPunched++;
  }
  console.log(hourPunched);
  
  let oneNewOrder=Orders({
                          StoreID:req.body.StoreID,
                          SalesPersonID:req.body.SalesPersonID,
                          CdID:req.body.CdID,
                          PricePaid:req.body.PricePaid, 
                          HourPunch:hourPunched,
                          DayPunch:dayPunched
                        })
  
  hourPunched +=getRoundInteger(1,5);
  console.log(oneNewOrder);
  
  oneNewOrder.save((err, order) => {
  if (err) {
    res.status(500).send(err);
  }
  else {
  //console.log(order);
  
  res.status(201).json(order);
  }
  });
});



module.exports = router;
