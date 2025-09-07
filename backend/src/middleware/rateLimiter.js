
import ratelimit from "../config/upstash.js"

const rateLimiter = async (req,res,next) => {
     try{
        const key = req.user?._id?.toString() || req.ip;
        const {success} = await ratelimit.limit(key)    // it should be according to a specific user by userid

        if(!success){
            return res.status(429).json({
                message:"Too many requests, please try again later"
            })
        }
        next();
     } catch (error){
        console.log("Rate limit error", error)
        next(error);
     }


    
}

export default rateLimiter