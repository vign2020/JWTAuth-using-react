#include<iostream>
using namespace std;

int main()
{
int ans=1;

for(int i=1;i<100;++i){
 ans*=i;
}

cout<<ans<<endl;
  return 0;
}