const socket = io('');

//ELEMENTOS DEL DOM
let message = document.getElementById('message');
// let username = document.getElementById('username');
let boton = document.getElementById('boton');
let output = document.getElementById('output');
let actions = document.getElementById('actions');


//ENVIANDO EL MENSAJE AL SERVIDOR
boton.addEventListener('click', function() {

    socket.emit('sendMessage', message.value) //enviar los datos al servidor por medio de la funcion "sendMessage". Socket ya esta conectado al servidor
    message.value = '';
});

//ENVIANDO EL EVENTO "IS TYPING" AL SERVIDOR
message.addEventListener('keydown', function() {

    if (message.value == '') {
        console.log("ESTA VACIO !");
    } else {
        console.log("ESTA LLENO");
    }

    console.log(message.value.length);
    if (message.value.length >= 0) {
        socket.emit('messageTyping', message.value);
    } else {
        actions.innerHTML = '';
    }

    // socket.emit('messageTyping', message.value);
});


//RECIBIENDO EL MENSAJE DEL SERVIDOR Y MOSTRANDOLO EN EL HTML
socket.on('sendMessage', function(data) {
    actions.innerText = '';
    output.innerHTML = `<p>
        <strong>${data}</strong>
    </p>`
});



//RECIBIENDO LA FUNCION DEL SERVIDOR Y MOSTRANDOLO EN EL HTML
socket.on('messageTyping', function(data) {
    console.log(data, "length: ", data.length);

    if (data.length == 1) {

        actions.innerHTML = '';

    } else {

        actions.innerHTML = `<p>
            <em>is typing ...</em>

        </p>`

    }

    // actions.innerHTML = `<p>
    //         <em>is typing ...</em>
    // </p>`
});