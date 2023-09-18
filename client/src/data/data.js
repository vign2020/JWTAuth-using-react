

const problem_comp=[
    {
        heading:"LeetCode's interview Crash Course:",
        text:"System design for interviews and beyond"
    }, 
    {
        heading:"LeetCode's interview Crash Course:",
        text:"DataStructures and algorithms"
    },
    {
        heading:"Top interview  questions",
        text:"Crack interviews with our handpicked DSA problems"
    }

];
const unique_tags=[
    {
        tag:"Array",
    },
    {
        tag:"String",
    },
    {
        tag:"HashTables",
    },
    {
        tag:"DynamicProgramming",
    },
    {
        tag:'Math'
    },
    {
        tag:'Graphs'
    },
    {
        tag:'Trees'
    },
    {
        tag:'Binary Search'
    },
    {
        tag:'Sorting'
    },
    {
        tag:'Prefix Sum'
    },
    {
        tag:'Hashing'
    },
    {
        tag:'Binary Search Trees'
    },
    {
        tag:'Database'
    },
    {
        tag:'Stacks'
    },

]

const problem_tags=[
    {
      "tag": "Array",
      "name": "889 Two Sum 1",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "testcase" : [
        {
          array:[2,7,11,15],
          target : 9,
          output : [0,1]
        },
        {
          array:[3,2,4],
          target : 9,
          output : [1,2]
        },
        {
          array:[3,4],
          target:6,
          output : [0 , 1]
        },
    ],
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps",
      "code" : `#include <bits/stdc++.h>
      using namespace std;
      
      int main()
      {
          vector<int> ans;
      
          vector<int> nums{2, 7, 11, 15};
          int target = 9;
      
          for (int i = 0; i < nums.size(); ++i)
          {
              for (int j = i + 1; j < nums.size(); ++j)
              {
                  if (nums[i] + nums[j] == target)
                  {
                      ans.push_back(i);
                      ans.push_back(j);
                      break;
                  }
              }
          }
          for (auto it : ans)
              cout << it << " ";
          return 0;
      }`,
      "call":'twosum.cpp',
      "create":'889 Two Sum 1.h'
    },
    {
      "tag": "Array",
      "name": "69 Container With Most Water",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "testcase" : [
        {
          array: [1,8,6,2,5,4,8,3,7],
          output: 49 
                
        },
        {
          array: [1,1],
          output: 1
        }
        
      ],
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na",
      "call":'container.cpp',
      "create":'69 Container With Most Water'
    },
    {
      "tag": "Array",
      "name": "337 3Sum",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Array",
      "name": "753 3Sum Closest 1",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Array",
      "name": "725 4Sum",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "easy",
      "acceptance": 89.3,
      "list": [
        "Favourites",
        "Biweekly",
        "Long"
      ],
      "status": "fs"
    },
    {
      "tag": "Array",
      "name": "15 Remove Duplicates from Sorted Array",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 89.3,
      "list": [
        "Mid",
        "Long"
      ],
      "status": "fs"
    },
    {
      "tag": "Array",
      "name": "989 Remove Element",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 79.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Array",
      "name": "208 Next Permutation",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "easy",
      "acceptance": 23.3,
      "list": [
        "Mid",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "String",
      "name": "196 Longest Substring Without Repeating Characters",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 13.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "String",
      "name": "236 Longest Palindromic Substrings",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 66.7,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "String",
      "name": "525 Zigzag Conversion",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 49.3,
      "list": [
        "Mid",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "String",
      "name": "316 String to Integer (atoi)",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 19.3,
      "list": [
        "Favourites",
        "Mid"
      ],
      "status": "na"
    },
    {
      "tag": "String",
      "name": "937 Roman to Integer",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Favourites",
        "Long",
        "Mid"
      ],
      "status": "fs"
    },
    {
      "tag": "String",
      "name": "771 Longest Valid Parentheses",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "easy",
      "acceptance": 89.3,
      "list": [
        "Long",
        "Mid"
      ],
      "status": "ps"
    },
    {
      "tag": "HashTables",
      "name": "645 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "HashTables",
      "name": "857 Longest Substring Without Repeating Characters",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 13.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "HashTables",
      "name": "78 Longest Palindromic Substrings",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 66.7,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "HashTables",
      "name": "398 Zigzag Conversion",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 49.3,
      "list": [
        "Mid",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "HashTables",
      "name": "345 String to Integer (atoi)",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 19.3,
      "list": [
        "Favourites",
        "Mid"
      ],
      "status": "na"
    },
    {
      "tag": "HashTables",
      "name": "380 Roman to Integer",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Favourites",
        "Long",
        "Mid"
      ],
      "status": "fs"
    },
    {
      "tag": "HashTables",
      "name": "113 Longest Valid Parentheses",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "easy",
      "acceptance": 89.3,
      "list": [
        "Long",
        "Mid"
      ],
      "status": "ps"
    },
    {
      "tag": "HashTables",
      "name": "185 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "DynamicProgramming",
      "name": "616 Ninja's Training",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps"
    },
    {
      "tag": "DynamicProgramming",
      "name": "656 Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "DynamicProgramming",
      "name": "770 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "DynamicProgramming",
      "name": "184 3Sum Closest 3",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Math",
      "name": "329 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Math",
      "name": "847 Ninja's Training",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps"
    },
    {
      "tag": "Math",
      "name": "630 Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "Math",
      "name": "958 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Math",
      "name": "389 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Graphs",
      "name": "153 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Graphs",
      "name": "723  1234 . Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Graphs",
      "name": "418 Ninja's Training",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps"
    },
    {
      "tag": "Graphs",
      "name": "629 4432 . Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "Graphs",
      "name": "818  1234. Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Graphs",
      "name": "754  01 . Floyd Warshall's ",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "DynamicProgramming",
      "name": "274  12. Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "DynamicProgramming",
      "name": "225 1543 . Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Trees",
      "name": "155 1124 . 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Trees",
      "name": "967 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Trees",
      "name": "858 Ninja's Training",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps"
    },
    {
      "tag": "Trees",
      "name": "612 Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "Trees",
      "name": "758 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Trees",
      "name": "44 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Trees",
      "name": "896 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Trees",
      "name": "439 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Trees",
      "name": "760 Ninja's Training",
      "problem_desc": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.You may assume that each input would have exactly one solution, and you may not use the same element twice.You can return the answer in any order",
      "diff": "easy",
      "acceptance": 33.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "ps"
    },
    {
      "tag": "Trees",
      "name": "683 Fibonacci series",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 43.3,
      "list": [
        "Favourites",
        "Weekly"
      ],
      "status": "na"
    },
    {
      "tag": "Trees",
      "name": "950  9 . Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Trees",
      "name": "21  2 . Floyd Warshall's ",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Binary Search",
      "name": "753  45 . Zigzag Conversion",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 49.3,
      "list": [
        "Mid",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Binary Search",
      "name": "263  23 . String to Integer (atoi)",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 19.3,
      "list": [
        "Favourites",
        "Mid"
      ],
      "status": "na"
    },
    {
      "tag": "Binary Search",
      "name": "417 18 . Roman to Integer",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Favourites",
        "Long",
        "Mid"
      ],
      "status": "fs"
    },
    {
      "tag": "Binary Search",
      "name": "4 15 . Longest Valid Parentheses",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "easy",
      "acceptance": 89.3,
      "list": [
        "Long",
        "Mid"
      ],
      "status": "ps"
    },
    {
      "tag": "Sorting",
      "name": "838 12 . Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Sorting",
      "name": "708 112 . 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Sorting",
      "name": "433  8 . 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Sorting",
      "name": "880  7. Count and Say ",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Prefix Sum",
      "name": "362 Cops and Robbers 4",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Prefix Sum",
      "name": "111 3Sum Closest  7",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Hashing",
      "name": "83 3Sum Closest   5",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Hashing",
      "name": "840 Count and Say 9",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Hashing",
      "name": "309 Cops and Robbers 3",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Hashing",
      "name": "420 3Sum Closest 6",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Hashing",
      "name": "205 Count and Say 1",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Hashing",
      "name": "490 Cops and Robbers 2",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Hashing",
      "name": "447 3Sum Closest",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Hashing",
      "name": "422 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Hashing",
      "name": "755 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Hashing",
      "name": "269 3Sum Closest 2",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Stacks",
      "name": "657 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Stacks",
      "name": "562 3Sum Closest 3",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Stacks",
      "name": "739 Count and Say",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Database",
      "name": "415 Cops and Robbers",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Database",
      "name": "973 3Sum Closest 5",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    },
    {
      "tag": "Binary Search Trees",
      "name": "906 Count and Say 2",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "medium",
      "acceptance": 11.3,
      "list": [
        "Biweekly"
      ],
      "status": "fs"
    },
    {
      "tag": "Binary Search Trees",
      "name": "372 Cops and Robbers 1",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 39.3,
      "list": [
        "Favourites",
        "Biweekly"
      ],
      "status": "na"
    },
    {
      "tag": "Binary Search Trees",
      "name": "591 3Sum Closest 4",
      "problem_desc": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur nesciunt, ipsum laboriosam nostrum perspiciatis fugit a veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla itaque. veritatis aut dignissimos libero deserunt illo adipisci placeat! Earum asperiores velit fuga suscipit ipsum, nulla",
      "diff": "hard",
      "acceptance": 29.3,
      "list": [
        "Weekly",
        "Long"
      ],
      "status": "ps"
    }
  ]

const study_plan=[
    {
        heading:'50 days of JS',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    {
        heading:'CodeCrunch 75',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    
    {
        heading:'Summer hiring challenge',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    
    {
        heading:'Grand contest',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    
    {
        heading:'30 days of c++',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    
    {
        heading:'Learn python with John Doe',
        content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ad nobis, voluptatum corporis vitae blanditiis quas ex necessitatibus ipsam placeat ipsa alias eaque?"
    },
    
    

]


 // Generate a random number between 1 and 1000


export default [problem_comp,problem_tags,unique_tags , study_plan];