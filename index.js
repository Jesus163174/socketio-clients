var express  = require('express');
var app = express();

var net = require('net');
var server = require('http').Server(app);

var io = require('socket.io')(server)

var os = require('os');

var insterfaces = os.networkInterfaces();
var addres = [];
var clients = [];

for( var k in insterfaces) {
    for(var k2 in insterfaces[k]) {
        var address = insterfaces[k][k2]
        if(address.family === 'IPv4' && !address.internal){
            addres.push(address.address)
        }
    }
}

var HOST = addres[0];
var PORT = 3000;

function remove(array, element) {
    return array.filter(el => el !== element);
}
net.createServer(function(socket){
    
    console.log("DISPOSITIVO CONECTADO: " + socket.remoteAddress + ":"+socket.remotePort);

    //AGREGANDO USUARIO CONECTADO A LA LISTA
    clients.push(socket.remoteAddress);
    console.log(clients)
    
    socket.on('data', function(data){
        console.log(socket.remoteAddress+": "+data);
        socket.write("Hello cliente: "+socket.remoteAddress+"\n");
    });
    socket.on('close',function(){
        clients = remove(clients,socket.remoteAddress);
        console.log(clients)
    });
}).listen(PORT, HOST);

//////////////////////////////////////////////////////////
/*let client = new net.Socket();
client.connect(PORT,HOST,function(){
    client.write('Hello, server! Love, Client.');
});
client.on('data', function(data) {
	console.log('Server: ' + data);
});
client.on('close', function() {
	console.log('Connection closed');
});
//////////////////////////////////////////////////////////
let client2 = new net.Socket();
client2.connect(PORT,HOST,function(){
    client.write('Hello, server! Love, Client.');
});
client2.on('data', function(data) {
	console.log('Server: ' + data);
});
client2.on('close', function() {
	console.log('Connection closed');
});*/

//Investigar conexion close de socket en node js y agregarlo => ready
//Crear un cliente en node js y conectarlo al servidor => ready
//Responder del servidor al cliente => redy
//decodificar los mensajes que llegan al servidor a texto
//Imprimir lista de clientes conectados  y cuando alguien se desconecte, eliminarlo de la lista de clientes conectados
// e imprimir nuevamente la lista de conectados. => ready

// Para preparar su proyecto
//Instalar nodemon a su proyecto => ready
//agrearlo gitignore 
