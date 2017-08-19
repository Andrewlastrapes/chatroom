var Chatroom = function(){

} 

Chatroom.prototype.setContainer = function(container) {
	// container should be jquery object
	this.container = container
	
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
		$("<div class='dropdown'>")
		.append(
			$("<button class='dropbtn'>Herds</button>")
		
		.append(
			$("<div class=dropdown-content>")
		.append(
			$("<a href='#'>Herd 1</a>")
		.append(
			$("<a href='#'>Herd 2</a>")

		)	
	  )
	)
  )
)

	.append(
		$("<h1>")
		.append(
			"Herd name"
		)
	) 
	.append(
		$("<div class='messageContainer'>")
	)
	.append(
		$("<form class='messageForm'>")
		.append(
			$("<textarea class='messageInput'>")
			)
		.append(
			$("<button class='sendButton'>Submit</button>")
		)
	)
  
}

// add html for dropdown- includes button, row for each group that exists.
// add click listeners to the rows. Click listener will emit socket message to change group.
// extra helper functions to delete current messages. 





