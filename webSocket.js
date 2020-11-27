//importaciones
const Challenged = require('./responses/challenged');
const fs = require('fs');
const { my_turn } = require('./responses/my_turn');
const { makeMatriz} = require('./extras/makeMatriz');
const { client } = require('websocket')

//lee mi authtoken de un archivo
var authtoken = fs.readFileSync('authtoken.txt').toString();

//genera el cliente websocket
let ws = new client();

//realiza la conexion
function connect(){
    ws.connect(`ws://megachess.herokuapp.com/service?authtoken=${authtoken}`)
    console.log("Connection opened")
}

//ejecuto connect()
connect();

//activa cuando se conecta
ws.on('connect', function (connection) {

    //accion cuando se cierra el ws
    connection.on('close', () => {
        console.log("Connection closed");
        connect();
    })

    //accion cuando llega un mensaje
    connection.on('message', (message) =>{

        //convertimos el json que llega en un objeto legible
        let data = JSON.parse(message.utf8Data);

        //lo que realizamos depende de la accion que haya llegado en el json
        switch (data.event){

            case 'update_user_list':
                console.log(data.data.users_list);
                break;

            case 'ask_challenge':
                
                //muestro quien me desafio
                console.log("challenged by ", data.data.username)

                //manda la respuesta al desafio
                connection.sendUTF(Challenged.challenged(data.data));
                break;

            case 'your_turn':
                //envio el movimiento que realizo
                connection.sendUTF(my_turn(data.data));
                break;

            case'gameover':
                //muestro el resultado
                console.log(data.data);
                //muestro el tablero
                console.table(makeMatriz(data.data.board))
                break;

            default:
                console.log('caso no agarrado')
                console.log(data);
                break;
        }
    })
})

//si falla la conexion
ws.on('connectFailed', (err) => {
    console.log("Connection error: ", err)
})