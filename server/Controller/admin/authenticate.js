const mysqlConn = require('../../Models/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')
const nodemailer = require('nodemailer')
/**
 * @params:      
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To view Admin login form
*/
module.exports.login = async (req, res) => {
	return res.render('login', {toasts:req.toastr.render()})
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To authenticate Admin login 
*/
module.exports.loginpost = async (req, res) => {
    try{
        if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
            req.toastr.error(req.t("CAPTCHA_REQUIRED"))
            return res.redirect('/login')
        }
        const verifyURL = process.env.RECAPTCHASECRETURL + process.env.RECAPTCHASECRETKEY + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.headers['x-forwarded-for'] || req.connection.remoteAddress
        const body = await fetch(verifyURL).then(res => res.json());
        if (body.success !== undefined && !body.success) {
            req.toastr.error(req.t("FAILED_CAPTCHA_VERIFICATION"))
            return res.redirect('/login')
        } else{
            mysqlConn.query('SELECT * FROM users WHERE email =(?) AND (role = "admin" OR role = "analyst") AND deleted_at IS NULL', [req.body.email], async (err, data) => {
                if(!err){
                    if(data.length > 0){
                        const match = await bcrypt.compare(req.body.password, data[0].password)
                        if(match){
                            var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
                            req.session.isAuth = token
                            req.session.email = data[0].email
                            req.toastr.success(req.t("LOGIN_SUCCESSFULLY"))
                            res.redirect('/dashboard')
                        } else{ 
                            req.toastr.error(req.t("INVALID_USERNAME_PASSWORD"))
                            return res.redirect('back')
                        }
                    } else{
                        req.toastr.error(req.t("ACCOUNT_NOT_REGISTER"))
                        return res.redirect('back')
                    }
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
 * @params:      
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To logout Admin 
*/
module.exports.logout = async (req, res) => {
    req.session.destroy();
    // req.toastr.success(req.t("LOGOUT_SUCCESSFULLY"))
    res.redirect('/login')
}

/**********************************************************************/

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To authenticate CE login API
*/
module.exports.loginCE = async (req, res) => {
	try{
		mysqlConn.query('SELECT * FROM users WHERE role = "CE" AND (email=(?) OR username=(?)) AND deleted_at IS NULL', [req.body.username, req.body.username], async (err, data) => {
			if(!err) {
				if(data.length > 0) {
					const match = await bcrypt.compare(req.body.password, data[0].password)
					if (match) {
						if (data[0].verify_otp == 'verified') {
							mysqlConn.query('SELECT * FROM ce_sub_categories WHERE ce_id=(?) AND deleted_at IS NULL', [data[0].id], async (err, categoriesData) => {
								if(!err) {
									if (categoriesData.length > 0) {
										if (data[0].status == 'active' && data[0].is_approved == 1) {
											var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
											res.send({ status: 200, Success: true, otp_verification: true, is_approved: true, account_active: true, phone: data[0].phone, step: 'dashboard', message: req.t("LOGIN_SUCCESSFULLY"), data: [{ token: token, name: data[0].firstname, phone: data[0].phone, email: data[0].email, store_name: data[0].store_name, logo: data[0].pimage }] })
										} else if (data[0].is_approved == 0) {
											res.send({ status: 200, Success: true, otp_verification: true, is_approved: false, account_active: true, phone: data[0].phone, step: 'thanks', message: req.t("ACCOUNT_NOT_VERIFIED") })
										} else {
											res.send({ status: 200, Success: true, otp_verification: true, is_approved: true, account_active: false, phone: data[0].phone, step: 'login', message: req.t("ACCOUNT_BLOCKED") })
										}
									} else {
										res.send({ status: 200, Success: true, otp_verification: true, is_approved: false, account_active: true, phone: data[0].phone, step: 'categories', message: "" })
									}
								} else{
									res.send({ status: 500, Success: false, message: req.t("INTERNAL_SERVER_ERROR") })
								}
							})
						} else {
							res.send({ status: 200, Success: true, otp_verification: false, is_approved: false, account_active: true, phone: data[0].phone, step: 'otp', message: req.t("OTP_NOT_VERIFIED") })
						}
					} else {
						res.send({ status: 400, Success: false, message: req.t("INVALID_USERNAME_PASSWORD") })
					}
				} else {
					res.send({ status: 400, Success: false, message: req.t("ACCOUNT_NOT_REGISTER") })
				}
			} else {
				res.send({ status: 500, Success: false, message: req.t("INTERNAL_SERVER_ERROR") })
			}
		})
	} catch{
		return res.send({ status: 400, Success: false, message: req.t("SOMETHING_WENT_WRONG") })
	}
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To sign up CE API 
*/
module.exports.signupCE = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        if(req.files != null){
            var image = req.files.pimage
            var mimetype = ["image/jpeg", "image/png", "image/gif", "image/jpg", "image/jfif"];
            if(mimetype.includes(image.mimetype)){
                var imageExtension = Math.floor(Math.random() * 10000000000)+'.'+image.mimetype.split('/')[1]
                image.mv('public/images/profile_pic/'+imageExtension)
            } else{
                return res.send({ status:400, Success:false, message:req.t("IMAGE_FORMAT") })
            }
        } else{
            var imageExtension = 'serby.png'
        }
        mysqlConn.query('SELECT * FROM users WHERE phone=(?) OR email=(?) OR username=(?)',[req.body.phone, req.body.email, req.body.username], (err, data) =>{
            if(!err) {
                if(data.length > 0){
                    return res.send({ status:400, Success:false, message:req.t("USER_ALREADY_EXISTS") })
                } else{
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    var imgName = process.env.BASE_URL+"/images/profile_pic/"+imageExtension
                    mysqlConn.query('INSERT INTO users(firstname, store_name, username, email, phone, password, role,otp, is_approved, latitude, longitude, pimage, store_open_time, store_close_time) VALUES (?,?,?,?,?,?,"CE",?,?,?,?,?,?,?)',[req.body.firstname, req.body.store_name, req.body.username, req.body.email, req.body.phone, password, otp, '0', req.body.lat, req.body.long, imgName, req.body.store_open_time, req.body.store_close_time], async (err, data) => {
                        if(!err){
                            var itemsProcessed = 0;
                            const weekDays = JSON.parse(req.body.week_days);
                            await weekDays.forEach( async(element, index, array) => {
                                mysqlConn.query('INSERT INTO ce_week_days(ce_id, day, status) VALUES (?,?,?)',[data.insertId, element.day, element.status], async (err) => {
                                    if(!err){
                                        itemsProcessed++;
                                        if(itemsProcessed === array.length){
                                            const client = await require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN, { lazyLoading: true });
                                            client.messages.create({ body: otp, to: req.body.phone, from: process.env.PHONE }, async (err) => {
                                                if(!err){
                                                    const transporter = await nodemailer.createTransport({ service: "gmail", host: "smtp.gmail.com", port: 587, secure: false, auth: { user: "ashwani.technofy@gmail.com", pass: "Ashwani@123" } });
                                                    transporter.sendMail({ from: "ashwani.technofy@gmail.com", to: `${req.body.email}`, subject: "OTP", text: `${otp}` });
                                                    res.send({ status:200, Success:true, message:req.t("OTP_SENT_SUCCESSFULLY") })
                                                } else{
                                                    return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
                                                }
                                            })
                                        }
                                    } else{
                                        return res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                                    }
                                })
                            })
                        } else{
                            return res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                        }
                    })
                }
            } else{
                return res.send({ status: 500, Success: false, message:req.t("INTERNAL_SERVER_ERROR") });
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To CE forgot password API
*/
module.exports.forgotPassword = async (req,res) => {
    try {
        mysqlConn.query('SELECT * FROM users WHERE phone = (?) AND deleted_at IS NULL', [req.body.phone], (err, data) =>{
            if(!err) {
                if(data.length > 0){
                    const otp = Math.floor(1000 + Math.random() * 9000);
                    mysqlConn.query("update users set otp = (?) where phone = (?)", [otp, req.body.phone], async (err) =>{
                        if(!err){
                            const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN, { lazyLoading: true });
                            client.messages.create({ body: otp, to: req.body.phone, from: process.env.PHONE }, (err) => {
                                if(!err){
                                    res.send({ status:200, Success:true, message:req.t("OTP_SENT_SUCCESSFULLY") })
                                } else{
                                    res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
                                }
                            })
                            const transporter = nodemailer.createTransport({
                                service: "gmail", host: "smtp.gmail.com", port: 587, secure: false, auth: { user: "ashwani.technofy@gmail.com", pass: "Ashwani@123" } 
                            });
                            await transporter.sendMail({ from: "ashwani.technofy@gmail.com", to: `${data[0].email}`, subject: "OTP", text: `${otp}` });
                            /*console.log("Message sent: %s", info.messageId);*/
                            /*console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/  
                        } else{
                            res.send({ status:400, Success:false, message:req.t("OTP_NOT_SENT") })
                        }
                    })
                } else{
                    return res.send({ status:400, Success:false, message:req.t("USER_NOT_EXISTS") })
                }
            } else{
                return res.send({ status:500, Success:true, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error) {
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}

/**
 * @params:      Request
 * @createdDate: JUNE-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To CE reset password API
*/
module.exports.resetPassword = async (req,res) => {
    try{
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        mysqlConn.query('SELECT * FROM users WHERE phone = (?) AND deleted_at IS NULL', [req.body.phone], (err, data) => {
            if(!err) {
                if(data.length > 0){
                    mysqlConn.query('UPDATE users SET password=(?) WHERE phone = (?) AND deleted_at IS NULL', [password, req.body.phone], (err) => {
                        if(!err){
                            res.send({ status:200, Success:true, message:req.t("PASSWORD_UPDATE_SUCCESSFULLY") })
                        } else{
                            return res.send({ status:500, Success:true, message:req.t("INTERNAL_SERVER_ERROR") })
                        }
                    })
                } else{
                    return res.send({ status:400, Success:false, message:req.t("USER_NOT_EXISTS") })
                }
            } else{
                return res.send({ status:400, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
            }
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}