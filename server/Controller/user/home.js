const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all categories API
*/
module.exports.getAllCategories = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM categories WHERE status = "active" ORDER BY title', (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") });
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all sub categories of categories (that category is choose by user) API
*/
module.exports.getCategorySubCategories = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM sub_categories WHERE status = "active" AND category_id = ${req.body.id} ORDER BY title`, (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") });
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all products API
*/
module.exports.getProducts = async (req, res) => {
    try{
        mysqlConn.query(`SELECT products.*, (SELECT image FROM product_images WHERE product_images.product_id = products.id AND deleted_at IS NULL ORDER BY id LIMIT 1) AS image FROM products WHERE status = "active" AND is_approved = "1" AND ce_id IN (SELECT id FROM users WHERE status = 'active' AND is_approved = "1" AND role = "CE" AND deleted_at IS NULL AND ACOS( SIN( RADIANS( latitude ) ) * SIN( RADIANS( ${req.body.latitude} ) ) + COS( RADIANS( latitude ) ) * COS( RADIANS( ${req.body.latitude} )) * COS( RADIANS( longitude ) - RADIANS( ${req.body.longitude} )) ) * 6380 < 10) AND deleted_at IS NULL ORDER BY id DESC`, async(err, data) => {
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
 * @purpose:     To get all services API
*/
module.exports.getServices = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM services WHERE status = "active" AND is_approved = "1" AND ce_id IN (SELECT id FROM users WHERE status = 'active' AND is_approved = "1" AND role = "CE" AND deleted_at IS NULL AND ACOS( SIN( RADIANS( latitude ) ) * SIN( RADIANS( ${req.body.latitude} ) ) + COS( RADIANS( latitude ) ) * COS( RADIANS( ${req.body.latitude} )) * COS( RADIANS( longitude ) - RADIANS( ${req.body.longitude} )) ) * 6380 < 10) AND deleted_at IS NULL ORDER BY id DESC`, async(err, data) => {
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
 * @purpose:     To get near location by CE API
*/
module.exports.getNearLocationByCE = async (req, res) => {
    try{
        mysqlConn.query(`SELECT id, pimage, latitude, longitude, store_name, created_at, updated_at FROM users WHERE status = "active" AND is_approved = "1" AND role = "CE" AND deleted_at IS NULL AND ACOS( SIN( RADIANS( latitude ) ) * SIN( RADIANS( ${req.body.latitude} ) ) + COS( RADIANS( latitude ) ) * COS( RADIANS( ${req.body.latitude} )) * COS( RADIANS( longitude ) - RADIANS( ${req.body.longitude} )) ) * 6380 < 10`, async(err, data) => {
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
 * @purpose:     To get user order address detail API 
*/
module.exports.getOrderAddressDetail = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM user_order_address_details WHERE user_id = (?) AND deleted_at IS NULL', [req.user.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, Success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY")})
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
 * @purpose:     To update user location API 
*/
/*module.exports.updateLocation = async (req, res) => {
    try{
        mysqlConn.query('UPDATE users SET latitude=(?), longitude=(?), address=(?) WHERE id=(?) AND role = "user"',[req.body.latitude, req.body.longitude, req.body.address, req.user.id], async (err) => {
            if(!err){
                res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR")})
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}*/