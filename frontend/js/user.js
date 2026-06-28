$('#loadUsers').click(function () {
        API.get('/users')
            .done(function (data) {
                $('#list').html('');

                data.forEach(user => {
                    $('#list').append(
                        `<li>${user.name}</li>`
                    );
                });
            });
});

$('#userForm').submit(function (e) {

    e.preventDefault();

    const formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        password: $('#password').val(),
        role: $('#role').val(),
    };

    API.post('/users', formData)

        .done(function () {

            alert('User created');

        })

        .fail(function(xhr){


            console.log(xhr.status);

            console.log(xhr.responseJSON);



            if(xhr.status === 400){


                $('#error').text(
                    xhr.responseJSON.errors[0].message
                );


            }

            else {


                $('#error')
                .text('Server error');


            }


        });

});