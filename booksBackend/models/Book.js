'use strict'

let mongoose = require("mongoose");
let Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: String,
  info: String,
  moreInfo: String
});


let BookModel= mongoose.model("Book",BookSchema);
module.exports = BookModel;


