$('#sendChat').click(function () {

    const message = $('#chatInput').val();

    if (!message) return;

    $('#chatBox').append(
        `<p><b>Вы:</b> ${message}</p>`
    );

    $('#chatInput').val('');

    $('#chatBox').append(
        `<p><b>AI:</b> <span id="stream"></span></p>`
    );

    const eventSource = new EventSource(

        `http://localhost:3000/chat/stream?message=${encodeURIComponent(message)}`

    );

    eventSource.onmessage = function (event) {

        $('#stream').append(event.data);

        $('#chatBox').scrollTop(

            $('#chatBox')[0].scrollHeight

        );

    };

    eventSource.addEventListener('end', function () {

        eventSource.close();

    });

});