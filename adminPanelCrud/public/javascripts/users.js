// const users = require("../../schema/users");

$(document).ready(function () {

    // $("#validate").click(function () {
    //     $.ajax({
    //        url: '/users', 
    //        type: 'post', 
    //        dataType: 'html',
    //        data:$('#quickForm').serialize(),
    //        success: function (data) {
    //           $('.errors').html(data)
    //           /*if(data) {
    //              for(let err of data) {
    //                 $('.errors').append('<li style="color: red">'+err.msg+'</li>')
    //              }
    //           }*/
    //        },
    //        error:function () {
              
    //        }
    //     });
    //  });


    $('#quickForm').validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3,
                maxlength: 8
            },


            lastname: {
                required: true,
                minlength: 5,
                maxlength: 8
            },


            address: {
                required: true,
                minlength: 8,
                maxlength: 10
            },

            gender: {
                required: true,
            },

            hobby: {
                required: true,

            },

            interestarea: {
                required: true,
            },
            
            choosefile: {
                required: true,
            },


            //  email: {
            //      required: true,
            //      email: true,
            //      remote: {
            //          url: "/formcustom",
            //          async: false,
            //          type: "post",
            //      }
            //  },


            //  password: {
            //      required: true,
            //      minlength: 5,
            //      maxlength: 10
            //  },

        },
        messages: {
            firstname: {
                required: "Please enter a firstname",
                minlength: "Your Firstname must consist of at least 3 characters",
                maxlength: "Your Firstname must consist of at most  8 characters"
            },


            lastname: {
                required: "Please enter a lastname",
                minlength: "Your lastname must consist of at least 5 characters",
                maxlength: "Your lastname must consist of at most 8 characters"
            },

            address: {
                required: "Please enter address",
                minlength: "Your address must consist of at least 8 characters",
                maxlength: "Your address must consist of at most 10 characters"
            },

            gender: {
                required: "please enter ",
            },

            hobby: {
                required: "please enter",
            },
            interestarea: {
                required: "please enter",
            },
            choosefile: {
                required: "please enter",
            },

            //  email: {
            //      required: "Please enter a valid email address",
            //      remote: "user already exits"
            //  },



            //   password: {
            //      required: "Please enter a password",
            //      minlength: "Your password must consist of at least 5 characters",
            //      maxlength: "Your password must consist of at most 10 characters"
            //  },

        }
    });
});
