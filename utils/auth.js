require('dotenv').config();
const jwt = require('jsonwebtoken')
class Auth {

    // function for generating token
    async generateToken(req, res, email){
        const user_email = email;
        const user = {user_email: user_email}
        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return accessToken
        // res.json({accessToken: accessToken});
    }


    //function for verifying token
    async authenticateUser(req, res, next){
        const gettoken = req.headers['x-auth-token'];
        if(!gettoken){
            return res.status(400).json({error: "Token not found"});
        }
        try{
            let user_token = await jwt.verify(gettoken, process.env.ACCESS_TOKEN_SECRET)
            req.user_token = user_token.user_email;
            next();
        }catch(err){
            return res.status(400).json({error: "Access Denied"});

        }


    }


}

module.exports = new Auth();
