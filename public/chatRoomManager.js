var Chatroom = function(){

} 

Chatroom.prototype.setContainer = function(container) {
	// container should be jquery object
	this.container = container
	
};
Chatroom.prototype.initialize = function(user) {
	var self = this
	this.user = user;
	var socket = io("http://localhost:4000");
	$(".messageForm").submit(function(){
		// get username from local storage
		// if username isnt in user storage, then prompt for user name.
		
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
	socket.on("groups changed", function(payload){
		$(".dropdown-content").html("");
		for (var i = 0; i < payload.length; i++){
			$(".dropdown-content").append($("<a>").append(payload[i].name).addClass("groupName"))
		} $(".groupName").off("click");
			$(".groupName").on("click", function(event){
		// event.preventDefault();
			console.log($(event.currentTarget).html())
			socket.emit("on change group", $(event.currentTarget).html())
	})

		

	})



};

var chatroom = new Chatroom()

chatroom.initialize({
	username: "andrew"
})






// add html for dropdown- includes button, row for each group that exists.
// add click listeners to the rows. Click listener will emit socket message to change group.
// extra helper functions to delete current messages. 





