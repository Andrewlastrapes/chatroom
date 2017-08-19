

$(function(){
	console.log("Asdf")
	var user = {
		username : "andrew"
	}
	var chatroom = new Chatroom();
	chatroom.setContainer($(".chatRoomContainer"));
	chatroom.initialize(user)
});

