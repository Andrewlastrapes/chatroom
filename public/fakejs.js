

$(function(){
	var user = {
		username : "kjdsfhg"
	}
	var chatroom = new Chatroom();
	chatroom.setContainer($(".chatRoomContainer"));
	chatroom.initialize(user)
});

