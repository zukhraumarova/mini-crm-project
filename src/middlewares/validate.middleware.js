const validate = (schema) => {

    return (req, res, next) => {

        try {

            schema.parse(req.body);

            next();

        } catch (err) {


            console.log('VALIDATION ERROR:');
            console.log(err.issues);


            res.status(400).json({

                success:false,

                errors: err.issues

            });

        }

    };

};


module.exports = validate;