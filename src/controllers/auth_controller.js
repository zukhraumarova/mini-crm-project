const authService = require('../services/auth_service');

const register = async(req,res,next)=>{

    try{
        const user = await authService.register(req.body);

        res.status(201).json(user);

    }catch(e){

        next(e);

    }
};


const login = async(req,res,next)=>{
    
    try{
        const tokens =
        await authService.login(req.body);

        res.json(tokens);

    }catch(e){

        next(e);

    }
};


module.exports={
    register,
    login
};