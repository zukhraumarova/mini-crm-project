$('#uploadForm').submit(function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append(
        'file',
        $('#file')[0].files[0]
    );

    $.ajax({

        url: 'http://localhost:3000/files',

        method: 'POST',

        data: formData,

        processData: false,

        contentType: false,

        xhr: function () {

            const xhr =
                new window.XMLHttpRequest();

            xhr.upload.addEventListener(

                'progress',

                function (e) {

                    if (e.lengthComputable) {

                        const percent = Math.round(

                            e.loaded
                            /
                            e.total
                            *
                            100

                        );

                        $('#progress').text(

                            'Uploading: '
                            +
                            percent
                            +
                            '%'

                        );

                    }

                }

            );

            return xhr;

        },

        success: function (data) {

            $('#progress').text(
                'Upload complete!'
            );

            $('#result').html(

                `<a href="${data.url}" target="_blank">

                    Download file

                </a>`

            );

        },

        error: function () {

            $('#result').text(

                'Upload failed'

            );

        }

    });

});