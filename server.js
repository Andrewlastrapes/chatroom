const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const _ = require('lodash');
const path = require("path");

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var db = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');

app.set('views', path.join(__dirname , 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.use(session({
	secret: 'secret',
	saveUnitialized: true,
	resave: true
}))

app.use(passport.initialize());
app.use(passport.session());

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


app.use(flash());

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.flash("error");
  next();
});

app.use('/', routes);
app.use('/users', users);


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
	console.log("listening")
});