$btn = $(".btn btn-primary")
$button = $(".button")
$chat = $("#chat")


var object = {
	name : [],
	message : []
}




$(function(){
	var socket = io();
	;
	
	$('form').submit(function(){
		socket.emit("chat message",$("#username").val()), 
			object.name.push($("#username").val())
			$("#username").val("");
			
		socket.emit("chat message", $("#message").val());
			$("#message").val("")
			console.log(object.name);
			console.log(object.message);
			return false
	})

	socket.on("chat message", function(data){
		$("#chat1").append("<h2>" + data + "<h2>")
		
	})
});



	


	
		
		
	



	// console.log(object)


	// socket.on("chat message", function(){
	// 	$chat.append(localStorage.getItem($("#username").val(), $("#message").val()));
		
	// })

// $chat.append(localStorage.getItem($("#username").val(), $("#message").val()));



	
	

	



	
		
		


