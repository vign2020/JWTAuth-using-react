

const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/CodeCrunch';

// Establish a connection to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
// Define schema for contests
const contestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }],
  participants: [{ type: mongoose.Schema.Types.ObjectId , ref: 'ContestUser' }],
});

// Define schema for problems
const problemSchema = new mongoose.Schema({
  
  title: { type: String, required: true },
  description: { type: String },
  testCases: [
    {
      input: { type: mongoose.Schema.Types.Mixed, required: true },
      output: { type: mongoose.Schema.Types.Mixed, required: true },
    },
  ],
  mainFunc : { type : String }

});

// Define schema for submissions
const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'ContestUser', required: true },
  problem: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  code: { type: String, required: true },
  submissionTime: { type: Date, default: Date.now },
  result: { type: mongoose.Schema.Types.Mixed }, // You can store the result of the submission here (e.g., Accepted, Wrong Answer, etc.)
  executionTime : {type : Number}
});

// Define schema for users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  // email: { type: String, required: true },
  // Add other user-related fields as needed
});

// Create models based on the schemas
const Contest = mongoose.model('Contest', contestSchema);
const Problem = mongoose.model('Problem', problemSchema);
const Submission = mongoose.model('Submission', submissionSchema);
const ContestUser = mongoose.model('ContestUser', userSchema);


// (async function init(){
//   try{
   
//   const newProblem = await Problem({
//     title : 'container',
//     description : `You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

//     Find two lines that together with the x-axis form a container, such that the container contains the most water.
    
//     Return the maximum amount of water a container can store.
    
//     Notice that you may not slant the container.`,
    
//   mainFunc : `#include "container.h"
//   #include <bits/stdc++.h>
//   using namespace std;
  
//   int container_expected(vector<int> &height)
//   {
  
//       int i = 0, j = height.size() - 1;
//       int maxi = -1, temp = 0;
//       while (i < j)
//       {
//           temp = (j - i) * min(height[i], height[j]);
//           if (maxi < temp)
//               maxi = temp;
//           if (height[i] > height[j])
//               j--;
//           else
//               i++;
//       }
//       return maxi;
//   }
//   int main()
//   {
//       // testcases
//       vector<int> height{1, 1};
//       vector<int> height2{1, 8, 6, 2, 5, 4, 8, 3, 7};
  
//       int no_of_tests = 2;
  
//       vector<vector<int>> heights;
//       heights.push_back(height);
//       heights.push_back(height2);
  
//       bool flag = true;
  
//       for (int i = 0; i < no_of_tests; ++i)
//       {
//           vector<int> vec = heights[i];
//           int ans = solve(vec);
//           int exp = container_expected(vec);
  
//           if (ans != exp)
//           {
//               flag = false;
//               break;
//           }
//       }
  
//       if (flag)
//           cout << "correct" << endl;
//       else
//           cout << "wrong" << endl;
  
//       // cout << solve(height2) << endl;
//   }`
//   })

//     await newProblem.save();

//     const contest = await Contest.findById("65dec26dcd901f0635938142");
//     if(contest) console.log('exists >>')
//     contest.problems.push(newProblem._id)
//   await contest.save();

// }catch(e){
//   console.log(e)
// }finally {
//           mongoose.connection.close(); // Fix the typo in this line
//       }

// })();







// (async function init(){
//     try{
//         const newContest = new Contest({
//             title: 'Weekly contest 2 ',
//             description: 'A programming contest for developers',
//             startTime: new Date('2024-02-28T08:00:00Z'),
//             endTime: new Date('2024-02-29T23:59:59Z'),
//             problems: [], // You can add problem references here if needed
//             participants: [], // You can add user references here if needed
//           });

//           await Contest.insertMany(newContest);
        
//     } catch(e) {
//         console.log(e);
//     } finally {
//         mongoose.connection.close(); // Fix the typo in this line
//     }
// })();


  
module.exports = { Contest, Problem, Submission, ContestUser };
// module.exports =  Contest
