const { JsonWebTokenError } = require('jsonwebtoken')
const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view all CE products
*/
module.exports.products = async (req, res) => {
    try{
        mysqlConn.query('SELECT products.*, users.email FROM products LEFT JOIN users ON products.ce_id = users.id WHERE products.deleted_at IS NULL', (err, data) => {
            if(!err){
                const stringifyData = JSON.stringify(data)
                const parseData = JSON.parse(stringifyData)
                res.render('ceProducts/ceProducts',{ user:req.user, data: parseData })
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
 * @purpose:     To view CE products detail
*/
module.exports.ceProductsView = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM products WHERE id = (?) AND deleted_at IS NULL',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    mysqlConn.query('SELECT * FROM product_images WHERE product_id =(?)',[data[0].id],(err, image) => {
                        if(err){
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            res.redirect('back')
                        } else{
                            data[0]['product_images'] = image
                            res.render('ceProducts/viewProduct', {user:req.user, data:data[0]})
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
 * @purpose:     To view add / edit product commission form
*/
module.exports.productCommission = async(req, res) => {
    try{
        mysqlConn.query('SELECT * FROM commissions WHERE is_product = "1"', (err, data) => {
            if(!err){
                res.render('commission/addProductCommission', {user:req.user, data:data[0]});
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
 * @purpose:     To store / update product commission 
*/
module.exports.storeProductCommission = async(req, res) => {
    try{
        mysqlConn.query('SELECT * FROM commissions WHERE is_product = "1"', (err, data) => {
            if(!err){
                if(data.length > 0){
                    mysqlConn.query('UPDATE commissions SET commission=(?) WHERE is_product=(?)', [req.body.commission, req.body.is_product], (err) => {
                        if(!err){
                            req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                            res.redirect('back')
                        } else{
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            return res.redirect('back')
                        }
                    })
                } else{
                    mysqlConn.query('INSERT INTO commissions (commission, is_product) VALUES (?,?)', [req.body.commission, req.body.is_product], (err) => {
                        if(!err){
                            req.toastr.success(req.t("DATA_SUBMITTED_SUCCESSFULLY"))
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
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all user product bookings
*/
module.exports.productBookings = async (req, res) => {
    try{
        mysqlConn.query('SELECT product_bookings.*, users.email, products.title FROM product_bookings LEFT JOIN users ON product_bookings.user_id = users.id LEFT JOIN products ON product_bookings.product_id = products.id WHERE product_bookings.deleted_at IS NULL', (err, data) => {
            if(!err){
                res.render('bookings/productBookings', {user:req.user, data:data})
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
 * @purpose:     To view product booking detail
*/
module.exports.viewProductBooking = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM product_bookings WHERE id = (?) AND deleted_at IS NULL', [req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    mysqlConn.query('SELECT id, ce_id, sub_category_id, title, description FROM products WHERE id = (?) AND deleted_at IS NULL', [data[0].product_id], (err, productData) => {
                        if(!err){
                            data[0]['products'] = productData[0]
                            mysqlConn.query('SELECT * FROM product_images WHERE product_id = (?) AND deleted_at IS NULL', [productData[0].id], (err, productImagesData) => {
                                if(!err){
                                    data[0]['products']['product_images'] = productImagesData
                                    mysqlConn.query(`SELECT id, firstname, email, phone, pimage, role FROM users WHERE id IN (${data[0].user_id}, ${productData[0].ce_id}) AND (role = "user" OR role = "CE") AND deleted_at IS NULL`, (err, userData) => {
                                        if(!err){
                                            data[0]['users'] = userData
                                            mysqlConn.query('SELECT title, description, image FROM sub_categories WHERE id = (?)', [productData[0].sub_category_id], (err, subCategoryData) => {
                                                if(!err){
                                                    data[0]['sub_categories'] = subCategoryData[0]
                                                    res.render('bookings/viewProductBooking', {user:req.user, data:data[0]})
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
                } else{
                    req.toastr.error(req.t("NO_DATA_FOUND"))
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

/**********************************************************************/

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store CE product API
*/
module.exports.storeProduct = async(req, res) => {
    try{
        if(req.files.image.length == undefined){
            var image = [req.files.image]
        } else{
            var image = req.files.image
        }
        var imagesProcessed = 0;
        var invalidImagesProcessed = 0;
        await image.forEach( async (element, index, array) => {
            imagesProcessed++; 
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(!mimetype.includes(element.mimetype)){
                invalidImagesProcessed++;  
            }
            if(imagesProcessed === array.length && invalidImagesProcessed > 0) {
                return res.send({ status:400, success:false, message:req.t("IMAGE_FORMAT") })
            }
        })
        const finalAmount = req.body.amount - req.body.discount / 100 * req.body.amount
        mysqlConn.query('INSERT INTO products(ce_id, sub_category_id, title, description, amount, quantity, discount, final_amount) VALUES (?,?,?,?,?,?,?,?)',[req.user.id, req.body.sub_category_id, req.body.title, req.body.description, req.body.amount, req.body.quantity, req.body.discount, finalAmount], async (err, data) => {
            if(!err){
                var errorFlag = false;
                var itemsProcessed = 0;
                await image.forEach( async (element, index, array) => {
                    if(!errorFlag) {
                        var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+element.mimetype.split('/')[1]
                        element.mv('public/images/products/'+imageExtension)
                        var imgName = process.env.BASE_URL+"/images/products/"+imageExtension;
                        mysqlConn.query('INSERT INTO product_images(product_id, image) VALUES(?,?)', [data.insertId, imgName], (err) => {
                            if(err){
                                errorFlag = true;
                                console.log('err1')
                                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                            } else{
                                itemsProcessed++;
                                if(itemsProcessed === array.length) {
                                    res.send({ status:200, success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                                }
                            }
                        })
                    }
                })
            } else{
                console.log('err2')
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
 * @purpose:     To get CE product API
*/
module.exports.getProducts = async (req, res) => {
    try{
        mysqlConn.query(`SELECT products.*, (SELECT image FROM product_images WHERE product_images.product_id = products.id ORDER BY product_images.id LIMIT 1) AS image FROM products WHERE ce_id = ${req.user.id} AND products.deleted_at IS NULL GROUP BY products.id ORDER BY products.id DESC`, async(err, data) => {
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
 * @purpose:     To get CE sub category product API
*/
module.exports.getSubCategoryProducts = async (req, res) => {
    try{
        mysqlConn.query(`SELECT products.*, (SELECT image FROM product_images WHERE product_images.product_id = products.id ORDER BY product_images.id LIMIT 1) AS image FROM products WHERE ce_id = ${req.user.id} AND sub_category_id = ${req.body.sub_category_id} AND products.deleted_at IS NULL ORDER BY products.id DESC`, async(err, data) => {
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
 * @purpose:     To edit product API
*/
module.exports.editProduct = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM products WHERE ce_id = ${req.user.id} AND id = ${req.body.id}`, async(err, data) => {
            if(!err){
                if(data.length > 0){
                    mysqlConn.query('SELECT * FROM product_images WHERE product_id =(?)',[data[0].id],(err, image) => {
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
 * @purpose:     To update CE product API
*/
module.exports.updateProduct = async(req, res) => {
    try{
        if(req.files != null){
            if(req.files.image.length == undefined){
                var image = [req.files.image]
            } else{
                var image = req.files.image
            }
            var imagesProcessed = 0;
            var invalidImagesProcessed = 0;
            await image.forEach( async (element, index, array) => {
                imagesProcessed++; 
                var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
                if(!mimetype.includes(element.mimetype)){
                    invalidImagesProcessed++;  
                }
                if(imagesProcessed === array.length && invalidImagesProcessed > 0) {
                    return res.send({ status:400, success:false, message:req.t("IMAGE_FORMAT") })
                }
            })
        } else{
            var image = []
        }
        const finalAmount = req.body.amount - req.body.discount / 100 * req.body.amount
        mysqlConn.query('UPDATE products SET title=(?), description=(?), amount=(?), quantity=(?), discount=(?), final_amount=(?) WHERE id=(?) AND ce_id=(?) ',[req.body.title, req.body.description, req.body.amount, req.body.quantity, req.body.discount, finalAmount, req.body.id, req.user.id], async (err) => {
            if(!err){
                if(image.length > 0){
                    var errorFlag = false;
                    var itemsProcessed = 0;
                    await image.forEach( async (element, index, array) => {
                        if(!errorFlag) {
                            var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+element.mimetype.split('/')[1]
                            element.mv('public/images/products/'+imageExtension)
                            var imgName = process.env.BASE_URL+"/images/products/"+imageExtension
                            mysqlConn.query('INSERT INTO product_images(product_id, image) VALUES(?,?)',[req.body.id, imgName], (err) => {
                                if(err){
                                    errorFlag = true;
                                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                                } else{
                                    itemsProcessed++;
                                    if(itemsProcessed === array.length) {
                                        res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
                                    }
                                }
                            })
                        }
                    })
                } else{
                    res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") }) 
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
 * @purpose:     To delete product API
*/
module.exports.deleteProduct = async (req, res) => {
    try{
        mysqlConn.query('UPDATE products LEFT JOIN product_images ON product_images.product_id = products.id SET products.deleted_at = CURRENT_TIMESTAMP, product_images.deleted_at = CURRENT_TIMESTAMP WHERE ce_id = (?) AND products.id = (?)', [req.user.id, req.body.id], (err) => {
            if(err){
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            } else{
                res.send({ status:200, success:true, message:req.t("DATA_DELETED_SUCCESSFULLY") })
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
 * @purpose:     To delete product image API
*/
module.exports.deleteProductImage = async (req, res) => {
    try{
        mysqlConn.query('DELETE products.* FROM product_images LEFT JOIN products ON product_images.product_id = products.id WHERE products.ce_id = (?) AND product_images.id = (?)', [req.user.id, req.body.product_image_id], async(err, data) => {
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