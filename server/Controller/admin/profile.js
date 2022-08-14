const mysqlConn = require('../../Models/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

/**
 * @params:      Request
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To edit admin profile form
*/
module.exports.editAdminProfile = async (req, res) => {
    try{
        mysqlConn.query('SELECT * FROM users WHERE id = (?)', [req.user.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.render('profile', {user:req.user, data:data[0]})
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
 * @purpose:     To update admin profile
*/
module.exports.updateAdminProfile = async(req, res) => {
    try{
        if(req.files != null){
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(mimetype.includes(req.files.pimage.mimetype)){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+req.files.pimage.mimetype.split('/')[1]
                req.files.pimage.mv('public/images/profile_pic/'+imageExtension) 
                var imgName = process.env.BASE_URL+"/images/profile_pic/"+imageExtension
                mysqlConn.query('UPDATE users SET firstname=(?), pimage=(?) WHERE id=(?)', [req.body.firstname, imgName,  req.user.id], (err) => {
                    if(!err){
                        mysqlConn.query('SELECT * FROM users WHERE id =(?) AND (role = "admin" OR role = "analyst")', [req.user.id], async (err, data) => {
                            if(!err){
                                if(data.length > 0){
                                    var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
                                    req.session.isAuth = token
                                    req.toastr.success(req.t("DATA_UPDATED_SUCCESSFULLY"))
                                    res.redirect('/dashboard')
                                } else{
                                    req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
                                    return res.redirect('back')
                                }
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
                req.toastr.error(req.t("IMAGE_FORMAT"))
                return res.redirect('back')
            }
        } else{
            mysqlConn.query('UPDATE users SET firstname=(?) WHERE id=(?)', [req.body.firstname, req.user.id], async(err) => {
                if(!err){
                    mysqlConn.query('SELECT * FROM users WHERE id =(?) AND (role = "admin" OR role = "analyst")', [req.user.id], async (err, data) => {
                        if(!err){
                            if(data.length > 0){
                                var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
                                req.session.isAuth = token
                                res.redirect('/dashboard')
                            } else{
                                req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
                                return res.redirect('back')  
                            }
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
        }
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }  
}

/**
 * @params:      Request
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To delete admin profile image 
*/
module.exports.deleteAdminProfileImage = async(req, res) => {
    try{
        mysqlConn.query('UPDATE users SET pimage = Null WHERE id = (?)', [req.user.id], (err) => {
            if(!err){
                mysqlConn.query('SELECT * FROM users WHERE id =(?) AND (role = "admin" OR role = "analyst")', [req.user.id], async(err, data) => {
                    if(!err){
                        if(data.length > 0){
                            var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
                            req.session.isAuth = token
                            res.redirect('/edit-profile')
                        } else{
                            req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
                            return res.redirect('back')  
                        }
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
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To change admin password form
*/
module.exports.changeAdminPassword = async (req, res) => {
    try{
        res.render('changePassword', {user:req.user})  
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }  
}

/**
 * @params:      Request
 * @createdDate: SEPTEMBER-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update admin password
*/
module.exports.updateAdminPassword = async(req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const newPassword = await bcrypt.hash(req.body.new_password, salt)
        mysqlConn.query('SELECT * FROM users WHERE id=(?) AND deleted_at IS NULL', [req.user.id], async(err, data) => {
            if(!err) {
                if(data.length > 0){
                    const match = await bcrypt.compare(req.body.password, data[0].password)
                    if(match){
                        mysqlConn.query('UPDATE users SET password=(?) WHERE id=(?)', [newPassword, req.user.id], (err) => {
                            if(!err){
                                req.session.destroy();
                                // req.toastr.success(req.t("CHANGE_PASSWORD_SUCCESSFULLY"))
                                res.redirect('/login')
                            } else{
                                req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                                return res.redirect('back')
                            }
                        })
                    } else{
                        req.toastr.error(req.t("PASSWORD_NOT_MATCH"))
                        return res.redirect('back')
                    }
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

/**********************************************************************/

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To get CE profile API 
*/
module.exports.profile = async (req, res) => {
    try{
        mysqlConn.query('SELECT id, firstname, username, email, phone, password, pimage, store_name, latitude, longitude, address, created_at, updated_at FROM users WHERE id=(?) AND role = "CE" AND deleted_at IS NULL', [req.user.id], (err, data) => {
            if(!err){
                if(data.length > 0){
                    res.send({ status:200, success:true, data:data[0], message:req.t("DATA_FETCHED_SUCCESSFULLY")})
                } else{
                    return res.send({ status:401, success:false, message:req.t("NOT_AUTHORIZED")})
                }
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR")})
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
 * @purpose:     To update CE profile API 
*/
module.exports.updateProfile = async (req, res) => {
    try{
        if(req.files != null){
            var image = req.files.pimage
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(mimetype.includes(image.mimetype)){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+image.mimetype.split('/')[1]
                mysqlConn.query('UPDATE users SET firstname=(?), store_name=(?), pimage=(?) WHERE id=(?) AND role = "CE" AND deleted_at IS NULL',[req.body.firstname, req.body.store_name, imageExtension, req.user.id], async (err) => {
                    if(!err){
                        res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
                    } else{
                        return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR")})
                    }
                })
            } else{
                return res.send({ status:400, success:false, message:req.t("IMAGE_FORMAT") })
            }
        } else{
            mysqlConn.query('UPDATE users SET firstname=(?), store_name=(?) WHERE id=(?) AND role = "CE" AND deleted_at IS NULL',[req.body.firstname, req.body.store_name, req.user.id], async (err) => {
                if(!err){
                    res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
                } else{
                    return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR")})
                }
            })
        }
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}

/**
 * @params:      Request
 * @createdDate: AUGUST-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To update CE and User password API 
*/
module.exports.updatePassword = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        mysqlConn.query('UPDATE users SET password=(?) WHERE id=(?) AND deleted_at IS NULL',[password, req.user.id], async (err) => {
            if(!err){
                res.send({ status:200, success:true, message:req.t("DATA_UPDATED_SUCCESSFULLY") })
            } else{
                return res.send({ status:500, success:false, message:req.t("INTERNAL_SERVER_ERROR")})
            }
        })
    } catch(error){
        return res.send({ status:400, success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}