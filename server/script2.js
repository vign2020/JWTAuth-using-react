const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.set('view engine' , 'ejs')
// Secret key for JWT (should be stored securely)
const JWT_SECRET = 'your-secret-key';

// Sample user data (should be stored in a database)
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];
const verifyTokenFromCookie = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      // return res.status(401).json({ message: 'No token provided' });
      res.redirect("/login")
    }
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        // return res.status(403).json({ message: 'Failed to authenticate token' });
        res.redirect("/login")
      }
  
      req.user = decoded; // Attach decoded user info to request object
      next();
    });
  };

app.get('/login' , (req , res)=>{
    res.render('login')
})
// Route for user authentication
app.post('/login', (req, res) => {
  const { name, password } = req.body;
  console.log(name , password)
  const user = users.find(u => u.username === name && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.cookie('token', token, { httpOnly: true });


    // res.json({ token });
    res.redirect("/protected");

  } else {
    // res.status(401).json({ message: 'Invalid credentials' });
    res.redirect("/login")
  }
});

// Route for protected resources
app.get('/protected', verifyTokenFromCookie ,(req, res) => {

    res.json({ message: 'Protected resource accessed', user: req.user });

});




app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
