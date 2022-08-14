const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view all CE services
*/
module.exports.services = async (req,res) => {
    try{
        mysqlConn.query('SELECT services.*, users.email FROM services LEFT JOIN users ON services.ce_id = users.id WHERE services.deleted_at IS NULL', (err, data) => {
            if(!err){
                const stringifyData = JSON.stringify(data)
                const parseData = JSON.parse(stringifyData)
                res.render('ceServices/ceServices',{ user:req.user, data: parseData })
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
 * @purpose:     To view CE services detail
*/
module.exports.ceServicesView = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM services WHERE id = (?) AND deleted_at IS NULL',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('ceServices/viewService', {user:req.user, data:data[0]})
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
 * @purpose:     To view add / edit service commission form
*/
module.exports.serviceCommission = async(req, res) => {
    try{
        mysqlConn.query('SELECT * FROM commissions WHERE is_service = "1"', (err, data) => {
            if(!err){
                res.render('commission/addServiceCommission', {user:req.user, data:data[0]});
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
 * @purpose:     To store / update service commission 
*/
module.exports.storeServiceCommission = async(req, res) => {
    try{
        mysqlConn.query('SELECT * FROM commissions WHERE is_service = "1"', (err, data) => {
            if(!err){
                if(data.length > 0){
                    mysqlConn.query('UPDATE commissions SET commission=(?) WHERE is_service=(?)', [req.body.commission, req.body.is_service], (err) => {
                        if(!err){
                            res.redirect('back')
                        } else{
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            return res.redirect('back')
                        }
                    })
                } else{
                    mysqlConn.query('INSERT INTO commissions (commission, is_service) VALUES (?,?)', [req.body.commission, req.body.is_service], (err) => {
                        if(!err){
                            res.redirect('back')
                        } else{
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            return res.redirect('back')
                        }
                    })
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
 * @purpose:     To get all user service bookings
*/
module.exports.serviceBookings = async (req, res) => {
    try{
        mysqlConn.query('SELECT service_bookings.*, users.email, services.title FROM service_bookings LEFT JOIN users ON service_bookings.user_id = users.id LEFT JOIN services ON service_bookings.service_id = services.id WHERE service_bookings.deleted_at IS NULL', (err, data) => {
            if(!err){
                res.render('bookings/serviceBookings', {user:req.user, data:data})
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
 * @purpose:     To view service booking detail
*/
module.exports.viewServiceBooking = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM service_bookings WHERE id = (?) AND deleted_at IS NULL', [req.params.id], (err, data) => {
            if(!err){
                mysqlConn.query('SELECT id, ce_id, sub_category_id, title, description FROM services WHERE id = (?) AND deleted_at IS NULL', [data[0].service_id], (err, serviceData) => {
                    if(!err){
                        data[0]['services'] = serviceData[0]
                            mysqlConn.query(`SELECT id, firstname, email, phone, pimage, role FROM users WHERE id IN (${data[0].user_id}, ${serviceData[0].ce_id}) AND (role = "user" OR role = "CE") AND deleted_at IS NULL`, (err, userData) => {
                                if(!err){
                                    data[0]['users'] = userData
                                    mysqlConn.query('SELECT title, description, image FROM sub_categories WHERE id = (?)', [serviceData[0].sub_category_id], (err, subCategoryData) => {
                                        if(!err){
                                            data[0]['sub_categories'] = subCategoryData[0]
                                            res.render('bookings/viewServiceBooking', {user:req.user, data:data[0]})
                                        } else{ 
                                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                                            return res.redirect('back') 
                                        }
                                    })
                                } else{ 
                                    req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                                    return res.redirect('back') 
                                }
                            })
                    } else{ 
                        req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                        return res.redirect('back') 
                    }
                })
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

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get CE services API
*/
module.exports.getServices = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM services WHERE ce_id = ${req.user.id} AND deleted_at IS NULL ORDER BY id DESC`, async(err, data) => {
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
 * @purpose:     To get CE sub category services API
*/
module.exports.getSubCategoryServices = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM services WHERE ce_id = ${req.user.id} AND sub_category_id = ${req.body.sub_category_id} AND deleted_at IS NULL ORDER BY id DESC`, async(err, data) => {
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
 * @purpose:     To store CE service API
*/
module.exports.storeService = async(req, res) => {
    try{
        var image = req.files.image
        if(image.mimetype == "image/jpeg" || image.mimetype == "image/png" || image.mimetype == "image/gif" || image.mimetype == "image/jpg" || image.mimetype == "image/jfif"){
            var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+image.mimetype.split('/')[1]
            image.mv('public/images/services/'+imageExtension)
            var imgName = process.env.BASE_URL+"/images/services/"+imageExtension
            const finalAmount = req.body.amount - req.body.discount / 100 * req.body.amount
            mysqlConn.query('INSERT INTO services(ce_id, sub_category_id, title, description, image, amount, discount, final_amount) VALUES (?,?,?,?,?,?,?,?)',[req.user.id, req.body.sub_category_id, req.body.title, req.body.description, imgName, req.body.amount, req.body.discount, finalAmount], async (err, data) => {
                if(!err){
                    res.send({ status:200, success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                }
            })
        } else{
            return res.send({ status:400, success:false, message:req.t("IMAGE_FORMAT") })
        }
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To edit service API
*/
module.exports.editService = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM services WHERE ce_id = ${req.user.id} AND id = ${req.body.id}`, async(err, data) => {
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
 * @purpose:     To update CE service API
*/
module.exports.updateService = async(req, res) => {
    try{
        if(req.files != null){
            var image = req.files.image
            if(image.mimetype == "image/jpeg" || image.mimetype == "image/png" || image.mimetype == "image/gif" || image.mimetype == "image/jpg" || image.mimetype == "image/jfif"){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+image.mimetype.split('/')[1]
                image.mv('public/images/services/'+imageExtension)
                imgName = process.env.BASE_URL+"/images/services/"+imageExtension
            } else{
                return res.send({ status:400, success:false, message:req.t("IMAGE_FORMAT") })
            }
        }
        const finalAmount = req.body.amount - req.body.discount / 100 * req.body.amount
        if(req.files != null){
            mysqlConn.query('UPDATE services SET title=(?), description=(?), image=(?), amount=(?) discount=(?), final_amount=(?) WHERE id=(?) AND ce_id=(?) ',[req.body.title, req.body.description, imgName, req.body.amount, req.body.discount, finalAmount, req.body.id, req.user.id], async (err) => {
                if(!err){
                    res.send({ status:200, success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                }
            })
        } else{
            mysqlConn.query('UPDATE services SET title=(?), description=(?), amount=(?), discount=(?), final_amount=(?) WHERE id=(?) AND ce_id=(?) ',[req.body.title, req.body.description, req.body.amount, req.body.discount, finalAmount, req.body.id, req.user.id], async (err) => {
                if(!err){
                    res.send({ status:200, success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                }
            })
        }
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete service API
*/
module.exports.deleteService = async (req, res) => {
    try{
        mysqlConn.query('UPDATE services SET deleted_at = CURRENT_TIMESTAMP WHERE ce_id = (?) AND id = (?)', [req.user.id, req.body.id], async(err, data) => {
            if(!err){
                res.send({ status:200, success:true, message:req.t("DATA_DELETED_SUCCESSFULLY") })
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
 * @purpose:     To service booking payment API
*/
module.exports.serviceBookingPayment = async(req, res) => {
    try{
        // mysqlConn.query('INSERT INTO payments(user_id, service_booking_id, txn_id, amount, balance_transaction, currency, payment_method, status) VALUES (?,?,?,?,?,?,?,?)', [req.user.id, res.body.service_booking_id, charge.id, charge.amount, charge.balance_transaction, charge.currency, charge.payment_method, charge.status], (err) => {
        //     if(!err){ 
        //         res.send({ status:200, success:true, message:req.t("PAYMENT_SUCCESSFULLY") })
        //     } else{
        //         return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
        //     }
        // })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}