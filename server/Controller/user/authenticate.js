const mysqlConn = require('../../Models/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To login user API
*/
module.exports.login = async (req, res) => {
	try {
		mysqlConn.query('SELECT * FROM users WHERE role = "user" AND (email = (?) OR username = (?)) AND deleted_at IS NULL', [req.body.username, req.body.username], async (err, data) => {
			if(!err){
				if(data.length > 0){
					const match = await bcrypt.compare(req.body.password, data[0].password)
						if(match){
							if(data[0].verify_otp == 'verified') {
								if (data[0].status == 'active') {
									var token = await jwt.sign({ user: data[0] }, process.env.JWT_SECRET_TOKEN)
									res.send({ status: 200, Success: true, message: req.t("LOGIN_SUCCESSFULLY"), data: [{ token: token, user_id: data[0].id, name: data[0].firstname, phone: data[0].phone, email: data[0].email, }] })
								} else{
									return res.send({ status: 400, Success: false, account_active: false, message: req.t("ACCOUNT_BLOCKED") })
								}
							} else{
								return res.send({ status: 400, Success: false, otp_verification: false, phone: data[0].phone, message: req.t("OTP_NOT_VERIFIED") })
							}
						} else{
							return res.send({ status: 400, Success: false, message: req.t("INVALID_USERNAME_PASSWORD") })
						}
				} else{
					return res.send({ status: 400, Success: false, message: req.t("ACCOUNT_NOT_REGISTER") })
				}
			} else{
                return res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") });
            }
		})
	} catch{
		return res.send({ status: 400, Success: false, message: req.t("SOMETHING_WENT_WRONG") })
	}
}

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To sign up user API
*/
module.exports.signup = async (req,res) => {
    try{
        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        mysqlConn.query('SELECT * FROM users WHERE deleted_at IS NULL AND (phone = (?) OR email = (?) OR username = (?))',[req.body.phone, req.body.email, req.body.username], (err, data) =>{
            if(err) {
                res.send({ status: 500, Success: false, message:req.t("INTERNAL_SERVER_ERROR") });
            }
            if(data.length > 0){
                res.send({ status:400, Success:false, message:req.t("USER_ALREADY_EXISTS") })
            } else{
                const otp = Math.floor(1000 + Math.random() * 9000);
                mysqlConn.query('INSERT INTO users(firstname, username, email, phone, password, role, otp) VALUES (?,?,?,?,?,"user",?)',[req.body.firstname, req.body.username, req.body.email, req.body.phone, password, otp], async (err) => {
                    if(!err){
                        const client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN, { lazyLoading: true });
                        client.messages.create({ body: otp, to: req.body.phone, from: process.env.PHONE }, (err) => {
                            if(!err){
                                res.send({ status:200, Success:true, message:req.t("OTP_SENT_SUCCESSFULLY") })
                            } else{
                                res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG") })
                            }
                        })
                        const transporter = nodemailer.createTransport({ service: "gmail", host: "smtp.gmail.com", port: 587, secure: false, auth: { user: "ashwani.technofy@gmail.com", pass: "Ashwani@123" } });
                        const info = await transporter.sendMail({ from: "ashwani.technofy@gmail.com", to: `${req.body.email}`, subject: "OTP", text: `${otp}` });
                        /*console.log("Message sent: %s", info.messageId);*/
                        /*console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));*/  
                    } else{
                        return res.send({ status:500, Success:false, message:req.t("INTERNAL_SERVER_ERROR") })
                    }
                })
            }   
        })
    } catch(error){
        return res.send({ status:400, Success:false, message:req.t("SOMETHING_WENT_WRONG")})
    }
}