const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all CE
*/
module.exports.manageCE = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE role = (?) AND deleted_at IS NULL', ['CE'], (err,rec) => {
            if(!err){
                const rec2 = JSON.parse(JSON.stringify(rec))
                res.render('users/manageCE',{user:req.user, record:rec2})
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
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view CE detail
*/
module.exports.viewCE = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE id = (?) AND role = (?) AND deleted_at IS NULL',[req.params.id, 'CE'], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('users/viewCE',{user:req.user, data:data[0]})
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

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update CE status 
*/
module.exports.updateStatusCE = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE id = (?) AND deleted_at IS NULL',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    const value = data[0].status === 'active' ? 'inactive' : 'active';
                    mysqlConn.query(`UPDATE users LEFT JOIN products ON (products.ce_id = users.id) LEFT JOIN services ON (services.ce_id = users.id) SET users.status = "${value}", products.status = "${value}", services.status = "${value}" WHERE users.id = ${req.params.id}`, (err) => {
                        if(!err){
                            req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                            res.redirect('back')
                        } else{
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            return res.redirect('back')
                        }
                    })
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

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To approve CE account 
*/
module.exports.approveCE = async (req, res) => {
    try{
        mysqlConn.query('UPDATE users SET is_approved = "1" WHERE id = (?) AND deleted_at IS NULL',[req.params.id], (err) => {
            if(!err){
                req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                res.redirect('back')
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
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To soft delete CE account & all CE data
*/
module.exports.deleteCE = async (req, res) => {
    try{
        mysqlConn.query('UPDATE users LEFT JOIN ce_sub_categories ON (ce_sub_categories.ce_id = users.id) LEFT JOIN ce_week_days ON (ce_week_days.ce_id = users.id) LEFT JOIN products ON (products.ce_id = users.id) LEFT JOIN product_images ON product_images.product_id = products.id LEFT JOIN services ON (services.ce_id = users.id) SET users.deleted_at = CURRENT_TIMESTAMP, ce_sub_categories.deleted_at = CURRENT_TIMESTAMP, ce_week_days.deleted_at = CURRENT_TIMESTAMP, products.deleted_at = CURRENT_TIMESTAMP, product_images.deleted_at = CURRENT_TIMESTAMP, services.deleted_at = CURRENT_TIMESTAMP WHERE users.id = (?)', [req.params.id], (err) => {
            if(!err){
                req.toastr.success(req.t("DATA_DELETED_SUCCESSFULLY"))
                res.redirect('back')
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

/**********************************************************************/