const mongoose = require('mongoose');

const userPseudoSchema = new mongoose.Schema({
  name: String,
  email:String,
  password: String,
 
});

const User = mongoose.model('User', userPseudoSchema);

module.exports = User;
                                                                                                    