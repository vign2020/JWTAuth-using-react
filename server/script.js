const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const jwt=require("jsonwebtoken")


const app = express();
const User = require('./User'); // Assuming you have a User model defined




mongoose.connect('mongodb://localhost/your-database-name', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(cookieParser());



app.use(cors());
app.use(bodyParser.json());

const verifyTokenFromCookie = (req, res, next) => {
  const token = req.cookies.token;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
    // return res.status(401)
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
      // return res.status(403)
    }

    req.user = decoded; // Attach decoded user info to request object
    next();
  });
};


const JWT_SECRET = 'your-secret-key';

app.get('/checkAuth' , verifyTokenFromCookie , (req , res)=>{
  res.sendStatus(200)
})
//middleware for handling failure upon 

app.get('/home' , verifyTokenFromCookie,  async (req ,res)=>{
  // console.log(`the user is ${req.user.id}`)
  const user = await User.findById(req.user.id)
  res.json({ message: 'Protected resource accessed', user: user });
              
  // res.sendStatus(200)
})


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
     console.log(`the values are ${name} and ${email}  and ${password}`)
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const existingUser = await User.findOne({email})
      if (existingUser) {
        return res.status(409).send('User already exists. Please login')
    }


      const user = new User({
        name : name,
        email : email,
        password: hashedPassword,
      });

      await user.save();
      return res.sendStatus(200)

    } catch (error) {
      console.error('Error registering user:', error);
      res.redirect('/register');
    }
  });

  app.get('/login' , (req , res)=>{
    res.render('login')
})
  
  app.post('/login', async (req, res) => {
    const { email , password } = req.body;
    // console.log(email , password)
    const user = await User.findOne({ email });
    const passOk = await bcrypt.compare(password , user.password);

    if (user && passOk) {
      
        const token = jwt.sign({ id: user._id }, JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        console.log(`${user._id} and ${token}`)
        // res.redirect('/home')
        res.status(200).json({ token : token})
    } else if(!user || (user && !passOk ) ){
      console.log('failed')
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });

  app.get('/logout', (req, res) => {
    const history=useNavigate();
    // Clear the token cookie
    res.clearCookie('token');
    // res.json({token : undefined })
  
    // Redirect the user to a logout page or another location
    res.redirect('/login'); // Replace with your desired logout page or URL
  });


  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });