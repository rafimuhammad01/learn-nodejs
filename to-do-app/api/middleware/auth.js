const jwt = require("jsonwebtoken");
const { response } = require("../../app");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const data = jwt.verify(token, process.env.JWT_KEY)
        console.log(data)
        req.userData = data
        next();
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            error : "Auth Failed"
        })
    }
}