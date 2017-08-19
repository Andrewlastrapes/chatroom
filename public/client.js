


var object = {
	name : [],
	message : []
}




$(function(){
	var socket = io();
	
	
	$('#usernameForm').submit(function(){
		// socket.emit("username",$("#username").val() + ":"), 
			// object.name.push($("#username").val())
			object.name = $("#username").val();
			console.log(object.name)
			$("#username").val("");
			return false
	});
		

	$('#messageForm').submit(function(){
		socket.emit("chat message", $("#message").val());
			$("#message").val("")
			return false
		});


	socket.on("chat message", function(data){
		$("#chat").append(object.name + "<h2>" + data + "<h2>")
		});


	// socket.on("chat message", function(data){
	// 	$("#chat").append("<h2>" + data + "<h2>")
	// 	});
	// socket.on("username", function(data){
	// 	$("#user").append("<p>" + data + "<p>")
	// })



  });




	
	

	



	
		
		


