const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all user payments
*/
module.exports.payments = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM payments WHERE deleted_at IS NULL', (err, data) => {
            if(!err){
                res.render('payments/payments', {user:req.user, data: data})
            } else{ 
                req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                return res.redirect('back')
            }
        })  
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }     
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view payment detail
*/
module.exports.viewPayment = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM payments WHERE id = (?) AND deleted_at IS NULL',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('payments/viewPayment',{user:req.user, data:data[0]})
                } else{
                    req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
                    return res.redirect('back')
                }
            } else{
                req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                return res.redirect('back')
            }
        })  
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }  
}