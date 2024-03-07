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
const redisConnection = require('./redis-connection') 
const {Queue} = require("bullmq")
// const limitter = require('express-rate-limit')
const rateLimiter = require('./rate-limiter')




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

const { Contest, Problem, Submission, ContestUser } = require('./Contestdb');

//rate limiting middleware
// app.use(limitter({
//   windowMs : 5000,
//   max : 5
// }))


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
app.use(rateLimiter({ secondsWindow: 60, allowedHits: 10 }));


function callsome (req){
  const commonFields = {
    callsInAMinute: req.requests,
    ttl: req.ttl,
  };
  return commonFields ;
}



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
  let today = new Date()

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

  const create_file_dir = async (code , prob_name)=>{
    // CODE TO CREATE DIRECTORY 
  const directoryName = 'Code';
  const uniqueId = uuidv4();// Replace this with the actual method to generate a unique ID
  // prob_name = prob_name.replace(/\s+/g, '')
  let fileName = `${prob_name}`;

 
      // if (code === undefined) return res.status(400).json({ msg: 'No code' });
      // if (code === undefined) return undefined

      if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);

      const filePath = `${directoryName}/${fileName}`
      // console.log(filePath)
      await fs.writeFileSync(filePath, code);

      return filePath
    }
// create_file_dir('sdfsdf' , '889          Two Sum 1.cpp' );

  const execute_code = async (filePath) => {
    console.log('FILE PATH IS I.....???????' + filePath)
    const fileName = path.basename(filePath, path.extname(filePath));
    console.log(`fileName is ${fileName}`)


      const cppFileName = `Code\\${fileName}.cpp`;
      console.log(cppFileName)
    
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
          // console.log('Execution output:', runStdout);
          resolve(runStdout);
        });
      });
    
      return runPromise; // Return the output of execution
    };

    const global_testcase=[];
    let global_actual_code;

    app.post("/code", async (req, res) => {
        const {code , call , codemain , callmain} = await req.body;
        

        // console.log(`call is ${call} and codemain is ${codemain} and callmain is ${callmain}`)
      
       const filePath = await create_file_dir(code , call)
       const filePath2 = await create_file_dir(codemain , callmain)
       
      //  console.log(`${filePath} and ${filePath2}`)
      if(!filePath) res.sendStatus(401)

      console.log('file path2 is....???????::::' + filePath2)

      const start =Date.now()
      let op;
      let status;

      try{
         op = await execute_code(filePath2)
         status = true
      }catch(e){
        op = e.message;
        status = 'fail'
      }
       
        const executionTime =  Date.now() - start;
      //  ans.then((result) => console.log(result))

      //  console
      //  console.log(filePath)
      // execute_code(filePath);
      console.log(op)
      res.json({op : op  , executionTime  : executionTime , status : status })

      });


      app.post("/code-testcase" , async(req ,res) =>{
        const testcase = req.body.testcase;
        const code = req.body.actualCode;

        // console.log('actual code is' + code)
        // console.log('test case' + testcase)
        if(testcase){
          testcase.map((item ,index)=>{
            global_testcase.push(item)
          })
        }

   
        global_actual_code = code;
        // console.log(code)
        res.json({status : 200})
      })

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
            title : title,
            timestamp: new Date()
        };

        user.posts.push(newPost);
        await user.save();

        res.json({ message: 201 , timestamp:newPost.timestamp});

    
        }catch(e){
          console.log(e)
          res.json({status:401 })
        }

        });

app.post('/discuss-content' , async(req, res)=>{
  const postData = req.body.getContent;
  console.log(postData)

  
   
  const user = await User.findOne({ 'posts.title': postData }, { 'posts.$': 1 }).exec();
   
  const post = user.posts[0]; // Assuming there's only one post with that title
  const content = post.content;

  console.log(content)
  
  res.json({userContent : content})

})

app.post('/my-post' , async(req, res)=>{
  const curr_user = req.body.curr_user;
  try{
    const myPost = await User.findOne({name : curr_user})
    const postsArray = myPost.posts;


    const Combined=[]
    postsArray.map((item , index)=>{
      
      const temp = {title : item.title , content : item.content}
      Combined.push(temp)
    
    })
    res.json({Combined : Combined});

  }catch(e){
    console.log(e)
    // res.json({posts: []})
  }

})

app.post('/posts-delete', async(req , res)=>{

  const title = req.body.title;
  const curr_user = req.body.curr_user;

    if(title!==null) {
      try{
        
      // const user_title = await User.findOne({'posts.title' : title} , {'posts.$' : 1 }).exec();
      // console.log(user_title.posts[0])

    
      const user = await User.findOne({name : curr_user})
      const postIndex = user.posts.findIndex(post => post.title === title);

      user.posts.splice(postIndex, 1);

    // Save the updated user object
    await user.save();
    res.json({status : 200})
      }
      catch(e){
        console.log(e)
         res.json({status : 500})
      }
    }

  
  // console.log(title)
})
//profile route
const upload = multer({ storage });


app.get('/profile', async (req,res)=>{
  const curr_user = req.query.curr_user;
  // console.log('user is'+curr_user)

  try{
    const user= await User.findOne({name : curr_user})
    // console.log(' user stats is ' + user.stats)
    const contest = user.stats[0].contests;
    const ranking = user.stats[0].Ranking;
    const solved = user.stats[0].solved;
    // console.log('contest is '+ contest)


    //if user has not uploaded an image.
    if(!user.image) {
      console.log('inside fi')
      res.json({image : 'noimage.png'});
    }
    else{
      //fetch the image-name from db
      console.log('inside ielse ')
      console.log('ttl is ' + req.ttl + 'and calls is ' + req.requests);
      const commonFields = callsome(req);
      res.json({image : user.image , contest : contest , ranking : ranking , solved : solved , ...commonFields})
      // callsInAMinute : req.requests , ttl : req.ttl

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


//contest routes
//just for returning the available contests based on time and date
app.get("/contest" , async (req , res)=>{
  const currentDateTime = new Date();

    const contest = await Contest.findOne({ 
      startTime: { $lte: currentDateTime },
      endTime: { $gte: currentDateTime }
    })

    res.json({contest : contest.title , id : contest._id})       
})

//for inserting participants
app.post("/contest_insert_user" , async (req , res) =>{
  const curr_user = req.body.curr_user;
  const contestId = req.body.contestId;
  console.log(curr_user)

  //find the id of curr_user from user schema
  const curr_user_id = await User.findOne({name : curr_user})
  const existingParticipant = await Contest.findOne({_id : contestId , participants : curr_user_id})

  console.log(existingParticipant)
  // Find the contest by ID
  const contest = await Contest.findById(contestId);
  if (contest) {
    if (!existingParticipant) {
      console.log('Inserting a user.');
      console.log(`Contest ID is ${contestId}`);
    
      try {
        const updatedContest = await Contest.findByIdAndUpdate(
          contestId,
          { $push: { participants: curr_user_id } },
          { new: true }
        );


      } catch (error) {
        console.error('Error adding participant to contest:', error);
      }
      res.json({message : 'Registered Successfully....'})
    }

   else {
      console.log('Participant already exists in the contest');
      res.json({ message : 'Participant already exists in the contest' })
    }
  } else {
    console.log('No contest found.');
    res.json({ message : 'No contest found.'});
  }

  // res.json({status : 200});
})

//returning the list of problems based on the contest
app.post("/contests_show", async (req, res) => {
  try {
    const contestId = req.body.contestId;
    const contest = await Contest.findById(contestId).populate('problems');

    console.log(contestId)

    // Access the problems array with the populated documents
    const problems = contest.problems;
    // console.log(problems)
    // console.log(`${problems[0].title} and ${problems.description}`);

    res.json({problems : problems}); // Assuming you want to send the problems as a response
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get the problem description , testcases based on the name
app.post("/contest_problem_info" , async (req , res)=>{
  const title = req.body.problem_name
  const problemInfo = await Problem.findOne({ title : title })

  // console.log(problemInfo.title);

  res.json({description : problemInfo.description , testcases : problemInfo.testCases})
  
})

//create a file in the /code directory..NOTE... the execution will not take place here but..it will be done using queues 

const producerFunc = async ()=>{

  const notificationQueue = new Queue('submission-queue', {
    connection: redisConnection
});
 
  try{
    const submissionsWithOutput = await Submission.find({ result: { $exists: false } }).limit(3);
    // console.log('THE PRODUCER PART IS ' + submissionsWithOutput)

    for (const submission of submissionsWithOutput) {
      const res = await notificationQueue.add("submission", submission, { removeOnComplete: true, removeOnFail: true });
      console.log(`Job added to queue - Job ID: ${res.id}`);
      
  }
  // await notificationQueue.obliterate();
}
catch(e){
    console.log('error is :' + e)
}
  
}

app.post("/contest_problem_code" , async (req , res) =>{
  const { v4: uuidv4 } = require('uuid');
  const ids = uuidv4();


  let { code , problem_name , curr_user } = req.body
  problem_name_for_directory = `${problem_name}-${ids}.cpp`
  console.log('--> '+ problem_name_for_directory)
  if(!code) res.json({status : 401});

else{
  const filePath = await create_file_dir(code , problem_name_for_directory);

 
  //add the mainfunction 
  let content;
  try{
  const problem = await Problem.findOne({title : problem_name})
  content = problem.mainFunc;
  console.log('main func is ...--->' + content);
  }catch(e){
    console.log('the error in getting mainfunc is sof '+ e)
  }


  fs.appendFile(`Code\\${problem_name_for_directory}`, content , (err) => {
    if (err) {
      console.error(`Error appending to the file: ${err.message}`);
    } else {
      console.log('Data appended to the file successfully.');
    }
  });
  //add this to the submission collection for it to be accessed by the worker


  console.log( problem_name , curr_user)

  // const nameId = await ContestUser.findOne({username : curr_user})
  const nameId = await User.findOne({name : curr_user})
  const problemId = await Problem.findOne({title : problem_name})

  // console.log(nameId , problemId)

  const newSubmission = new Submission({
    user : nameId,
    problem : problemId,
    code : filePath,
    // ExecuteCode : `Code\\${problem_name_for_directory}`
  })
  await Submission.insertMany(newSubmission)
  const submissionId = await newSubmission._id;

  console.log(`file path da.da.. ${filePath}`)

  producerFunc();

  // console.log(code)
  // console.log(req.body.code)
  res.json({submissionId : submissionId})
}
})

//long polling to give back the reuslt


app.post("/get_output", async (req, res) => {
  try {
    const curr_user_submission = req.body.submission_id;
    const submission = await Submission.findById(curr_user_submission);

    if (submission && submission.result !== undefined) {
      console.log('Output from API is ' + submission.result);
      res.json({ output: submission.result });
    } else {
      console.log('Result field does not exist in the collection.');
      res.status(404).json({ error: 'Result not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });