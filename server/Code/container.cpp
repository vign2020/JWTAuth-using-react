#include <bits/stdc++.h>
#include "69 Container With Most Water.h"

using namespace std;

int main()
{
    vector<int> h = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    vector<int> h2 = {1, 1};

    vector<int> ans;

    int resu = maxArea(h);
    ans.push_back(resu);

    for (auto it : ans)
        cout << it << " ";

    return 0;
}