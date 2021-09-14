require('dotenv').config();
const jwt = require('jsonwebtoken')
const Users = require('../model/userModel');

let user_id;

class Auth {
    
    // function for generating token
    async generateToken(req, res, email){
        const user_id = email;
        const user = {user_id: user_id}
        const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        return accessToken
        // res.json({accessToken: accessToken});
    }


    //function for verifying token
    async authenticateUser(req, res, next){
        let user_token
      
        const gettoken = req.headers['x-auth-token'];
        if(gettoken == null){
            return res.status(400).json({error: "Please Login to get Access Token"});
        }
        else{
        try{
            user_token = await jwt.verify(gettoken, process.env.ACCESS_TOKEN_SECRET)
            req.user_token = user_token.user_id;

            next();
            // console.log(user_token.user_id)
            // user_tkn_id = user_token.user_id
                // var TOKEN = JSON.parse(localStorage.getItem("TOKEN"));
                // let newToke={
                // }
                // newToke._id = user_tkn_id
                // if(TOKEN != null){
                //     TOKEN.push(newToke);
                // }
                // else{
                //     TOKEN = [newToke];
                // }
                // localStorage.setItem("TOKEN", JSON.stringify(TOKEN));
                // next();
            //  next();
        }catch(err){
            return res.status(400).json({error: "Access Denied"});

        }}



    }
    async getTokenId(data){
        let user_tkn_id

        try{
        const gettoken1 = data;
        // console.log(gettoken1)
            let user_token1 = await jwt.verify(gettoken1, process.env.ACCESS_TOKEN_SECRET)
            user_tkn_id = user_token1.user_id
            return user_tkn_id;
        }catch(err){
            

        }
    }

        async getUserID(req){
            let user_id1
            let user_token12 = await jwt.verify(req.headers['x-auth-token'], process.env.ACCESS_TOKEN_SECRET)
            user_id1 = user_token12.user_id
            console.log("user "+user_id1)
           
            return user_id1;
        }
    


}
// module.exports.user_tkn_id;
module.exports = new Auth();
