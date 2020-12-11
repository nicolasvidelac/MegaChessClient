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
    connection.on('message', (msg) =>{

        //convertimos el json que llega en un objeto legible
        let message = JSON.parse(msg.utf8Data);

        //lo que realizamos depende de la accion que haya llegado en el json
        switch (message.event){

            case 'update_user_list':
                if (count == 0){
                    console.log(message.data.users_list);
                    count = 3
                } else {
                    count --;
                }

                break;

            case 'ask_challenge':

                //muestro quien me desafio
                console.log("challenged by ", message.data.username)
                
                if(message.data.username == 'nicolasvc' || message.data.username == 'EnzoC'){
                    //manda la respuesta al desafio
                    connection.sendUTF(Challenged.challenged(message.data.board_id));
                }

            break;

            case 'your_turn':
                connection.sendUTF(my_turn(message.data))
                break;

            case'gameover':
                //muestro el resultado
                console.log
                (
                    "\nEnd of Match - Winner:", 
                    Number(message.data.white_score) > Number(message.data.black_score) ? 
                        `${message.data.white_username} with whites\n` : `${message.data.black_username} with blacks\n`,
                        
                    "White user: ", message.data.white_username, ", with score: ", message.data.white_score,
                    "\n Black user: ", message.data.black_username, ", with score: ", message.data.black_score, '\n'            
                )
                break;
            
            case 'response_error':
                console.log("\nresponse error")

            default:
                console.log(message);
                break;
        }
    })
})

//si falla la conexion
ws.on('connectFailed', (err) => {
    console.log("Connection error: ", err)
})

