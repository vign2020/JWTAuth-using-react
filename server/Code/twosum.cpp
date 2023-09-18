#include <bits/stdc++.h>
#include "889 Two Sum 1.h"

using namespace std;

int main()
{

    vector<int> nums = {2, 7, 11, 15};
    vector<int> nums2 = {3, 2, 4};
    vector<int> nums3 = {3, 3};

    int target = 9;
    int target2 = 6;
    int target3 = 6;

    vector<int> ans = solve(nums, target);
    for (auto it : ans)
        cout << it << " ";

    return 0;
}