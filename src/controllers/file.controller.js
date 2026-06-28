const upload = (req, res) => {

    res.json({

        success: true,

        filename: req.file.filename,

        url:
            `http://localhost:3000/uploads/${req.file.filename}`

    });

};

module.exports = {

    upload

};