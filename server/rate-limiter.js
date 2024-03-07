const fetch = require('node-fetch');
const redis = require('./redis-connection') 

function rateLimiter ({secondsWindow , allowedHits}){
    return async function (req , res , next){
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress).slice(0 , 9);

    const requests = await redis.incr(ip)

    let ttl;
    if(requests === 1){
        await redis.expire(ip , secondsWindow );
        ttl = 60;
    }
    else{
        ttl = await redis.ttl(ip);
    }

    if(requests  > allowedHits){
        return res.status(503).json({
            response : 'error',
            callsInAminute : requests ,
            ttl 
        })
        
    }
    else{ 
        req.requests = requests 
        req.ttl = ttl
        next()
    }
    }   
}

module.exports = rateLimiter;