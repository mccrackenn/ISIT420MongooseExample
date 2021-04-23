// mongoose is a API wrapper overtop of mongodb, just like
// .ADO.Net is a wrapper over raw SQL server interface
const mongoose = require("mongoose");

// here we define a schema for our document database
// mongo does not need this, but using mongoose and requiring a 
// schema will enforce consistency in all our documents (records)
const Schema = mongoose.Schema;

const OrdersSchema = new Schema({
  StoreID: {
    type: String,
    required: true
  },
  SalesPersonID: {
    type: Number,
    required: true
  },
  CdID: {
    type: Number,
    required: true
  },
  PricePaid: {
    type: Number,
    required: true
  },
  HourPunch: {
    type: Number,
    required: false
  },
  DayPunch: {
    type:Number,
    required:false
  }
});

module.exports = mongoose.model("Orders", OrdersSchema);