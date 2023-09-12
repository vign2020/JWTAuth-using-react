const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const Cookies = require('js-cookie')
const jwt=require("jsonwebtoken")
const multer = require('multer')

//************************CODE EDITOR LIBRARIES***************
const { exec } = require('child_process');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { create } = require("domain");
const uniqueId = uuidv4();
const path = require("path");
const { stderr, stdout } = require("process");

const app = express();
const User = require('./User'); 
const Post = require('./Posts')




mongoose.connect('mongodb://localhost/CodeCrunch', { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use(express.json())
app.use(express.urlencoded({extended:true}))



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../client/src/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

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


const checkExpire = (req ,res , next)=>{
  

// Get the login timestamp from the cookie
const storedTimestamp = Cookies.get('loginTimestamp');

if (storedTimestamp) {
  // Convert the stored timestamp back to a Date object
  const loginDate = new Date(parseInt(storedTimestamp, 10));

  // Get the current timestamp
  const currentTimestamp = new Date().getTime();

  // Calculate the difference in minutes
  const minutesDifference = (currentTimestamp - loginDate) / (1000 * 60);

  // Check if it's been 15 minutes since login
  if (minutesDifference >= 15)  res.json({message : 'login again !!'})
  }
}

const JWT_SECRET = 'your-secret-key';

app.get('/checkAuth' , verifyTokenFromCookie , (req , res)=>{
  res.sendStatus(200)
})
//middleware for handling failure upon 

app.get('/home' , verifyTokenFromCookie , checkExpire ,  async (req ,res)=>{
  // console.log(`the user is ${req.user.id}`)
  const user = await User.findById(req.user.id)
  res.json({ message: 'Protected resource accessed', user: user });
              
  // res.sendStatus(200)
})


app.post('/register', async (req, res) => {
  let today = new Date().toLocaleDateString()

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
        premium: false,
        date_joined: today,
        stats:[
          {
            solved : 0,
            favourites: [],
            contests: 0,
            Ranking: 0
          }
        ]

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
        res.cookie('token', token, { httpOnly: true , expiresIn : '1m'});
        res.cookie('CurrentUser' , user.name , {httpOnly:true});

        const loginTimestamp = new Date().getTime();
        console.log('login time is' + loginTimestamp)

        
        console.log(`${user._id} and ${token}`)
        // res.redirect('/home')
        res.status(200).json({ token : token , CurrentUser:user.name})
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





  //******************Code editor code Part**************************//

  const create_file_dir = async (code)=>{
    // CODE TO CREATE DIRECTORY 
  const directoryName = 'Code';
  const uniqueId = uuidv4();// Replace this with the actual method to generate a unique ID
  const fileName = `file${uniqueId}.cpp`;
 
      if (code === undefined) return res.status(400).json({ msg: 'No code' });
      if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

      const filePath = `${directoryName}/${fileName}`
      await fs.writeFileSync(filePath, code);

      return filePath
    }

  const execute_code = async (filePath) => {
    const fileName = path.basename(filePath, path.extname(filePath));


      const cppFileName = `Code\\${fileName}.cpp`;
    
      const compilePromise = new Promise((resolve, reject) => {
        exec(`g++ ${cppFileName} -o Code\\output_binary2`, (compileError, compileStdout, compileStderr) => {
          if (compileError) {
            console.log('Compilation error:', compileError);
            reject(compileError);
        
            // return compileError;
          }
          resolve();
        });
      });
    
      await compilePromise; // Wait for the compilation to complete
    
      const runPromise = new Promise((resolve, reject) => {
        exec('.\\Code\\output_binary2', (runError, runStdout, runStderr) => {
          if (runError) {
            console.log('Execution error:', runError);
            reject(runError);
            
            // return runError;
          }
          console.log('Execution output:', runStdout);
          resolve(runStdout);
        });
      });
    
      return runPromise; // Return the output of execution
    };


    app.post("/code", async (req, res) => {
      const { code } = req.body;
      try{
        //THE FILE PATH 
        const filePath = await create_file_dir(code);
        console.log(filePath)
    
        //CODE TO EXECUTE THE FILE
        const start=Date.now()
        const output = await execute_code(filePath)
        const end = Date.now()

        console.log(`output is ${output}`)
        res.json({op:output , executionTime: end-start , success:true});
    
      }catch (error) {
        console.error('Error is is:', error);
        // console.log('ERROR IS THIS ' + error)
        let error2 = error.toString();
        res.json({ op: error2 , executionTime:0.000 , success:false });
      }
        
      });

//code for discuss route

      app.get('/discuss' , async(req , res)=>{
        //fetch and show only the latest posts of every user
        if(req.originalUrl === '/discuss'){
          try{
            const users = await User.find({})
  
            const allPosts =  users.reduce((posts, user) => {
              if (user.posts && user.posts.length > 0) {
                  // Add user's posts to the posts array
                  posts.push(...user.posts);
              }
              return posts;
          }, []);
  
          const contentArray =  allPosts.map(post => post.content);
          const timestampArray = allPosts.map(post => post.timestamp);

          let titleArray = allPosts.map(post => post.title)
          titleArray=titleArray.filter(post => post!==undefined)

          
          console.log(timestampArray)
  
    
          res.json({userPosts : contentArray , userTitle : titleArray , timestamp:timestampArray });
  
          }catch(e){
             res.sendStatus(401)
          }

        }
      })

      app.post('/discuss' , async (req , res)=>{
        const {title , content , curr_user} = req.body;
        
        try{
          // const curr_user = req.cookies.CurrentUser
  
          const user = await User.findOne({name : curr_user});
          console.log(curr_user)
          

          const newPost = {
            content: content,
            title: title,
            timestamp: new Date()
        };

        user.posts.push(newPost);
        await user.save();

        res.json({ status: 201 , timestamp:newPost.timestamp});

    
        }catch(e){
          console.log(e)
          res.json({status:401 })
        }

        });
app.post('/discuss-content' , async(req, res)=>{
  const postData = req.body.getContent;
  console.log(postData)

  let posts='';
   
  const user = await User.findOne({ 'posts.title': postData }, { 'posts.$': 1 }).exec();
   
  const post = user.posts[0]; // Assuming there's only one post with that title
  const content = post.content;

  console.log(content)
  
  res.json({userContent : content})

})


//profile route
const upload = multer({ storage });


app.get('/profile', async (req,res)=>{
  const curr_user = req.query.curr_user;
  console.log('user is'+curr_user)

  try{
    const user= await User.findOne({name : curr_user})
    console.log(' user stats is ' + user.stats)
    const contest = user.stats[0].contests;
    const ranking = user.stats[0].Ranking;
    const solved = user.stats[0].solved;
    console.log('contest is '+ contest)

    if(!user.image) res.json({image : 'noimage.png'});
    else{
      //fetch the image-name from db
      res.json({image : user.image , contest : contest , ranking : ranking , solved : solved})
    }
  }catch(e){
    console.log(e);
  }
  
  
  
})
// Define a route to handle file uploads
app.post('/profile', upload.single('file'), async (req, res) => {
  // The file has been uploaded and stored in the 'uploads/' directory
  // You can perform further processing here
  const curr_user = req.query.curr_user
  const file_name =req.file.originalname;
  try{
    const user = await User.findOne({name : curr_user})

    if(!user.image){
      user.image = file_name;
    }
    user.image=file_name
    await user.save();
    res.json({ message: 'File uploaded successfully' , image : file_name});

  }catch(e){
    console.log(e)
  }
 


});

  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });