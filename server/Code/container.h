#include <bits/stdc++.h>
using namespace std;

int solve(vector<int> &height)
{
    int i = 0, j = height.size() - 1;
    int maxi = -1, temp = 0;
    while (i < j)
    {
        temp = (j - i) * min(height[i], height[j]);
               if (maxi < temp) maxi = temp;
        if (height[i] > height[j])
            j--;
        else
            i++;
    }
    return maxi;
}