console.log("AUTH.JS LOADED");
console.log("Register button:", $('#registerBtn').length);
$(document).on('click', '#registerBtn', function () {

    console.log("REGISTER CLICK");



    $.ajax({

        url:'http://localhost:3000/auth/register',

        method:'POST',

        contentType:'application/json',

        data:JSON.stringify({

            name:$('#registerName').val(),

            email:$('#registerEmail').val(),

            password:$('#registerPassword').val(),

            role:$('#registerRole').val()

        }),

        success:function(data){

            $('#registerResult').html(

                '✅ Пользователь зарегистрирован<br>'+

                'Job ID: '+data.jobId

            );

            checkJob(

                data.jobId

            );

        },

        error:function(err){

            $('#registerResult').text(

                err.responseJSON.message

            );

        }

    });

});



$('#loginForm').submit(function(e){

    e.preventDefault();

    const data = {

        email:
            $('#email').val(),

        password:
            $('#password').val()

    };


    API.post(
        '/auth/login',
        data
    )

    .done(function(response){

        localStorage.setItem(
            'accessToken',
            response.accessToken
        );

        alert('Login success');

    })

    .fail(function(){

        alert('Invalid credentials');

    });

});


function checkJob(jobId){

    const timer =

    setInterval(function(){

        $.ajax({

            url:

            'http://localhost:3000/jobs/'+jobId,

            method:'GET',

            success:function(job){

                $('#registerResult').html(

                    'Job '+job.id+

                    '<br>Status: '+job.state

                );

                if(

                    job.state==='completed'

                ){

                    clearInterval(

                        timer

                    );

                    $('#registerResult').append(

                        '<br>✅ Email отправлен'

                    );

                }

                if(

                    job.state==='failed'

                ){

                    clearInterval(

                        timer

                    );

                    $('#registerResult').append(

                        '<br>❌ Ошибка'

                    );

                }

            }

        });

    },2000);

}