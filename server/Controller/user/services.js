const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get sub categories services (that sub categories choose by user) API
*/
module.exports.getSubCategoriesServices = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM services WHERE status = "active" AND is_approved = "1" AND sub_category_id = (?) AND ce_id = (?) AND deleted_at IS NULL ORDER BY id DESC', [req.body.sub_category_id, req.body.ce_id], async(err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        });
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get service detail API
*/
module.exports.getServiceDetail = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM services WHERE status = "active" AND is_approved = "1" AND deleted_at IS NULL AND id =${req.body.service_id}`, async(err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        });
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get service time slots API
*/
module.exports.getServiceTimeSlots = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM service_time_slots`, async(err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        });
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To service booking API
*/
module.exports.serviceBooking = async(req, res) => {
    try{
        mysqlConn.query('INSERT INTO product_bookings(user_id, service_id, final_amount, discount, commission, payment_mode, payment_status) VALUES (?,?,?,?,?,?,?,?)', [req.user.id, req.body.product_id, req.body.quantity, req.body.final_amount, req.body.discount, req.body.commission, req.body.payment_mode, req.body.payment_status], (err) => {
            if(!err){ 
                res.send({ status:200, success:true, message:req.t("BOOKING_SUCCESSFULLY") })
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}