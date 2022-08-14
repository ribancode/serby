const mysqlConn = require('../../Models/db')

/**
 * @params:      Request
 * @createdDate: JULY-2021 (mm-yyyy)
 * @developer:   TCHNOFY INDIA
 * @purpose:     To dashboard
*/
module.exports.dashboard = async (req, res) => {
    try{
        mysqlConn.query('SELECT (SELECT COUNT(id) FROM users WHERE role = "CE" OR role = "user") AS users, (SELECT COUNT(id) FROM users WHERE role="CE") AS ce, (SELECT COUNT(id) FROM users WHERE role="user") AS customer, ( SELECT COUNT(*) FROM   categories ) AS categories, ( SELECT COUNT(*) FROM   sub_categories ) AS sub_categories, ( SELECT COUNT(*) FROM   products ) AS products, ( SELECT COUNT(*) FROM   services ) AS services FROM dual;', (err, data) => {
            if(!err){
                const count=JSON.parse(JSON.stringify(data))
                a = Object.values(count[0])
                res.render('dashboard', {user:req.user, total:a[0], CE:a[1], Customer:a[2], categories:a[3], sub_categories:a[4], products:a[5], services:a[6]})
            } else{ 
                req.toastr.error(req.t("INTERNAL_SERVER_ERROR"))
                res.redirect('/dashboard') 
            }
        })
    } catch(error){
        req.toastr.error(req.t("SOMETHING_WENT_WRONG"))
        return res.redirect('back')
    }  
}
