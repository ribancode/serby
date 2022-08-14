const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get user profile API 
*/
module.exports.profile = async (req, res) => {
    try{
        mysqlConn.query('SELECT id, firstname, username, email, phone, password, created_at, updated_at FROM users WHERE id=(?) AND role = "user" AND deleted_at IS NULL', [req.user.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, Success:true, data:data[0], message:req.t("DATA_FETCHED_SUCCESSFULLY")})
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR")})
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update user profile API 
*/
module.exports.updateProfile = async (req, res) => {
    try{
        mysqlConn.query('UPDATE users SET firstname=(?) WHERE id=(?) AND role = "user" AND deleted_at IS NULL',[req.body.firstname, req.user.id], async (err) => {
            if(!err){
                res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR")})
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}
