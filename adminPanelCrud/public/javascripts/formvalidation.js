$(document).ready(function () {
    $("#signupForm").validate({
        rules: {
            name: {
                required: true,
                minlength: 3,
                maxlength: 5
            },

            email: {
                required: true,
                email: true,
                remote: {
                    url: "/formvalidation",
                    async: false,
                    type: "post",
                }
            },
            agree: "required"

        },
        messages: {
            name: {
                required: "Please enter a username",
                minlength: "Your username must consist of at least 3 characters",
                maxlength: "Your username must consist of at most 5 characters"
            },

            email: {
                required: "Please enter a valid email address",
                remote: "user already exits"
            }

        }
    });
});