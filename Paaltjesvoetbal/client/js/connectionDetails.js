var port = 5050;
var server = 'http://localhost';
var socket = io.connect(server+":"+port).of('/mainscreen');