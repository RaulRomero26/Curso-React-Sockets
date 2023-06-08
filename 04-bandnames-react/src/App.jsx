import { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { BandAdd } from './components/BandAdd'
import { BandList } from './components/BandList'

const connectSocketServer = () => {
  const socket = io.connect('http://localhost:8081',{
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket, setSocket] = useState(connectSocketServer())
  const [Online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    console.log(socket);
    setOnline( socket.connected );
  }, [socket])
  
  useEffect(() => {
    socket.on('connect', () =>{
      setOnline(true);
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () =>{
      setOnline(false);
    })
  }, [socket])

  useEffect(() => {
    socket.on('current-bands', (bands) =>{
      setBands(bands);
    })
  }, [socket])

  const votar = ( id ) => {
    console.log('votar app ',id);
    socket.emit('votar-banda',id);
  }
  const borrar = ( id ) => {
    console.log('borrar',id);
    socket.emit('borrar-banda',id);
  }
  
  const cambiarNombre = (id,nombre) => {
    socket.emit('cambiar-nombre-banda',{id,nombre})
  }

  return (
    <> 
      <div className="container">
        <div className="alert">
          <p>
            Service Status: 
            {
              Online
                ?  <span className="text-success">Online</span>
                :  <span className="text-danger">Offline</span>
            }
          </p>
        </div>
      </div>
      

      <h1>Band Names</h1>
      <hr/>

      <div className="row">
        <div className="col-8">
          <BandList
            data={bands}
            votar={votar}
            borrar={borrar}
            cambiarNombre={cambiarNombre}
          />
        </div>
        <div className="col-4">
          <BandAdd/>
        </div>
      </div>
    </>
  )
}

export default App
