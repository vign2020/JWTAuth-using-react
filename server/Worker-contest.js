const { Worker } = require("bullmq");
const redisConnection = require('./redis-connection');
const { exec } = require('child_process');
const { Contest, Problem, Submission, ContestUser } = require('./Contestdb');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require("path");




mongoose.connect('mongodb://localhost/CodeCrunch', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const execute_code = async (filePath , exe_file_path) => {
    const fileName = path.basename(filePath, path.extname(filePath));
    console.log(`fileName is ${fileName}`)

    const cppFilePath = path.join(__dirname, 'Code', filePath);
    const exeFilePath = path.join(__dirname, 'Code', exe_file_path);



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

    const create_file_dir = async (code_path) =>{
      const filePath = `${code_path}.exe`
      // console.log(filePath)
      await fs.writeFileSync(filePath, '');
  
      console.log('file Path  is ...' + filePath)
      return filePath
    }


//the mainfunc i.e container.cpp
    async function getMainFunc(submissionId) {
        try {
          // Fetch the submission with the provided submissionId
          const submission = await Submission.findById(submissionId).populate('problem');
      
          if (submission) {
            // Access the problem from the populated field
            const problem = submission.problem;
            // console.log('PROBLEM IS' + problem)
      
            if (problem) {
              // Access the mainFunc from the problem schema
              const mainFunc = problem.mainFunc;
              // console.log('Main Function:', mainFunc);
              return mainFunc;
            } else {
              console.log('Submission has no associated problem.');
            }
          } else {
            console.log('Submission not found.');
          }
        } catch (error) {
          console.error('Error retrieving mainFunc:', error);
        }
      }



const worker = new Worker("submission-queue", async (job) => {
  //create an empty exe file and run the ' code ' field from job.data
        const { _id, user, problem, code, submissionTime } = job.data;

        const exe_file_path = await create_file_dir(code);

    
        const start =Date.now()
        let op;
        let status;
    
        try{
          console.log('inside the second try block of the code')
          //  op = await execute_code(filePath , exe_file_path)

          //remove the path from code and exe file 
          const newPathcode = code.replace(/^Code\//, '');
          const exePathcode = exe_file_path.replace(/^Code\//, '');
          const exePathcode2 = exePathcode.replace(/\.cpp\.exe$/, '');
          
          console.log('filepath is ?????.. ' + exePathcode2 + 'and the container is ?????' + newPathcode)
          op = await execute_code(newPathcode  , exePathcode2)

         
           status = true
        }catch(e){
          op = e.message || e.name || e.stack || e;
           console.log("ErroR is....++++0000 " + e.message || e.name || e.stack || e);
          status = 'fail'
        }
         
          const executionTime =  Date.now() - start;


          await Submission.findByIdAndUpdate(_id ,  { $set: { result: op , executionTime : executionTime} })
          // console.log('OUTPUT IS...' + op)
        console.log(`Processing complete for job with ID from WORKER 1: ${job.id}`);
    },
    {
        connection: redisConnection,
        concurrency: 1
    });



    
// const worker2 = new Worker("submission-queue", async (job) => {
//   const { _id, user, problem, code, submissionTime } = job.data;

//   let Problem_name_dir;

//   try {
    

//       // Fetch the submission with the provided submissionId
//       const submission = await Submission.findById(_id).populate('problem');
  
//       if (submission) {
//         // Access the problem from the populated field
//         const problem = submission.problem;
//         // console.log('PROBLEM IS' + problem)
  
//         if (problem) {
//           // Access the mainFunc from the problem schema
//           const title = problem.title;
//           // console.log('Main Function:', title);
//           Problem_name_dir = title+'.cpp'

//         } else {
//           console.log('Submission has no associated problem.');
//         }
//       } else {
//         console.log('Submission not found.');
//       }
//     } catch (error) {
//       console.error('Error retrieving mainFunc:', error);
//     }

//   console.log('Id is ...' + _id)

//   const code_exec = await getMainFunc(_id);
//   const {filePath , exe_file_path} = await create_file_dir(code_exec , Problem_name_dir);

//   console.log('FilePath is .... ' + filePath + 'exe is ' + exe_file_path)
//   // const exe_file = await create_file_dir(code_exec , Problem_name_dir).exe_file;

//   // console.log('execFile is .... ' + exe_file)
//   // console.log('filePath for execute code is' + filePath)
//   const start =Date.now()
//   let op;
//   let status;

//   try{
//     console.log('inside the second try block of the code')
//      op = await execute_code(filePath , exe_file_path)

   
//      status = true
//   }catch(e){
//     op = e.message || e.name || e.stack || e;
//      console.log("ErroR is....++++0000 " + e.message || e.name || e.stack || e);
//     status = 'fail'
//   }
   
//     const executionTime =  Date.now() - start;


//     await Submission.findByIdAndUpdate(_id ,  { $set: { result: op , executionTime : executionTime} })
//     // console.log('OUTPUT IS...' + op)
//   console.log(`Processing complete for job with ID from WORKER 2: ${job.id}`);
// },
// {
//   connection: redisConnection,
//   concurrency: 1
// });




// const worker2 = new Worker("submission-queue", async (job) => {
//       const { _id, user, problem, code, submissionTime } = job.data;
  
//       let Problem_name_dir;
  
//       try {
//           // Fetch the submission with the provided submissionId
//           const submission = await Submission.findById(_id).populate('problem');
      
//           if (submission) {
//             // Access the problem from the populated field
//             const problem = submission.problem;
//             // console.log('PROBLEM IS' + problem)
      
//             if (problem) {
//               // Access the mainFunc from the problem schema
//               const title = problem.title;
//               // console.log('Main Function:', title);
//               Problem_name_dir = title+'.cpp'
  
//             } else {
//               console.log('Submission has no associated problem.');
//             }
//           } else {
//             console.log('Submission not found.');
//           }
//         } catch (error) {
//           console.error('Error retrieving mainFunc:', error);
//         }
  
//       // console.log('Id is ...' + _id)
  
//       const code_exec = await getMainFunc(_id);
     
//       // console.log('filePath for execute code is FROM WORKER2' + filePath)

//       const filePath = await create_file_dir(code_exec , Problem_name_dir).filePath;

//       console.log('FilePath is .... ' + filePath)
//       const exe_file = await create_file_dir(code_exec , Problem_name_dir).exe_file;

//       console.log('execFile is .... ' + exe_file)
      
  
//       const start =Date.now()
//       let op;
//       let status;
  
//       try{
//         // console.log('inside the second try block of the code FROM WORKER2')
//          op = await execute_code(filePath)
       
//          status = true
//       }catch(e){
//         op = e.message || e.name || e.stack || e;
//          console.log("ErroR is....++++0000 " + e.message || e.name || e.stack || e);
//         status = 'fail'
//       }
       
//         const executionTime =  Date.now() - start;
//         // console.log('EXECUTION TIME IS .... '+ executionTime)
        

//         await Submission.findByIdAndUpdate(_id ,  { $set: { result: op , executionTime : executionTime} })       
     
//         // console.log('OUTPUT IS FROM WORKER2 ...' + op)
//       console.log(`Processing complete for job with ID FROM WORKER 2 : ${job.id}`);
//   },
//   {
//       connection: redisConnection,
//       concurrency: 1
//   });
  

//   const worker3 = new Worker("submission-queue", async (job) => {
//     const { _id, user, problem, code, submissionTime } = job.data;

//     let Problem_name_dir;

//     try {
//         // Fetch the submission with the provided submissionId
//         const submission = await Submission.findById(_id).populate('problem');
    
//         if (submission) {
//           // Access the problem from the populated field
//           const problem = submission.problem;
//           // console.log('PROBLEM IS' + problem)
    
//           if (problem) {
//             // Access the mainFunc from the problem schema
//             const title = problem.title;
//             // console.log('Main Function:', title);
//             Problem_name_dir = title+'.cpp'

//           } else {
//             console.log('Submission has no associated problem.');
//           }
//         } else {
//           console.log('Submission not found.');
//         }
//       } catch (error) {
//         console.error('Error retrieving mainFunc:', error);
//       }

//     // console.log('Id is ...' + _id)

//     const code_exec = await getMainFunc(_id);
    
//     const filePath = await create_file_dir(code_exec , Problem_name_dir).filePath;

//     console.log('FilePath is .... ' + filePath)
//     const exe_file = await create_file_dir(code_exec , Problem_name_dir).exe_file;

//     console.log('execFile is .... ' + exe_file)
    

//     const start =Date.now()
//     let op;
//     let status;

//     try{
//       // console.log('inside the second try block of the code FROM WORKER2')
//        op = await execute_code(filePath)
     
//        status = true
//     }catch(e){
//       op = e.message || e.name || e.stack || e;
//        console.log("ErroR is....++++0000 " + e.message || e.name || e.stack || e);
//       status = 'fail'
//     }
     
//       const executionTime =  Date.now() - start;

//       await Submission.findByIdAndUpdate(_id ,  { $set: { result: op , executionTime : executionTime} })   
//       // console.log('OUTPUT IS FROM WORKER2 ...' + op)
//     console.log(`Processing complete for job with ID FROM WORKER 3 : ${job.id}`);
// },
// {
//     connection: redisConnection,
//     concurrency: 1
// });


    


