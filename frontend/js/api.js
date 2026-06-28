const API = {
    baseUrl: 'http://localhost:3000',

    request: function (method, url, data = null) {
        const token = localStorage.getItem('accessToken');

    return $.ajax({
        url: this.baseUrl + url,
        method: method,
        data: data ? JSON.stringify(data) : null,
        contentType: 'application/json',
        dataType: 'json',

        beforeSend: function (xhr) {

            if (token) {

                xhr.setRequestHeader(
                    'Authorization',
                    `Bearer ${token}`
                );

            }

        }

        }).fail(function (err) {

            console.log(
                'API ERROR:',
                err.responseText
            );

        });
    },

    get: function (url) {
        return this.request('GET', url);
    },

    post: function (url, data) {
        return this.request('POST', url, data);
    },

    put: function (url, data) {
        return this.request('PUT', url, data);
    },

    delete: function (url) {
        return this.request('DELETE', url);
    }
};