const validateRegister = (req, res, next) => {

    const { name, email, password } = req.body;

    if (!name){
        return res.status(400).json({
            message: "Name is required"
        });
    }

    if (!email){
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (!password){
        return res.status(400).json({
            message: "Password is required"
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {

        return res.status(400).json({
            message: 'Invalid email format'
        });

    }

    if (password.length < 5){
        return res.status(400).json({
            message: 'Password must be longer than 5 symbols'
        });
    }

    next();


};

const validateLogin = (req, res, next) => {

    const {email, password} = req.body;

    if (!email){
        return res.status(400).json({
            message: "Email is required"
        });
    }

    if (!password){
        return res.status(400).json({
            message: "Password is required"
        });
    }

    next();
};

module.exports = 
{
    validateRegister,
    validateLogin
};