//importaciones
const Challenged = require('./responses/challenged');
const fs = require('fs');
const { my_turn } = require('./responses/my_turn');
const { client } = require('websocket')

//lee mi authtoken de un archivo
var authtoken = fs.readFileSync('authtoken.txt').toString();

//genera el cliente websocket
let ws = new client();
let count = 0;

//realiza la conexion
function connect(){
    ws.connect(`ws://megachess.herokuapp.com/service?authtoken=${authtoken}`)
}

//ejecuto connect()
connect();

//activa cuando se conecta
ws.on('connect', function (connection) {

    //accion cuando se cierra ws
    connection.on('close', () => {
        connect();
    })

    //accion cuando llega un mensaje
    connection.on('message', (message) =>{

        //convertimos el json que llega en un objeto legible
        let data = JSON.parse(message.utf8Data);

        //lo que realizamos depende de la accion que haya llegado en el json
        switch (data.event){

            case 'update_user_list':
                if (count == 0){
                    console.log(data.data.users_list);
                    count = 3
                } else {
                    count --;
                }

                break;

            case 'ask_challenge':
                console.log("challenged by ", data.data.username)

                //todo eliminar esto
                if (data.data.username != 'Gonzalo'){
                //muestro quien me desafio

                //manda la respuesta al desafio
                connection.sendUTF(Challenged.challenged(data.data.board_id));
                }

                break;

            case 'your_turn':
                
                //envio el movimiento que realizo
                connection.sendUTF(my_turn(data.data));
                break;

            case'gameover':
                //muestro el resultado
                console.log
                (
                    "\nEnd of Match - Winner:", 
                    Number(data.data.white_score) > Number(data.data.black_score) ? 
                        `${data.data.white_username} with whites\n` : `${data.data.black_username} with blacks\n`,
                        
                    "White user: ", data.data.white_username, ", with score: ", data.data.white_score,
                    "\n Black user: ", data.data.black_username, ", with score: ", data.data.black_score, '\n'            
                )
                break;

            default:
                console.log("response error, timeout exception")
                // console.log(data);
                break;
        }
    })
})

//si falla la conexion
ws.on('connectFailed', (err) => {
    console.log("Connection error: ", err)
})