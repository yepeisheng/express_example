var socket = io.connect('http://localhost:3000');
socket.on('users', function(data){
  console.log('aaaa' + data.number);
  document.getElementById('count').innerHTML = data.number;
});