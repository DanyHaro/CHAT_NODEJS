const express = require("express");
const path = require('path');
const app = express();



//CONFIGURAR PUERTO
app.set('port', process.env.PORT || 5000);



//ARCHIVOS ESTATICOS. PASAR EL FRONTEND AL LOS NAVEGADORES
app.use(express.static(path.join(__dirname, 'public')));


//INICIANDO EL SERVIDOR 
const servidor = app.listen(app.get('port'), () => {
    console.log("SERVER RUN  ON ", app.get('port'));
})



//WEBSOCKET
//socket.io hace la comunicación bidireccional. Pero para que o haga, necesita un servidor ya creado
const socketIo = require('socket.io');
const io = socketIo(servidor) //socket.io necesita un servidor y eso lo estamos enviando

io.on('connection', (socket) => { //El cliente se conecta automaticamente al servidor PD: 'connection' es palabra reservada
    console.log('new connection', socket.id); //socket es la información de la conexión

    socket.on('sendMessage', (data) => { //recibiendo el evento o la data
        //io es la conexion en general, con todos los clientes.
        //emitimos un evento desde el servidor. El servidor recibe y reenvie el mensaje
        // evento "emit": envia , "on": recibir
        io.sockets.emit('sendMessage', data);
    });


    socket.on('messageTyping', (data) => {
        socket.broadcast.emit('messageTyping', data);
    });

});