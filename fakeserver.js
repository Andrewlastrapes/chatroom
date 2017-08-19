const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(server);



app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, 'public/fakeindex.html'));
});




server.listen(3001, () => { 
	console.log("running fake server")
});