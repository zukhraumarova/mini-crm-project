const bcrypt = require('bcrypt');

const emailQueue = require('../queues/email_queue');

const userRepository = require('../repositories/user_repository');

const {
generateAccessToken,
generateRefreshToken
}
=
require('../utils/jwt');


const register = async(data)=>{


    const hash =
        await bcrypt.hash(
            data.password,
            10
        );


    const user =
    await userRepository.create({

        ...data,

        password: hash

    });

    const job = await emailQueue.add(

        'sendEmail',

        {

            email:user.email,

            name:user.name

        }

    );

    return{

        user,

        jobId:job.id

};

    return user;

};


const login = async(data)=>{

    const user =
        await userRepository.findByEmail(
            data.email
        );


    if(!user){

        throw new Error('Invalid credentials');

    }


    const valid =
        await bcrypt.compare(

            data.password,

            user.password

        );


    if(!valid){

        throw new Error('Invalid credentials');

    }

    return {
        accessToken:
        generateAccessToken(user),

        refreshToken:
        generateRefreshToken(user)

    };

};


module.exports = {
    register,
    login
};