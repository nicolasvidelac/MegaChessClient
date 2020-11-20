//importaciones
var W3CWebSocket  = require('websocket').w3cwebsocket;
var Challenged = require('./responses/challenged');
var My_Turn = require('./responses/my_turn');
var fs = require('fs');
const { TIMEOUT } = require('dns');

//lee mi authtoken de un archivo
var authtoken = fs.readFileSync('authtoken.txt').toString();

//genera el websocket
var ws = new W3CWebSocket(`ws://megachess.herokuapp.com/service?authtoken=${authtoken}`,'',[[[[],],],closetimeout = 500000000])


//metodo que se ejecuta cuando la conexion se establece
ws.onopen = () => {
    console.log('Connection opened');
}

//metodo que se ejecuta cuando la conexion se cierra
ws.onclose = function(){
    console.log("Connection closed");
    ws = null;
}

//metodo que se ejecuta cuando llega un mensaje
ws.onmessage = ({data}) => {

    //convertimos el json que llega en un objeto legible
    data = JSON.parse(data);

    // console.log(data.event);

    //lo que realizamos depende de la accion que haya llegado en el json
    switch (data.event){

        case 'update_user_list':
            console.log(data.data.users_list);
            break;

        case 'ask_challenge':
            console.log("challenged by ", data.data.username)
            Challenged.challenged(ws, data.data);
            break;

        case 'your_turn':
            // console.log(data.data.actual_turn);
            My_Turn.move(ws, data.data);
            break;

        case'gameover':
            console.log(data.data);
            break;

        default:
            console.log('caso no agarrado')
            console.log(data);
            break;
    }
}