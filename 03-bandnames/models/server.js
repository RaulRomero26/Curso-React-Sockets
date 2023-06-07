//Servidor de express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./socket');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        //Http Server
        this.server = http.createServer(this.app);

        //Configuracion del socket server
        this.io = socketio(this.server,{/* configuraciones */});
    }

    middelwares(){
        //Desplegar el directorio Público
        this.app.use(express.static(path.resolve(__dirname, '../public' )));

        //CORS
        this.app.use(cors());
    }

    configurarSockets() {
        new Sockets( this.io );
    }

    execute(){
        //Inicializar Middlewares
        this.middelwares();

        //Inicializar los sockets
        this.configurarSockets();

        //Inicializaar server
        this.server.listen(this.port, () => {
            console.log('Server corriendo en el puerto: ', this.port);
        })
    }
}

module.exports = Server;