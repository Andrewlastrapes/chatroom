const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const _ = require('lodash');
const path = require("path");





app.use(express.static(path.join(__dirname, 'public')));
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, 'public/fakeindex.html'));
});




var groups = [{
	name : "group1",
	participants : [],
	owner : null
},
{
	name : "group2",
	participants : [],
	owner : null
}]

io.on("connection", function(socket){
	
	socket.chatgroupname = groups[0].name;
	groups[0].participants.push(socket.id);
	io.emit("groups changed", groups)
	socket.on("create group", (data) => {
		groups.push({
			name : data,
			participants : [],
			owner : socket
		})
		io.emit("groups changed", groups);
	})

	socket.on("on change group", (data) =>{
		var currentgroup = _.find(groups, {name:socket.chatgroupname})
		var currentgroupParticipants = currentgroup.participants
		_.remove(currentgroupParticipants, function(participantid){
			return participantid == socket.id;
		});
		var newGroup = _.find(groups, {name: data})
		newGroup.participants.push(socket.id)
		socket.chatgroupname = newGroup.name
		io.emit("groups changed", groups);

	})
	
	socket.on("disconnect", function(data){
		var currentgroup = _.find(groups, {name:socket.chatgroupname})
		var currentgroupParticipants = currentgroup.participants
		_.remove(currentgroupParticipants, function(participantid){
			return participantid == socket.id;
		});
		io.emit("groups changed", groups);

	});
	socket.on("chat message", (data) =>{
		
		var currentgroup = _.find(groups, {name:socket.chatgroupname})
		var currentgroupParticipants = currentgroup.participants
		
		_.forEach(currentgroupParticipants, function(participantid){
			io.sockets.connected[participantid].emit("chat message", data);
		})

	})

}); 




server.listen(4000, () => { 
	console.log("running")
});