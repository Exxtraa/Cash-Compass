import ratelimit from "../config/upstash.js"

const ratelimiter = async(req,res,next) => {
    try {
        // In production ready here the ip should be bloced with inbuild server
        const {success} = await ratelimit.limit("my-rate-limit");

        if(!success){
            return res.status(429).json({
                message:"Too many Request, please try again later"
            });
        }
        
        next();
    } catch (error) {
        console.log("Rate limtit error",error);
        next(error);
    }
}

export default ratelimiter;