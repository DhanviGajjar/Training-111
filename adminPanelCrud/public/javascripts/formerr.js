
      $(document).ready(function () {
         $("#formSubmitBtn").click(function () {
            $.ajax({
               url: '/form', 
               type: 'post', 
               dataType: 'html',
               data:$('#form').serialize(),
               success: function (data) {
                  $('.errors').html(data)
                  /*if(data) {
                     for(let err of data) {
                        $('.errors').append('<li style="color: red">'+err.msg+'</li>')
                     }
                  }*/
               },
               error:function () {
                  
               }
            });
         });
      });





//       <script>
//       $(document).ready(function () {
//          $("#formSubmitBtn").click(function () {
//             $.ajax({
//                url: '/form', 
//                type: 'post', 
//                dataType: 'html',
//                data:$('#form').serialize(),
//                success: function (data) {
//                   $('.errors').html(data)
//                   /*if(data) {
//                      for(let err of data) {
//                         $('.errors').append('<li style="color: red">'+err.msg+'</li>')
//                      }
//                   }*/
//                },
//                error:function () {
                  
//                }
//             });
//          });
//       });
//    </script>