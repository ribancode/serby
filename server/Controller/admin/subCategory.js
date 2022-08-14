const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get sub categories of categories
*/
module.exports.subCategories = async (req, res) =>{
    try{
        mysqlConn.query('select * from sub_categories where category_id=(?)',[req.params.id], (err, rec) => {
            if(!err){
                const rec2 = JSON.parse(JSON.stringify(rec))
                res.render('subCategories/subCategories',{ user:req.user, record: rec2 })
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
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view add sub category form
*/
module.exports.addSubCategory = async(req, res) => {
    try{
        mysqlConn.query('SELECT id, title FROM categories', (err, data) => {
            if(!err){
                const categories = JSON.parse(JSON.stringify(data))
                res.render('subCategories/addSubCategory', {user:req.user, categories:categories});
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
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store sub category
*/
module.exports.storeSubCategory = async(req, res) => {
    try{
        const image = req.files.image
        var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
        if(mimetype.includes(image.mimetype)){
            var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+image.mimetype.split('/')[1]
            image.mv('public/images/subCategories/'+imageExtension)
            const imgname = process.env.BASE_URL+"/images/subCategories/"+imageExtension
            mysqlConn.query('INSERT INTO sub_categories(category_id,title,description,image) VALUES(?,?,?,?)',[req.body.category,req.body.title,req.body.description,imgname], (err,done) => {
                if(!err){
                    req.toastr.success(req.t("DATA_SUBMITTED_SUCCESSFULLY"))
                    res.redirect(`subCategory/${req.body.category}`)
                } else{
                    req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                    return res.redirect('back')
                }
            })
        } else{
            req.toastr.error(req.t("IMAGE_FORMAT"))
            return res.redirect('back')
        }
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view sub category detail
*/
module.exports.viewSubCategory = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM sub_categories WHERE id = (?)',[req.params.id], (err, data) => {
            if(!err){
                mysqlConn.query('SELECT * FROM categories WHERE id = (?)',[data[0].category_id], (err, categoryData) => {
                    if(!err){
                        data[0]['categories'] = categoryData[0]
                        res.render('subCategories/viewSubCategory',{user:req.user, data:data[0]})
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

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To edit sub category form
*/
module.exports.editSubCategory = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM sub_categories WHERE id = (?)', [req.params.id], (err, data) => {
            if(!err){
                mysqlConn.query('SELECT * FROM categories WHERE id = (?)', [data[0].category_id], (err, categoryData) => {
                    if(!err){
                        data[0]['categories'] = categoryData[0]
                        res.render('subCategories/editSubCategory', {user:req.user, data:data[0]})
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

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update sub category
*/
module.exports.updateSubCategory = async(req, res) => {
    try{
        if(req.files != null){
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(mimetype.includes(req.files.image.mimetype)){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+req.files.image.mimetype.split('/')[1]
                req.files.image.mv('public/images/categories/'+imageExtension)
                var imgName = process.env.BASE_URL+"/images/categories/"+imageExtension
                mysqlConn.query('UPDATE sub_categories SET title=(?), description=(?), image=(?) WHERE id=(?)', [req.body.title, req.body.description, imgName, req.params.id], (err) => {
                    if(!err){
                        req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                        res.redirect('/subCategory/'+req.params.id)
                    } else{
                        req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                        return res.redirect('back')
                    }
                })
            } else{
                req.toastr.error(req.t("IMAGE_FORMAT"))
                return res.redirect('/editCategory')
            }  
        } else{
            mysqlConn.query('UPDATE sub_categories SET title=(?), description=(?) WHERE id=(?)', [req.body.title, req.body.description, req.params.id], (err) => {
                if(!err){
                    res.redirect('/subCategory/'+req.params.id)
                } else{
                    req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                    return res.redirect('back')
                }
            })
        }
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get products of sub categories
*/
module.exports.products = async (req, res) =>{
    try{
        mysqlConn.query('SELECT products.*, users.email FROM products LEFT JOIN users ON products.ce_id = users.id WHERE sub_category_id=(?) AND products.deleted_at IS NULL', [req.params.id], (err, data) => {
            if(!err){
                const stringifyData = JSON.stringify(data)
                const parseData = JSON.parse(stringifyData)
                res.render('subCategories/products',{ user:req.user, record: parseData })
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
 * @purpose:     To approve CE product 
*/
module.exports.approveProduct = async (req, res) => {
    try{
        mysqlConn.query('UPDATE products SET is_approved = "1" WHERE id = (?) AND deleted_at IS NULL', [req.params.id], (err) => {
            if(!err){
                req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                return res.redirect('back')
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
 * @purpose:     To delete CE product 
*/
module.exports.deleteProduct = async (req, res) => {
    try{
        mysqlConn.query('UPDATE products LEFT JOIN product_images ON product_images.product_id = products.id SET products.deleted_at = CURRENT_TIMESTAMP, product_images.deleted_at = CURRENT_TIMESTAMP WHERE products.id = (?) AND products.deleted_at IS NULL', [req.params.id], (err) => {
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

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get services of sub categories
*/
module.exports.services = async (req,res) =>{
    try{
        mysqlConn.query('SELECT services.*, users.email FROM services LEFT JOIN users ON services.ce_id = users.id WHERE sub_category_id=(?) AND services.deleted_at IS NULL', [req.params.id], (err, data) => {
            if(!err){
                const stringifyData = JSON.stringify(data)
                const parseData = JSON.parse(stringifyData)
                res.render('subCategories/services',{ user:req.user, record: parseData })
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
 * @purpose:     To approve CE service 
*/
module.exports.approveService = async (req, res) => {
    try{
        mysqlConn.query('UPDATE services SET is_approved = "1" WHERE id = (?) AND deleted_at IS NULL', [req.params.id], (err) => {
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
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete CE service 
*/
module.exports.deleteService = async (req, res) => {
    try{
        mysqlConn.query('UPDATE services SET deleted_at = CURRENT_TIMESTAMP WHERE id = (?)', [req.params.id], (err) => {
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

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get categories (that categories is choose by CE in case of sign up) API
*/
module.exports.getSubCategoriesByCeSelectedCategories = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM sub_categories WHERE id IN (SELECT sub_category_id FROM ce_sub_categories WHERE ce_id = (?) AND category_id = (?) AND deleted_at IS NULL)', [req.user.id, req.body.category_id], (err, data) => {
            if(!err){
                res.send({ status:200, Success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
            } else{
                return res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}


