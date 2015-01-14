var socket = io.connect("http://localhost:3000");
  $(document).ready(function(){
    var nicknameInput = $('#nickname-input');
    var nicknameForm = $('#set-nickname');
	nicknameForm.submit(function(event){
	  event.preventDefault();
	  console.log(nicknameInput.val());
	  socket.emit('nickname', nicknameInput.val());
	});
  })