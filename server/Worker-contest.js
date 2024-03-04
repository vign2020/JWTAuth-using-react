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


      const cppFileName = `Code\\${fileName}.cpp`;
      // const cppFileName = filePath;

      console.log(' filepath is ' + cppFileName)
    
      const compilePromise = new Promise((resolve, reject) => {
        exec(`g++ ${cppFileName} -o Code\\${exe_file_path}`, (compileError, compileStdout, compileStderr) => {
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
        exec(`.\\Code\\${exe_file_path}`, (runError, runStdout, runStderr) => {
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
    const create_file_dir = async (code , prob_name)=>{
        // CODE TO CREATE DIRECTORY 
      const directoryName = 'Code';
    //   const uniqueId = uuidv4();// Replace this with the actual method to generate a unique ID
      // prob_name = prob_name.replace(/\s+/g, '')
      const { v4: uuidv4 } = require('uuid');
      const ids = uuidv4();

      let fileName = `${prob_name}`;
      const exe_file = `${fileName}-${ids}.exe`

      console.log(exe_file)

     
          if (code === undefined) return res.status(400).json({ msg: 'No code' });
          if (!fs.existsSync(directoryName)) fs.mkdirSync(directoryName);
    
          const filePath = `${directoryName}/${fileName}`
          const exe_file_path = `${directoryName}/${exe_file}`
          // console.log(filePath)
          await fs.writeFileSync(filePath, code);
          await fs.writeFileSync(exe_file_path , '');

    
          return {filePath , exe_file}
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
        const { _id, user, problem, code, submissionTime } = job.data;
    
        let Problem_name_dir;
    
        try {
          

            // Fetch the submission with the provided submissionId
            const submission = await Submission.findById(_id).populate('problem');
        
            if (submission) {
              // Access the problem from the populated field
              const problem = submission.problem;
              // console.log('PROBLEM IS' + problem)
        
              if (problem) {
                // Access the mainFunc from the problem schema
                const title = problem.title;
                // console.log('Main Function:', title);
                Problem_name_dir = title+'.cpp'
    
              } else {
                console.log('Submission has no associated problem.');
              }
            } else {
              console.log('Submission not found.');
            }
          } catch (error) {
            console.error('Error retrieving mainFunc:', error);
          }
    
        console.log('Id is ...' + _id)
    
        const code_exec = await getMainFunc(_id);
        const {filePath , exe_file_path} = await create_file_dir(code_exec , Problem_name_dir);

        console.log('FilePath is .... ' + filePath + 'exe is ' + exe_file_path)
        // const exe_file = await create_file_dir(code_exec , Problem_name_dir).exe_file;

        // console.log('execFile is .... ' + exe_file)
        // console.log('filePath for execute code is' + filePath)
        const start =Date.now()
        let op;
        let status;
    
        try{
          console.log('inside the second try block of the code')
           op = await execute_code(filePath , exe_file_path)

         
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


    


