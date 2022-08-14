const express = require('express');
const app = express();
const auth = require('./Helpers/authToken');
const isAuth = require('./Helpers/adminAuth');

module.exports = (app) => {
    /********************* Admin Routes *********************/
    /* Signin/Signup */
    app.get('/', require('./Controller/admin/authenticate').login)
    app.get('/login', require('./Controller/admin/authenticate').login)
    app.post('/login', require('./Controller/admin/authenticate').loginpost)
    /*Dashboard*/
    app.get('/dashboard', isAuth, require('./Controller/admin/dashboard').dashboard)
    /*Profile*/
    app.get('/edit-profile', isAuth, require('./Controller/admin/profile').editAdminProfile) 
    app.post('/update-profile', isAuth, require('./Controller/admin/profile').updateAdminProfile)
    app.get('/delete-profile-image/:id', isAuth, require('./Controller/admin/profile').deleteAdminProfileImage) 
    app.get('/change-password', isAuth, require('./Controller/admin/profile').changeAdminPassword) 
    app.post('/update-password', isAuth, require('./Controller/admin/profile').updateAdminPassword)
    /*Users*/
    app.get('/manageCE', isAuth, require('./Controller/admin/manageCE').manageCE)
    app.get('/viewCE/:id', isAuth, require('./Controller/admin/manageCE').viewCE)
    app.post('/approve/:id', isAuth, require('./Controller/admin/manageCE').approveCE)
    app.post('/deleteCE/:id', require('./Controller/admin/manageCE').deleteCE)
    app.post('/updateStatusCE/:id', isAuth, require('./Controller/admin/manageCE').updateStatusCE)
    app.get('/manageCustomer', isAuth, require('./Controller/admin/manageCustomer').manageCustomers)
    app.post('/updateCustomerStatus/:id', isAuth, require('./Controller/admin/manageCustomer').updateCustomerStatus)
    app.post('/deleteCustomer/:id', isAuth, require('./Controller/admin/manageCustomer').deleteCustomer)
    /*Categories*/
    app.get('/manageCategories', isAuth, require('./Controller/admin/manageCategories').manageCategories)
    app.get('/addCategory', isAuth, require('./Controller/admin/manageCategories').addCategory)
    app.post('/addCategory', isAuth, require('./Controller/admin/manageCategories').storeCategory)
    app.get('/viewCategory/:id', isAuth, require('./Controller/admin/manageCategories').viewCategory)
    app.get('/editCategory/:id', isAuth, require('./Controller/admin/manageCategories').editCategory)
    app.post('/updateCategory/:id', isAuth, require('./Controller/admin/manageCategories').updateCategory)
    /*Sub Categories*/
    app.get('/addSubCategory', isAuth, require('./Controller/admin/subCategory').addSubCategory)
    app.post('/addSubCategory', isAuth, require('./Controller/admin/subCategory').storeSubCategory)
    app.get('/subCategory/:id', isAuth, require('./Controller/admin/subCategory').subCategories)
    app.get('/viewSubCategory/:id', isAuth, require('./Controller/admin/subCategory').viewSubCategory)
    app.get('/editSubCategory/:id', isAuth, require('./Controller/admin/subCategory').editSubCategory)
    app.post('/updateSubCategory/:id', isAuth, require('./Controller/admin/subCategory').updateSubCategory)
    /*Products*/
    app.get('/subCategory/products/:id', isAuth, require('./Controller/admin/subCategory').products)
    app.post('/product/approve/:id', isAuth, require('./Controller/admin/subCategory').approveProduct)
    app.post('/product/delete/:id', isAuth, require('./Controller/admin/subCategory').deleteProduct)
    /*Services*/
    app.get('/subCategory/services/:id', isAuth, require('./Controller/admin/subCategory').services)
    app.post('/service/approve/:id', isAuth, require('./Controller/admin/subCategory').approveService)
    app.post('/service/delete/:id', isAuth, require('./Controller/admin/subCategory').deleteService)
    /*CE Products*/
    app.get('/ceProducts', isAuth, require('./Controller/admin/products').products)
    app.get('/ceProducts/view/:id', isAuth, require('./Controller/admin/products').ceProductsView)
    /*CE Services*/
    app.get('/ceServices', isAuth, require('./Controller/admin/services').services)
    app.get('/ceServices/view/:id', isAuth, require('./Controller/admin/services').ceServicesView)
    /*Commission*/ 
    app.get('/productCommission', isAuth, require('./Controller/admin/products').productCommission)
    app.post('/productCommission', isAuth, require('./Controller/admin/products').storeProductCommission)
    app.get('/serviceCommission', isAuth, require('./Controller/admin/services').serviceCommission)
    app.post('/serviceCommission', isAuth, require('./Controller/admin/services').storeServiceCommission)
    /*Bookings*/ 
    app.get('/productBookings', isAuth, require('./Controller/admin/products').productBookings)
    app.get('/viewProductBooking/:id', isAuth, require('./Controller/admin/products').viewProductBooking)
    app.get('/serviceBookings', isAuth, require('./Controller/admin/services').serviceBookings)
    app.get('/viewServiceBooking/:id', isAuth, require('./Controller/admin/services').viewServiceBooking)
    /*Payments*/ 
    app.get('/payments', isAuth, require('./Controller/admin/payments').payments)
    app.get('/viewPayment/:id', isAuth, require('./Controller/admin/payments').viewPayment)
    /*Logout*/ 
    app.post('/logout', isAuth, require('./Controller/admin/authenticate').logout)
    
    /********************* CE Routes *********************/
    /* Signin/Signup/Forgot-Password */
    app.post('/login/CE', require('./Controller/admin/authenticate').loginCE)
    app.post('/signup/CE', require('./Controller/admin/authenticate').signupCE)
    app.get('/manageCategories/CE', require('./Controller/admin/manageCategories').manageCategoriesCE)
    app.post('/manageCategories/subCategories/CE', require('./Controller/admin/manageCategories').manageCategoriesSubCategoriesCE)
    app.post('/manageCategories/subCategoriesSubmit/CE', require('./Controller/admin/manageCategories').manageCategoriesSubCategoriesCEpost)
    app.post('/forgotpassword/CE', require('./Controller/admin/authenticate').forgotPassword)
    app.post('/resetpassword/CE', require('./Controller/admin/authenticate').resetPassword)
    /*Profile*/
    app.get('/profile/CE', auth, require('./Controller/admin/profile').profile) 
    app.post('/update/profile/CE', auth, require('./Controller/admin/profile').updateProfile) 
    /*Categories*/
    app.get('/getCategories/CE', auth, require('./Controller/admin/manageCategories').getCategoriesByCeSelected)
    /*Sub Categories*/
    app.post('/getSubCategories/CE', auth, require('./Controller/admin/subCategory').getSubCategoriesByCeSelectedCategories)
    /*Products*/
    app.post('/storeProduct/CE', auth, require('./Controller/admin/products').storeProduct)
    app.get('/getProduct/CE', auth, require('./Controller/admin/products').getProducts)
    app.post('/getSubCategories/products/CE', auth, require('./Controller/admin/products').getSubCategoryProducts)
    app.post('/editProduct/CE', auth, require('./Controller/admin/products').editProduct)
    app.post('/updateProduct/CE', auth, require('./Controller/admin/products').updateProduct)
    app.post('/deleteProduct/CE', auth, require('./Controller/admin/products').deleteProduct)
    app.post('/deleteProductImage/CE', auth, require('./Controller/admin/products').deleteProductImage)
    /*Services*/
    app.get('/getServices/CE', auth, require('./Controller/admin/services').getServices)
    app.post('/getSubCategories/services/CE', auth, require('./Controller/admin/services').getSubCategoryServices)
    app.post('/storeServices/CE', auth, require('./Controller/admin/services').storeService)
    app.post('/editServices/CE', auth, require('./Controller/admin/services').editService)
    app.post('/updateServices/CE', auth, require('./Controller/admin/services').updateService)
    app.post('/deleteServices/CE', auth, require('./Controller/admin/services').deleteService)
    app.post('/serviceBookingPayment', auth, require('./Controller/admin/services').serviceBookingPayment)
    
    /********************* User Routes *********************/
    /*Signin/Signup/Forgot-Password */
    app.post('/login/user', require('./Controller/user/authenticate').login)
    app.post('/signup/user', require('./Controller/user/authenticate').signup)
    app.post('/forgotpassword/user', require('./Controller/admin/authenticate').forgotPassword)
    app.post('/resetpassword/user', require('./Controller/admin/authenticate').resetPassword)
    /*Update user location*/ 
    /*app.post('/updateLocation', auth, require('./Controller/user/home').updateLocation)*/
    /*get CE near by location*/ 
    app.post('/getNearByLocationCE', require('./Controller/user/home').getNearLocationByCE)
    /*Profile*/
    app.get('/profile', auth, require('./Controller/user/profile').profile) 
    app.post('/update/profile', auth, require('./Controller/user/profile').updateProfile) 
    /*Categories*/
    app.get('/all-categories', require('./Controller/user/home').getAllCategories)
    app.post('/category/sub-categories', require('./Controller/user/home').getCategorySubCategories)
    /*Sub Categories*/
    app.post('/getSubCategory/CE', require('./Controller/user/subCategory').getSubCategoriesCE)
    /*Products*/
    app.post('/getProduct', require('./Controller/user/home').getProducts)
    app.post('/getSubCategories/products', require('./Controller/user/products').getSubCategoriesProducts)
    app.post('/getProduct/detail', require('./Controller/user/products').getProductDetail)
    app.post('/addProductIntoCart', auth, require('./Controller/user/products').addProductIntoCart)
    app.get('/getProductFromCart', auth, require('./Controller/user/products').getProductFromCart)
    app.post('/deleteProductFromCart', auth, require('./Controller/user/products').deleteProductFromCart)
    app.get('/deleteAllProductFromCart', auth, require('./Controller/user/products').deleteAllProductFromCart)
    app.post('/productBooking', auth, require('./Controller/user/products').productBooking)
    /*Services*/
    app.post('/getServices', require('./Controller/user/home').getServices)
    app.post('/getSubCategories/services', require('./Controller/user/services').getSubCategoriesServices)
    app.post('/getService/detail', require('./Controller/user/services').getServiceDetail)
    app.get('/service-time-slots', auth, require('./Controller/user/services').getServiceTimeSlots)
    app.post('/serviceBooking', auth, require('./Controller/user/services').serviceBooking)
    /*User address detail*/ 
    app.get('/getOrderAddress/detail', auth, require('./Controller/user/home').getOrderAddressDetail)
    /*
    ----------common routes----------
    verityOTP and profile rout is common for user and CE 
    */
    app.post('/verifyOTP', require('./Controller/admin/verifyOTP').verifyOTP) 
    app.post('/update/password', auth, require('./Controller/admin/profile').updatePassword)

    /* error 404 rout*/
    app.use((req, res, next) => {
        res.status(404);
        res.render('error404');
    });
}

