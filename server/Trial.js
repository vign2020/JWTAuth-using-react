const fun = (a , b)=>{
    return new Promise((resolve , reject)=>{
        if(a==1 ) resolve(a+b)
        else reject('this is an err')
        
    })
}

fun(1, 2)
.then(data =>{
    return data*2
}).then(data2 =>{
    console.log(data2)
}).catch(err => {
    console.log(err)
})