const mysqlConn = require('../../Models/db')

/**********************************************************************/

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To verify OTP (CE & User) API
*/
module.exports.verifyOTP = async (req,res) => {
    try {
        mysqlConn.query('SELECT * FROM users WHERE phone = (?) AND deleted_at IS NULL', [req.body.phone], (err, data) => {
            if(!err){
                if(data.length > 0){
                    if(data[0].otp == req.body.otp){
                        mysqlConn.query('UPDATE users SET verify_otp = "verified" WHERE phone = (?) AND deleted_at IS NULL', [req.body.phone], (err) => {
                            if(!err){
                                res.send({ status:200, Success:true, message:req.t("OTP_VERIFY_SUCCESSFULLY") })
                            } else{
                                res.send({ status:500, Success:true, message:req.t("INTERNAL_SERVER_ERROR") })
                            }
                        }) 
                    } else{
                        res.send({ status:400, Success:false, message:req.t("WRONG_OTP") })
                    } 
                } else{
                    return res.send({ status:400, Success:false, message:req.t("USER_NOT_EXISTS") })
                }
            } else{
                return res.send({ status:400, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
             
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}