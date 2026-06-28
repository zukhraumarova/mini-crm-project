let lastDealId = null;

const limit = 3;

function loadDeals(reset = false) {

    let url =

        'http://localhost:3000/deals/page?limit='

        + limit;

    if (!reset && lastDealId) {

        url +=

            '&lastId=' +

            lastDealId;

    }

    $.ajax({

        url: url,

        method: 'GET',

        headers: {

            Authorization:

                'Bearer '

                +

                localStorage.getItem(

                    'accessToken'

                )

        },

        success: function(response) {

            if (reset) {

                $('#dealList').empty();

            }

            response.data.forEach(function(deal) {

                $('#dealList').append(

                    '<li>' +

                    deal.id +

                    ' | ' +

                    deal.title +

                    ' | ' +

                    deal.stage +

                    ' | ' +

                    deal.company_name +

                    '</li>'

                );

            });

            if (

                response.data.length > 0

            ) {

                lastDealId =

                    response.data[

                        response.data.length - 1

                    ].id;

            }

        }

    });

}

$('#loadDeals').click(function(){

    lastDealId = null;

    loadDeals(true);

});

$('#loadMoreDeals').click(function(){

    loadDeals();

});