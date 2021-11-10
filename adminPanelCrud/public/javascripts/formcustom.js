$(document).ready(function () {


    $("#validateButton").click(function(){  
            $.validator.addMethod("validatefirstname", function(value, element) {
             return this.optional(element) || value != 'default' ;
            }, " Please enter firstname");
           
            var validator = $("#customValid").validate({
             rules: {                   
             firstname:{
              required : true
              }  
             },
             errorElement: "span"            
            });
          
            if(validator.form()){
             alert('Form Submitted..');
            }
           });
 
 
 
 
             $("#customValid").validate({
                 rules: {
                     firstname: {
                         required: true,
                         minlength: 3,
                         maxlength: 8
                     },
 
 
                     middlename: {
                         required: true,
                         minlength: 8,
                         maxlength: 10
                     },
 
 
                     lastname: {
                         required: true,
                         minlength: 5,
                         maxlength: 8
                     },
 
 
                     gender: {
                         required: true,
                     },
 
                     phone: {
                         required: true,
                         minlength: 10,
                         maxlength: 10,
                     },
 
                     email: {
                         required: true,
                         email: true,
                         remote: {
                             url: "/formcustom",
                             async: false,
                             type: "post",
                         }
                     },
 
 
                     password: {
                         required: true,
                         minlength: 5,
                         maxlength: 10
                     },
 
                 },
                 messages: {
                     firstname: {
                         required: "Please enter a firstname",
                         minlength: "Your Firstname must consist of at least 3 characters",
                         maxlength: "Your Firstname must consist of at most  8 characters"
                     },
 
                      middlename: {
                         required: "Please enter a middlename",
                         minlength: "Your middlename must consist of at least 8 characters",
                         maxlength: "Your middlename must consist of at most 10 characters"
                     },
 
 
                      lastname: {
                         required: "Please enter a lastname",
                         minlength: "Your lastname must consist of at least 5 characters",
                         maxlength: "Your lastname must consist of at most 8 characters"
                     },
 
 
 
 
                     email: {
                         required: "Please enter a valid email address",
                         remote: "user already exits"
                     },
 
 
 
                      password: {
                         required: "Please enter a password",
                         minlength: "Your password must consist of at least 5 characters",
                         maxlength: "Your password must consist of at most 10 characters"
                     },
 
                 }
             });
         });
 