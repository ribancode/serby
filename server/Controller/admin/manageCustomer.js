const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all customers
*/
module.exports.manageCustomers = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE role=(?) AND deleted_at IS NULL',['user'], (err, rec) => {
            if(!err){
                const rec2 = JSON.parse(JSON.stringify(rec))
                res.render('users/manageCustomer',{user:req.user.firstname, record:rec2})
            } else{
                req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                res.redirect('back')
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
 * @purpose:     To update customer status 
*/
module.exports.updateCustomerStatus = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE id = (?) AND deleted_at IS NULL', [req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    const value = data[0].status == 'active' ? 'inactive' : 'active';
                    mysqlConn.query('UPDATE users SET status = (?) WHERE id = (?)', [value, req.params.id], (err) => {
                        if(!err){
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
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To soft delete customer account & all customer data
*/
module.exports.deleteCustomer = async (req, res) => {
    try{
        mysqlConn.query('UPDATE users LEFT JOIN user_order_address_details ON (user_order_address_details.user_id = users.id) LEFT JOIN product_bookings ON (product_bookings.user_id = users.id) LEFT JOIN add_to_cart ON (add_to_cart.user_id = users.id) LEFT JOIN service_bookings ON (service_bookings.user_id = users.id) LEFT JOIN payments ON (payments.user_id = users.id) SET users.deleted_at = CURRENT_TIMESTAMP, user_order_address_details.deleted_at = CURRENT_TIMESTAMP, product_bookings.deleted_at = CURRENT_TIMESTAMP, add_to_cart.deleted_at = CURRENT_TIMESTAMP, service_bookings.deleted_at = CURRENT_TIMESTAMP, payments.deleted_at = CURRENT_TIMESTAMP WHERE users.id = (?)', [req.params.id], (err) => {
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