// const jwt = require('jsonwebtoken')

// module.exports = (req, res, next) => {
//     try{
//         // const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
//         req.userData = decoded
//         next();
    
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         })
//     }    
// };



// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decoded = jwt.verify(token, process.env.JWT_KEY);
//         req.userData = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// };

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try{
        if (!req.headers.authorization) {
            throw new Error('Authorization header is missing');
        }

    // const token =req.headers.authorization.split(" ")[1];
    const token = req.headers.authorization.split(" ")[1];
    // const decoded = jwt.verify(token, process.env.JWT_KEY);
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // req.userData = decoded;
    req.userData = decoded;

    next();
    }
    catch (error){
        console.error("Authentication error:", error);

        return res.status(401).json({
            message: 'auth faild'
        })
    }
};