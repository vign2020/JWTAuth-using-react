#include "container.h"
  #include <bits/stdc++.h>
  using namespace std;
  
  int container_expected(vector<int> &height)
  {
  
      int i = 0, j = height.size() - 1;
      int maxi = -1, temp = 0;
      while (i < j)
      {
          temp = (j - i) * min(height[i], height[j]);
          if (maxi < temp)
              maxi = temp;
          if (height[i] > height[j])
              j--;
          else
              i++;
      }
      return maxi;
  }
  int main()
  {
      // testcases
      vector<int> height{1, 1};
      vector<int> height2{1, 8, 6, 2, 5, 4, 8, 3, 7};
  
      int no_of_tests = 2;
  
      vector<vector<int>> heights;
      heights.push_back(height);
      heights.push_back(height2);
  
      bool flag = true;
  
      for (int i = 0; i < no_of_tests; ++i)
      {
          vector<int> vec = heights[i];
          int ans = solve(vec);
          int exp = container_expected(vec);
  
          if (ans != exp)
          {
              flag = false;
              break;
          }
      }
  
      if (flag)
          cout << "correct" << endl;
      else
          cout << "wrong" << endl;
  
      // cout << solve(height2) << endl;
  }