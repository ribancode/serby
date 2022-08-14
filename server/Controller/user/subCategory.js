const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get sub categories CE (that sub categories choose by user) API
*/
module.exports.getSubCategoriesCE = async (req, res) => {
    try{
        mysqlConn.query(`SELECT users.id, firstname, phone, pimage, users.status, latitude, longitude, address, store_name, ce_sub_categories.sub_category_id, users.created_at, users.updated_at FROM users RIGHT JOIN ce_sub_categories ON ce_sub_categories.ce_id = users.id AND sub_category_id = ${req.body.sub_category_id} WHERE users.status = "active" AND is_approved = "1" AND role = "CE" AND ACOS( SIN( RADIANS( latitude ) ) * SIN( RADIANS( ${req.body.latitude} ) ) + COS( RADIANS( latitude ) ) * COS( RADIANS( ${req.body.latitude} )) * COS( RADIANS( longitude ) - RADIANS( ${req.body.longitude} )) ) * 6380 < 10`, async(err, data) => {
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