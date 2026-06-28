const socket = io(

    "http://localhost:3000/notifications",

    {

        auth:{

            token:

                localStorage.getItem(

                    "accessToken"

                )

        }

    }

);

socket.on(

    "connect",

    ()=>{

        console.log(

            "Connected"

        );

        $("#connectionStatus")

            .text("🟢 Connected");

    }

);

socket.on(

    'activityCreated',

    function(activity){

        $('#notifications').prepend(

            '<li>' +

            '🔔 '

            + activity.type +

            ': '

            + activity.description +

            '</li>'

        );

    }

);

socket.on(

    "disconnect",

    ()=>{

        console.log(

            "Disconnected"

        );

        $("#connectionStatus")

            .text("🔴 Disconnected");

    }

);

socket.io.on(

    "reconnect_attempt",

    ()=>{

        $("#connectionStatus")

            .text(

                "🟡 Reconnecting..."

            );

    }

);

socket.io.on(

    "reconnect",

    ()=>{

        $("#connectionStatus")

            .text(

                "🟢 Connected"

            );

    }

);