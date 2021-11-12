use adminPaneldb
db.createUser({user: "adminPaneldb",pwd: "adminPaneldb",roles: ["readWrite","dbAdmin"]})

Topic : 
event loop,
event emitters,
callback/callback hell,
promises(object/class), 
then-catch,
error handling,
async await,
middleware,
populate,
controllers,
aggregation


task: validation(joi npm)
https://www.npmjs.com/package/flash


https://www.youtube.com/watch?v=c-0P67cxTbI   (link for callback/callback hell, promises(object/class),then-catch, error handling, async await )

---------------------------------------------------------------------------------------------------------------------------------------------------------------------

TASK TO DO..................

Routes(app.js urls)                                                (DONE) 
views (edit/del url)                                               (DONE)
views (admin folder/change path)                                   (DONE)
models for : employee/student/user/admin                
schema for : cat,subcat,product,state,city,area                    (DONE)
theme integration                                                  (DONE)
admin (Model,view,urls,crud,authentication)
users (Model,view,urls,crud)                                       (DONE)
1. category (Model,view,urls,crud)                                 (DONE)
2. subcategory (Model,view,urls,crud)                              (DONE)
3. product (Model,view,urls,crud)                                  (DONE)
4. state (Model,view,urls,crud)                                    (DONE)
5. city (Model,view,urls,crud)                                     (DONE)
6. area (Model,view,urls,crud)                                     (DONE)(area display pending...)
public/admin/ (add css)
change path in main.handlebars for css                             (DONE)













 $('table tbody').append(`
   
   `);





$(document).ready(function () {
    $("#quickForm").on("submit", function () {
        $.ajax({
            url: '/users',
            type: 'post',
            dataType: 'html',
            data: $('#quickForm').serialize(),
            success: function (data) {
               
               const obj = JSON.parse(data);
               console.log(obj);
                $('table tbody').append(`<tr> 
                                        <td>${(obj.data.photo)}</td>
                                       <td>${obj.data.firstname}</td>
                                       <td>${obj.data.lastname}</td>
                                        <td>${obj.data.address}</td>
                                      
                                
                </tr>`
               
                );
                
            },
            
            error: function () {

            }
        });
        return false
    });



    $("#quickForm").validate({
        rules: {
            firstname: {
                required: true,
                minlength: 3,
                maxlength: 8,
            },

            lastname: {
                required: true,
                minlength: 5,
                maxlength: 8,
            },

            address: {
                required: true,
                minlength: 8,
                maxlength: 40,
            },

            interestarea: {
                required: true,
            },

            photo: {
                required: true,
            },

        },
        messages: {
            firstname: {
                required: "Please enter a firstname",
                minlength: "Your Firstname must consist of at least 3 characters",
                maxlength: "Your Firstname must consist of at most  8 characters",
            },

            lastname: {
                required: "Please enter a lastname",
                minlength: "Your lastname must consist of at least 5 characters",
                maxlength: "Your lastname must consist of at most 8 characters",
            },

            address: {
                required: "Please enter address",
                minlength: "Your address must consist of at least 8 characters",
                maxlength: "Your address must consist of at most 10 characters",
            },

            interestarea: {
                required: "please enter",
            },
            photo: {
                required: "please enter",
            },

        },
    });
});


