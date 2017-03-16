const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  _id: Number,//am implementat incrementare cu count
  username: String,
  password: String,
  //email: String,
  societate: String,
  numePrenume: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account); //mai pune un s la capat cand denumeste tabela
