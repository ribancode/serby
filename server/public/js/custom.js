$.validator.addMethod(
    "validEmail", function (value, element) {
        var pattern = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
        return pattern.test(value);
    },'Please enter a valid email address.'
);

$('#editAdminProfile').validate({
    rules : {
        firstname: {
            required: true,
        },
    },
    messages:{
        firstname:{
            required: "Please enter your full name.",
        },
    },
});

$('#changePasswordForm').validate({
    rules : {
        password: {
            required: true,
            minlength: 8,
            maxlength: 16,
        },
        new_password: {
            required: true,
            minlength: 8,
            maxlength: 16,
        },
        confirm_password: {
            required: true,
            minlength: 8,
            maxlength: 16,
            equalTo: "#new_password",
        },
    },
    messages:{
        password:{
            required: "Please enter your current password.",
            minlength: "Current password must be at least 8 characters.",
            maxlength: "Current password may not be greater than 16 characters.",
        },
        new_password:{
            required: "Please enter your new password.",
            minlength: "New password must be at least 8 characters.",
            maxlength: "New password may not be greater than 16 characters.",
        },
        confirm_password:{
            required: "Please enter your confirm password.",
            minlength: "Confirm password must be at least 8 characters.",
            maxlength: "Confirm password may not be greater than 16 characters.",
            equalTo: "New password and confirm password does not match.",
        },
    },
});

$(function() {
    setTimeout(function () {
        $('#addCategoryForm, #addSubCategoryForm').validate({
            ignore: [],
            rules : {
                title: {
                    required: true
                },
                image: {
                    required: true
                },
                description:{
                    required: true
            }
            },
            messages:{
                title:{
                    required: "Please enter title.",
                },
                image:{
                    required: "Please select a image.",
                },
                description:{
                    required: "Please enter description.",
                },
            }
        });
    }, 1000);
})

$(function() {
    setTimeout(function () {
        $('#editCategoryForm, #editSubCategoryForm').validate({
            ignore: [],
            rules : {
                title: {
                    required: true
                },
                description:{
                    required: true
            }
            },
            messages:{
                title:{
                    required: "Please enter title.",
                },
                description:{
                    required: "Please enter description.",
                },
            }
        });
    }, 1000);
})

$('#productCommissionForm, #serviceCommissionForm').validate({
    rules : {
        commission: {
            required: true,
        },
    },
    messages:{
        commission:{
            required: "Please enter your commission.",
        },
    },
});