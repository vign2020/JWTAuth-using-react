
#include <bits/stdc++.h>
using namespace std;

int solve(vector<int> &height)
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
  int exp(vector<int> &height)
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
    vector<int> ans;

    heights.push_back(height);
    heights.push_back(height2);

    bool flag = true;
    cout << "Your Output"
         << " : ";
    for (int i = 0; i < no_of_tests; ++i)
    {
        vector<int> vec = heights[i];

        cout << " " << solve(vec) << " ";
    }
    cout << endl ;
    cout << "Expected Output "
         << " : ";
    for (int i = 0; i < no_of_tests; ++i)
    {
        vector<int> vec = heights[i];

        cout << " " << exp(vec) << " ";
    }
    cout << endl ; 
    return 0;
}

 