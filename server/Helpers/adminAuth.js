const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    res.locals.toasts = req.toastr.render()
    if(req.session.isAuth){
        jwt.verify(req.session.isAuth,  process.env.JWT_SECRET_TOKEN, (err, verify) => {
            if(!err){
                req.user = verify.user;
                next();
            } else{
                res.redirect('/login');
            }
        });
    } else{
        res.redirect('/login');
    }
}

module.exports = isAuth