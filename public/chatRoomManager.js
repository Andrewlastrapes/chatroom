var Chatroom = function(){

} 

Chatroom.prototype.setContainer = function(container) {
	// container should be jquery object
	this.container = container
	console.log("sdfgsdf")
};
Chatroom.prototype.initialize = function(user) {
	var self = this
	this.initialRender();
	this.user = user;
	var socket = io("http://localhost:4000");
	$(".messageForm").submit(function(){
		var payload = {
			user : self.user.username,
			message: $(".messageInput").val()
		}
		socket.emit("chat message", payload)
		$(".messageInput").val("")
		return false;
	})
	socket.on("chat message", function(payload){
		$(".messageContainer").append($("<li>")
			.append(payload.user + ": " + payload.message))
	})
};



Chatroom.prototype.initialRender = function(){
	this.container
	.append(
		$("<h1>")
		.append(
			"Group name"
		)
	) 
	.append(
		$("<div class='messageContainer'>")
	)
	.append(
		$("<form class='messageForm'>")
		.append(
			$("<input class='messageInput'>")
		)
	)
}

// add html for dropdown- includes button, row for each group that exists.
// add click listeners to the rows. Click listener will emit socket message to change group.
// extra helper functions to delete current messages. 





