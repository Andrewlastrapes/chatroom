

$(function(){
	console.log("khdfhgjdsfhg")
	var user = {
		username : "andrew"
	}
	var chatroom = new Chatroom();
	chatroom.setContainer($(".chatRoomContainer"));
	chatroom.initialize(user)
});

