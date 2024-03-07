const Docker = require('dockerode');
const express = require('express');
const { exec } = require('child_process');
const cors = require("cors")

const app = express();
app.use(cors());
const port = 3000;

const docker = new Docker();

app.use(express.json());

const execute_code = async (execCommand , container)=>{
    const Compilepromise = new Promise((resolve , reject) => {


        exec(execCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing code: ${error.message}`);
            
            // res.status(500).json({ error: 'Code execution failed' });
          } else {
            console.log('Code execution successful');
            resolve();
          //   res.status(200).json({ result: stdout });
          }
        
        });
       
        })
        await Compilepromise;
      
        const runPromise = new Promise((resolve , reject) =>{
      
          exec('.\\dummy', (error, stdout, stderr) => {
              if (error) {
                console.error(`Error executing code: ${error.message}`);
                
                // res.status(500).json({ error: 'Code execution failed' });
              } else {
                console.log('Code execution successful');
                resolve(stdout);
                // res.status(200).json({ result: stdout });
              }
            
            });
         
      
          // Remove the container after execution
          container.remove({ force: true }, (removeError) => {
              if (removeError) {
                console.error(`Error removing container: ${removeError.message}`);
              } else {
                console.log('Container removed');
              }
            });
      
                
        })
        return runPromise;
}

app.post('/execute', async (req, res) => {
  const code = req.body.code;
  console.log(code)

  // Generate a unique container name
  const containerName = `code-execution-${Date.now()}`;
  // Create a new container
  const container = await docker.createContainer({
    Image: 'exec-test', // Replace with your Docker image
    name: containerName,
  });
  // Start the container
  await container.start();
  // Execute the user's code inside the container
  const execCommand = `g++ dummy.cpp -o dummy"`;
let op;
  try{
    op=await execute_code(execCommand , container );
    console.log(op)
  }
  catch(e){
    console.log(e)
  }

  

});

app.listen(5000, () => {
  console.log(`Server running at http://localhost:${5000}`);
});
