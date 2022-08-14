const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view all categories for Admin 
*/
module.exports.manageCategories = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM categories', (err, rec) => {
            if(!err){
                const rec2 = JSON.parse(JSON.stringify(rec))
                res.render('categories/manageCategories',{ user:req.user, record: rec2 })
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
 * @purpose:     To view add category form
*/
module.exports.addCategory = async(req, res) => {
    try{
        res.render('categories/addCategory', {user:req.user});
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }
} 

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store category
*/
module.exports.storeCategory = async(req, res) => {
    try{
        var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
        if(mimetype.includes(req.files.image.mimetype)){
            var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+req.files.image.mimetype.split('/')[1]
            req.files.image.mv('public/images/categories/'+imageExtension)
            const imgName = process.env.BASE_URL+"/images/categories/"+imageExtension
            mysqlConn.query('INSERT INTO categories(title,description,image) VALUES(?,?,?)',[req.body.title, req.body.description, imgName], (err) => {
                if(!err){
                    req.toastr.success(req.t("DATA_SUBMITTED_SUCCESSFULLY"))
                    res.redirect('/manageCategories')
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
 * @purpose:     To view category detail
*/
module.exports.viewCategory = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM categories WHERE id = (?)',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('categories/viewCategory',{user:req.user, data:data[0]})
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
 * @purpose:     To edit category form
*/
module.exports.editCategory = async (req,res) => {
    try{
        mysqlConn.query('SELECT * FROM categories WHERE id = (?)',[req.params.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('categories/editCategory',{user:req.user, data:data[0]})
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
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update category
*/
module.exports.updateCategory = async(req, res) => {
    try{
        if(req.files != null){
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(mimetype.includes(req.files.image.mimetype)){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+req.files.image.mimetype.split('/')[1]
                req.files.image.mv('public/images/categories/'+imageExtension)
                    var imgName = process.env.BASE_URL+"/images/categories/"+imageExtension
                    mysqlConn.query('UPDATE categories SET title=(?), description=(?), image=(?) WHERE id=(?)', [req.body.title, req.body.description, imgName, req.params.id], (err) => {
                        if(!err){
                            req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                            res.redirect('/manageCategories')
                        } else{
                            req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                            res.redirect('back')
                        }
                    })
            } else{
                req.toastr.error(req.t("IMAGE_FORMAT"))
                res.redirect('back')
            }  
        } else{
            mysqlConn.query('UPDATE categories SET title=(?), description=(?) WHERE id=(?)', [req.body.title, req.body.description, req.params.id], (err) => {
                if(!err){
                    req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                    res.redirect('/manageCategories')
                } else{
                    req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                    res.redirect('back')
                }
            })
        }
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    } 
}

/**********************************************************************/

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all categories for CE (in case of sign up) API
*/
module.exports.manageCategoriesCE = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM categories', (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, Success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:200, Success:true, data:[], message:req.t("NO_DATA_FOUND") }) 
                }
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get all sub categories by selected category for CE (in case of sign up) API
*/
module.exports.manageCategoriesSubCategoriesCE = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM sub_categories WHERE category_id IN (${req.body.data})`, (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, Success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:200, Success:true, data:[], message:req.t("NO_DATA_FOUND") }) 
                }
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To store categories and sub categories for CE (in case of sign up) API
*/
module.exports.manageCategoriesSubCategoriesCEpost = async (req, res) => {
    try{
        mysqlConn.query('SELECT id FROM users WHERE phone = (?) AND deleted_at IS NULL', req.body.phone, async(err, data) => {
            if(err){
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            } else{
                if(data.length > 0){
                    var itemsProcessed = 0;
                    const arrayData = JSON.parse(req.body.data);
                    await arrayData.forEach( async (element, index, array) => {
                        mysqlConn.query('INSERT into ce_sub_categories(ce_id, category_id, sub_category_id) values(?,?,?)', [data[0].id, element.category_id, element.id], (err) => {
                            if(!err){
                                itemsProcessed++;
                                if(itemsProcessed === array.length) {
                                    res.send({ status:200, Success:true, message:req.t("DATA_SUBMITTED_SUCCESSFULLY") })
                                }
                            } else{
                                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                            }
                        })
                    })
                } else{
                    res.send({ status:400, Success:false, message:req.t("USER_NOT_EXISTS") })
                }
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get categories for CE (that is choose by CE) API
*/
module.exports.getCategoriesByCeSelected = async (req, res) => {
    try{
        mysqlConn.query(`SELECT * FROM categories WHERE id IN (SELECT category_id FROM ce_sub_categories WHERE ce_id = ${req.user.id} AND deleted_at IS NULL)`, (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, Success:true, data:data, message:req.t("DATA_FETCHED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:200, Success:true, data:[], message:req.t("NO_DATA_FOUND") }) 
                }
            } else{
                res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
    }
}

