const mysqlConn = require('../../Models/db')
const stripe = require('stripe')(process.env.SECRET_KEY);

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get sub categories products (that sub categories choose by user) API
*/
module.exports.getSubCategoriesProducts = async (req, res) => {
    try{
        mysqlConn.query('SELECT products.*, (SELECT image FROM product_images WHERE product_images.product_id = products.id AND deleted_at IS NULL ORDER BY id LIMIT 1) AS image FROM products WHERE status = "active" AND is_approved = "1" AND sub_category_id = (?) AND ce_id = (?) AND deleted_at IS NULL ORDER BY id DESC', [req.body.sub_category_id, req.body.ce_id], async(err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To get product detail API
*/
module.exports.getProductDetail = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM products WHERE status = "active" AND is_approved = "1" AND deleted_at IS NULL AND id =${req.body.product_id}`, async(err, data) => {
            if(!err){
                if(data.length > 0){
                        mysqlConn.query('SELECT * FROM product_images WHERE product_id =(?)',[data[0].id],(err,image) => {
                            if(err){
                                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                            } else{
                                data[0]['product_images'] = image
                                res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                            }
                        })
                } else{
                    return res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To add product into cart API
*/
module.exports.addProductIntoCart = async(req, res) => {
    try{
        mysqlConn.query('SELECT * FROM add_to_cart WHERE user_id = (?) AND product_id = (?)', [req.user.id, req.body.product_id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    if(req.body.quantity == 0){ 
                        var query = 'DELETE FROM add_to_cart WHERE user_id=(?) AND product_id=(?)'
                        var value =  [req.user.id, req.body.product_id]
                    } else{
                        var query = 'UPDATE add_to_cart SET quantity=(?) WHERE user_id=(?) AND product_id=(?)'
                        var value =  [req.body.quantity, req.user.id, req.body.product_id]
                    }
                } else{
                    var query = 'INSERT INTO add_to_cart(user_id, product_id, quantity) VALUES (?,?,?)'
                    var value = [req.user.id, req.body.product_id, req.body.quantity]
                }
                mysqlConn.query(query, value, async (err) => {
                    if(!err){
                        res.send({ status:200, success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                    } else{
                        return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                    }
                })
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To get product from cart API
*/
module.exports.getProductFromCart = async(req, res) => {
    try{
        mysqlConn.query('SELECT products.*, (SELECT image FROM product_images WHERE product_images.product_id = products.id AND product_images.deleted_at IS NULL ORDER BY product_images.id LIMIT 1) AS image FROM add_to_cart RIGHT JOIN products ON products.id = add_to_cart.product_id WHERE products.status = "active" AND is_approved = "1" AND user_id = (?) AND products.deleted_at IS NULL ORDER BY products.id DESC', [req.user.id], async (err, data) => {
            if(!err){
                if(data.length > 0){
                    var itemsProcessed = 0;
                    await data.forEach( async (element, index, array) => {
                        mysqlConn.query('SELECT * FROM add_to_cart WHERE product_id =(?) AND user_id = (?)', [element.id, req.user.id], (err, cartData) => {
                            if(err){
                                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                            } else{
                                element['add_to_cart'] = cartData
                                itemsProcessed++;
                                if(itemsProcessed === array.length) {
                                    res.send({ status:200, success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                                }
                            }
                        })
                    })
                } else{
                    return res.send({ status:200, success:true, data:[], message:req.t("NO_DATA_FOUND") }) 
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To delete product from cart API
*/
module.exports.deleteProductFromCart = async(req, res) => {
    try{
        mysqlConn.query('DELETE FROM add_to_cart WHERE id = (?) AND user_id = (?)', [req.body.id, req.user.id], async(err, data) => {
            if(!err){
                if(data.affectedRows != 0){
                    res.send({ status:200, success:true, message:req.t("DATA_DELETED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:401, success:false, message:req.t("NOT_AUTHORIZED") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To delete all product from cart API
*/
module.exports.deleteAllProductFromCart = async(req, res) => {
    try{
        mysqlConn.query('DELETE FROM add_to_cart WHERE user_id = (?)', [req.user.id], async(err, data) => {
            if(!err){
                if(data.affectedRows != 0){
                    res.send({ status:200, success:true, message:req.t("DATA_DELETED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:401, success:false, message:req.t("NOT_AUTHORIZED") })
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
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
 * @purpose:     To product booking API
*/
module.exports.productBooking = async(req, res) => {
    try{
        const query = 'INSERT INTO product_bookings(user_id, product_id, quantity, final_amount, discount, commission, payment_mode, payment_status) VALUES (?,?,?,?,?,?,?,?)'
        const value = [req.user.id, req.body.product_id, req.body.quantity, req.body.final_amount, req.body.discount, req.body.commission, req.body.payment_mode, req.body.payment_status]
        if(req.body.payment_mode === 'Online'){
            if(req.body.stripe_token != null){
                const charge = await stripe.charges.create({
                    // amount: req.body.final_amount * req.body.quantity,
                    amount: 50,
                    currency: 'USD',
                    // source: req.body.stripe_token,
                    source: "tok_1JWaIV2eZvKYlo2CTrzN9Rqy",
                });
                mysqlConn.query(query, value, (err, data) => {
                    if(!err){ 
                        mysqlConn.query('INSERT INTO payments(user_id, product_booking_id, txn_id, amount, balance_transaction, currency, payment_method, status) VALUES (?,?,?,?,?,?,?,?)', [req.user.id, data.insertId, charge.id, charge.amount, charge.balance_transaction, charge.currency, charge.payment_method, charge.status], (err) => {
                            if(!err){ 
                                res.send({ status:200, success:true, message:req.t("BOOKING_SUCCESSFULLY") })
                            } else{
                                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                            }
                        })
                    } else{
                        return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") }) 
                    }
                })
            }
        } else{
            mysqlConn.query(query, value, (err) => {
                if(!err){ 
                    res.send({ status:200, success:true, message:req.t("BOOKING_SUCCESSFULLY") })
                } else{
                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                }
            })
        }
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}