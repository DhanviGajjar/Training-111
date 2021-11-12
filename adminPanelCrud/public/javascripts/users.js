function ConfirmDelete() {
    $('.delbutton').unbind('click').on('click', function () {
        var element = $(this).parent().parent();
        var x = confirm("Are you sure you want to delete?");
        if (x) {
            var url = $(this).attr("href");
            $.ajax({
                type: "DELETE",
                url: url,
                success: function (response) {
                    console.log(response);
                    if (response.type == 'success') {
                        element.fadeOut().remove();
                    } else {
                        alert(response.message)
                    }
                }
            });
            return false;
        } else {
            alert('deni deleted');
            return false;
        }
    })
}


// function ConfirmDeleteEdit() {
//     $("#delete").unbind('click').on('click', function () {
//         var element = $(this).parent().parent();
//         var x = confirm("Are you sure you want to delete?");
//         if (x) {
//             var url = $(this).attr("href");
//             $.ajax({
//                 type: "DELETE",
//                 url: url,
//                 success: function (response) {
//                     console.log(response);
//                     if (response.type == 'success') {
//                         element.fadeOut().remove();
//                     } else {
//                         alert(response.message)
//                     }
//                 }
//             });
//             return false;
//         } else {
//             alert('deni deleted');
//             return false;
//         }
//     })
// }

function confirmEdit() {
    $('.edit').on('click', function () {
        alert("hii");
        let user_id = $(this).data("id");
        var url = $(this).attr("href");
        $.ajax({
            type: 'GET',
            url: url,
            // url: "/useredit/"+ user_id,
            success: function (response) {
                if (response.type == 'success') {
                    console.log("edit data is : ", response);
                    $("#firstname").val(response.users.firstname);
                    $("#lastname").val(response.users.lastname);
                    $("#address").val(response.users.address);
                    //for checkbox chcange by user then prop
                    $('#' + response.users.gender).prop('checked', true);
                    let hobby = response.users.hobby.split(",");
                    $("#hobby")
                        .find("[value=" + hobby.join("], [value=") + "]")
                        .prop("checked", true);
                    $("#interestArea").val(response.users.interestArea);
                    $('<img src="/upload/' + response.users.photo + '" style="width: 100px;"/>').insertAfter('#image');
                    $("#validate").remove()
                    $("#delete").show()
                    $('#update').show()
                    $("#delete").attr("href","/userdelete/" + response.users._id )
                    // $("#ali").attr("href", "https://stackoverflow.com");
                     
                }
            },
        });
        return false;

    });
}


$(document).on("click", ".update", function () {
    var valueHobbies = []
    $(':checkbox:checked').each(function(i){valueHobbies.push($(this).val());});

     const formdata = new FormData();
        formdata.append('firstname', $("#firstname").val());
        formdata.append('lastname', $("#lastname").val());
        formdata.append('address', $("#address").val());
        formdata.append('gender', $("#gender:checked").val());
        formdata.append('interestarea',$('#interestarea').val());
        formdata.append('hobby', valueHobbies);
        formdata.append('photo',$('#photo')[0].files[0]);
        
        let updateUser = $(this).data('id')
        console.log(updateUser)
        $('.edit-Btn').attr('disabled', false);
     $.ajax({
            url:'/'+updateUser+'',
            method:'put',
            processData:false,
            contentType:false,
            data:formdata,
            success: function (value) {
            $('#'+updateUser).replaceWith("<tr> <td><img src='/images/"+value.image+"' height='50', width='50'/> </td> <td>"+value.firstname+ value.lastname+"</td>  <td>"+value.gender+"</td> <td>"+value.address+"</td> <td> <button class='btn btn-warning  edit-Btn' id="+value._id+"> Edit </button><button class='btn btn-info delete-Btn' id="+value._id+"> Delete </button></td> </tr>");
            $('#form')[0].reset();$('.img').remove();
           },
             error: function (error) { console.log(error); }   
    })
 });
// $('.edit').on('click', function() {
//     let editid = $(this).data("id");
//     var url = $(this).attr("href");
//     // $(".edit").attr("disabled",true);
//       $.ajax({
//          url: "/useredit/"+ editid,
//         // url:url,
//         method: "GET"
//       }).done(function(data) {
//         console.log("edit data is : ",data);
//          $("#firstname").val(data.mydata.firstname);
//          $("#lastname").val(data.mydata.lastname);
//          $("#address").val(data.mydata.address);
//          //for checkbox chcange by user then prop
//          $('#'+data.mydata.gender).prop('checked',true);
//          let hobby = data.mydata.hobby.split(",");
//         $("#hobby")
//         .find("[value=" + hobbies.join("], [value=") + "]")
//         .prop("checked", true);
//         $("#interestArea").val(data.mydata.interestArea);
//         $('<img src="/upload/'+data.mydata.photo+'" style="width: 100px;"/>').insertAfter('#image');
//       });
// });


$(document).ready(function () {
    ConfirmDelete();
    confirmEdit();
    confirmEditpost()
   $("#delete").hide()
    $('#update').hide()
    $("#quickForm").on("submit", function () {
        let formData = new FormData($("#quickForm")[0]);
        $.ajax({
            url: '/users',
            type: 'post',
            dataType: 'html',
            contentType: false,
            processData: false,
            mimeType: "multipart/form-data",
            // data: $('#quickForm').serialize(),
            data: formData,
            success: function (data) {
                const obj = JSON.parse(data);
                console.log(obj);
                $('table tbody').append(`<tr> 
                <td><img src="/upload/${(obj.data.photo)}" style="width: 100px;" /></td>
                                       <td>${obj.data.firstname}</td>
                                       <td>${obj.data.lastname}</td>
                                        <td>${obj.data.address}</td>   
                                        <td>
                                        <a href="/useredit/${obj.data._id}" class="edit">Edit</a> | 
                                        <a href="/userdelete/${obj.data._id}" class="delbutton">Delete</a>
                                        </td>
                </tr>`
                );
                ConfirmDelete();
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
