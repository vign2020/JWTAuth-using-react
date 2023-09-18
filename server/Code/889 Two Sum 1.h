#include <bits/stdc++.h>
using namespace std;

vector<int> solve(vector<int> &nums, int target)
{
    vector<int> ans;

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
    ans.push_back(1234);
    return ans;
}