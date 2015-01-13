var socket = io.connect('http://localhost:3000');

function submitName(){
  event.preventDefault();
  socket.emit('join', document.getElementById('nickNameInput').value);
  document.getElementById('nickNameInput').value="";
};

socket.on('repeatedName', function(data){
  console.log('aaa');
  alert(data);
  document.getElementById('nickNameInput').value="";
});