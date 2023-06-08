const BandList = require('./band-list');


class Sockets {

    constructor( io ){
        this.io = io;

        this.bandList = new BandList();

        this.socketEvents();
    }

    socketEvents(){
        
        this.io.on('connection', (socket) => {
            console.log('cliente conectado');

            //Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands());

            socket.on('votar-banda', (id) => {
                this.bandList.increaseVotes(id);
                this.io.emit('current-bands', this.bandList.getBands());
            })
        });
    }
}

module.exports = Sockets;