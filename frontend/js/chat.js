$('#sendChat').click(function () {

    const message = $('#chatInput').val();

    $('#chatBox').append(
    `<p><b>Вы:</b> ${message}</p>`
    );

    if (!message) return;

    const streamId = `stream_${Date.now()}`;

    $('#chatBox').append(
        `<p><b>AI:</b> <span id="${streamId}"></span></p>`
    );

    const stream = $('#' + streamId);

    $('#chatInput').val('');

    const eventSource = new EventSource(

        `http://localhost:3000/chat/stream?message=${encodeURIComponent(message)}`

    );

    eventSource.onmessage = function(event) {
    stream.append(event.data);

    $('#chatBox').scrollTop(
        $('#chatBox')[0].scrollHeight
    );
    };

    eventSource.addEventListener('end', function () {

        eventSource.close();

    });

});