const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);





app.use(express.static('./public'))
app.get("/", function(req, res){
	res.render('/public/index.html');
});


io.on("connection", function(socket){
	
	console.log("New socket connection");
	
	socket.on("disconnect", function(data){
	
		console.log("Disconnected") 

	});
	socket.on("chat message", (data) =>{
		console.log(data);
		io.emit("chat message", data);

	})

}); 




server.listen(3000, () => { 
	console.log("running")
});