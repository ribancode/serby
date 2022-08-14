const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    if(req.headers.authorization){
        var token = req.headers.authorization.split(' ');
        jwt.verify(token[1], process.env.JWT_SECRET_TOKEN, (err, verify) => {
            if(!err){
                req.user = verify.user;
                next();
            } else{
                return res.send({ status:400, Success:false, message:req.t("INVALID_TOKEN") })
            }
        });
    } else{
        return res.send({ status:401, Success:false, message:req.t("NOT_AUTHORIZED") })
    }
}

module.exports = auth