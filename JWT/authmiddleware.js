
const jwt= require('jsonwebtoken');
JWT_SECRET= "123456"
function authmiddleware(req, res, next) {
    const authheader= req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer')){
        return res.status(400).json({
            msg: "Wrong Token."
        })
    }
    const token = authheader.split(' ')[1];

    try {
        const decoded= jwt.verify(token, JWT_SECRET);
        if(decoded.userId){
            req.userId= decoded.userId
            req.firstName= decoded.firstName
            next()
        }else{
            return res.status(400).json({
                msg: "Authorization error"
            })
        }
        
    } catch (error) {
        return res.status(400).json({
            error
        })
    }
}

module.exports= authmiddleware;