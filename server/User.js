const mongoose = require('mongoose');


const postsSchema = new mongoose.Schema({
  title:{
    type: String,
    required:true
  },
  content: {
      type: String,
      maxlength: 55000, // Limit posts to 150 characters
      required: true
  },
  timestamp: {
      type: Date,
      default: Date.now
  }
})


const userPseudoSchema = new mongoose.Schema({
  name: String,
  email:String,
  password: String,
  premium:Boolean,
  date_joined:Date,
  stats:[
    {
        solved:Number,
        favourites:[Number],
        contests:Number,
        Ranking:Number,
    }
  ],
  posts : [postsSchema]
});

const User = mongoose.model('User', userPseudoSchema);

module.exports = User;
