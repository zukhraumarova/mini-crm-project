$('#loadCompanies').click(function () {
        API.get('/companies')
            .done(function (data) {
                $('#list').html('');

                data.forEach(company => {
                    $('#list').append(
                        `<li>${company.name}</li>`
                    );
                });
            });
});

$('#companyForm').submit(function (e) {

    e.preventDefault();

    const formData = {
        name: $('#name').val(),
        website: $('#website').val(),
        industry: $('#industry').val()
    };

    API.post('/companies', formData)

        .done(function () {

            alert('Company created');

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