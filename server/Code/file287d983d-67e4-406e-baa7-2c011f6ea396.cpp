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
    return ans;
}

int main()
{

    vector<int> nums = {2, 7, 9, 15};
    int target = 9;

    vector<int> ans = solve(nums, target);
    for (auto it : ans)
        cout << it << " ";

    return 0;
}