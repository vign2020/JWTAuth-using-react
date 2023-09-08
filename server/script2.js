const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const Person = require('./Person')
const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine' , 'ejs')
// Secret key for JWT (should be stored securely)


// mongoose.connect('mongodb://localhost/CodeCrunch', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });


  app.get('/discuss' , async (req ,res)=>{

    try{

      const user = new Person({
        name: 'John Doe',
        address: {
            street: '123 Main St',
            city: 'Exampleville'
        },
        posts: [
            { content: 'This is my first post.' },
            { content: 'Another short post.' }
            // You can add more posts here
        ]
    });
      await user.save();   
      res.sendStatus(201)

    }catch(e){
      res.sendStatus(401)
    }
     
  })

 
// Assuming you have a timestamp in a variable
const postedTimestamp = new Date('2023-09-04T12:26:07.337Z'); // Replace this with your actual timestamp

// Get the current time
const currentTime = new Date();

// Calculate the time difference in milliseconds
const timeDifferenceMs = currentTime - postedTimestamp;

// Calculate the time difference in seconds, minutes, hours, and days
const secondsDifference = Math.floor(timeDifferenceMs / 1000);
const minutesDifference = Math.floor(secondsDifference / 60);
const hoursDifference = Math.floor(minutesDifference / 60);
const daysDifference = Math.floor(hoursDifference / 24);

console.log(`Time elapsed: ${daysDifference} days, ${hoursDifference % 24} hours, ${minutesDifference % 60} minutes, ${secondsDifference % 60} seconds`);


// app.listen(5000, () => {
//   console.log('Server is running on port 3000');
// });
