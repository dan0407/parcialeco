// const express = require("express");
// const cors = require("cors");
// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express(); 
// app.use(express.json()); 
// app.use(cors()); 

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//   path: "/real-time",
//   cors: {
//     origin: "*", 
//   },
// }); 

// app.use(
// 	cors({
// 		origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
// 		methods: ['GET', 'POST', 'DELETE'],
// 	})
// );

// app.use(express.json());
// app.use(express.static('public'));

// const db = {
//   players: [],
// };

// io.on("connection", (socket) => {

//   socket.on("joinGame", (user) => {

//       db.players.push(user);
//       console.log('New user joined:', user);
        

//       io.emit("userJoined", db.players);
//   });


// });

// httpServer.listen(5050, () => {
//   console.log(`Server is running on http://localhost:${5050}`);
// });


const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express(); 
app.use(express.json()); 
app.use(cors()); 

const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", 
  },
}); 

app.use(
	cors({
		origin: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001'],
		methods: ['GET', 'POST', 'DELETE'],
	})
);

app.use(express.json());
app.use(express.static('public'));

const db = {
  players: [],
};

io.on("connection", (socket) => {
  console.log('A user connected');
  
  socket.on("joinGame", (user) => {
    db.players.push(user);
    console.log('New user joined:', user);
    
    // Emit the updated list of players to all clients
    io.emit("userJoined", db.players);
  });
  
  socket.on("disconnect", () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(5050, () => {
  console.log(`Server is running on http://localhost:${5050}`);
});
