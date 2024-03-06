const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const Person = require('./Person')
const fs = require('fs')
const path = require("path");

const { stderr, stdout } = require("process");
const { exec } = require('child_process');

const app = express();

// Middleware to parse JSON in the request body
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set('view engine' , 'ejs')
// Secret key for JWT (should be stored securely)


mongoose.connect('mongodb://0.0.0.0:27017/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

//creating the exe file 
  const create_file_dir = async (code_path) =>{
    const filePath = `Code/${code_path}.exe`
    // console.log(filePath)
    await fs.writeFileSync(filePath, '');

    console.log('file Path  is ...' + filePath)
    return filePath
  }

  
const execute_code = async (filePath , exe_file_path) => {

 

// Get the full paths
const cppFilePath = path.join(__dirname, 'Code', filePath);
const exeFilePath = path.join(__dirname, 'Code', exe_file_path);

  
  // const fileName = path.basename(filePath, path.extname(filePath));
  // console.log(`fileName is ${fileName}`)


    // const cppFileName = `Code\\${fileName}.cpp`;
    // const cppFileName = filePath;
    const cppFileName = filePath

    console.log(' filepath is ' + cppFileName)
  
    const compilePromise = new Promise((resolve, reject) => {
      exec(`g++ ${cppFilePath} -o ${exeFilePath}`, (compileError, compileStdout, compileStderr) => {
        if (compileError) {
          console.log('Compilation error:', compileError);
          reject(new Error('Compilation Error... Please try again. ' + compileError));
        } else {
          resolve();
        }
      });
    });
  
    await compilePromise; // Wait for the compilation to complete
  
    const runPromise = new Promise((resolve, reject) => {
      exec(`${exeFilePath}`, (runError, runStdout, runStderr) => {
        if (runError) {
          console.log('Execution error:', runError);
          reject(runError.error);
          // reject('Runtime Error... Please try again..')
          
          // return runError;
        }
        // console.log('Execution output:', runStdout);
        resolve(runStdout);
      });
    });
  
    return runPromise; // Return the output of execution
  };


  
  (async function init(){
    const exe_file_path = await create_file_dir("container-8083e93f-df9c-49b7-8f99-905dcc703d24")
    console.log(exe_file_path)
    const op = await execute_code('container.cpp' , "container-8083e93f-df9c-49b7-8f99-905dcc703d24")
    console.log('output is ' + op)
  })();
  


app.listen(5000, () => {
  console.log('Server is running on port 3000');
});
